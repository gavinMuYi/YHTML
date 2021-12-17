import { EleResize } from '@/utils/dom.js';
const POPFUNCHOOK = 'YUI-POPFUNCHOOK';

function checkScroll(dom) {
    const nodeName = dom.nodeName.toLowerCase();
    if (nodeName === 'body' || nodeName === 'html') {
        return false;
    }
    const { overflow, overflowX, overflowY } = getComputedStyle(dom);
    if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
        return true;
    }
    return false;
}

function checkPosition(dom) {
    let position = getComputedStyle(dom, null).position;
    return !(position === 'static' || position === 'relative');
}

function getPosition(dom, { target, el, moniter, containChange, X, Y, second }) {
    var iTop = 0;
    var iLeft = 0;
    let domPel = dom;
    if (!dom) {
        return;
    }
    do {
        if (target.show && domPel && checkScroll(domPel) && !second) {
            if (!domPel.YpopScroll || (domPel.YpopScroll && !domPel.YpopScroll[target._uid])) {
                domPel.addEventListener('scroll', () => {
                    parsePosition(target, target.$lastel || el, moniter, containChange, X, Y, true);
                });
                if (!domPel.YpopScroll) {
                    domPel.YpopScroll = {};
                    domPel.YpopScroll[target._uid] = true;
                } else {
                    domPel.YpopScroll[target._uid] = true;
                }
            }
        }
        if (target.show && domPel && domPel.parentElement && checkPosition(domPel.parentElement) && !second) {
            let targetNode = domPel.parentElement;
            if (!targetNode.YpopObserver || (targetNode.YpopObserver && !targetNode.YpopObserver[target._uid])) {
                const config = { attributes: true, childList: true, subtree: true };
                const callback = () => {
                    parsePosition(target, target.$lastel || el, moniter, containChange, X, Y, true);
                };
                const observer = new MutationObserver(callback);
                observer.observe(targetNode, config);
                if (!targetNode.YpopObserver) {
                    targetNode.YpopObserver = {};
                    targetNode.YpopObserver[target._uid] = true;
                } else {
                    targetNode.YpopObserver[target._uid] = true;
                }
            }
        }
        if (dom === domPel) {
            iTop += dom.offsetTop;
            iLeft += dom.offsetLeft;
            // parentElement兼容markdown-it
            dom = dom.offsetParent || dom.parentElement;
            domPel = domPel.parentElement;
        } else {
            iTop -= domPel.scrollTop;
            iLeft -= domPel.scrollLeft;
            domPel = domPel.parentElement;
        }
    } while (dom && (dom.offsetParent || dom.parentElement));
    return {
        x: iLeft,
        y: iTop
    };
}

function getPlacement(placement, box, popWidth, popHeight) {
    let y = 0;
    let x = 0;
    switch (placement) {
        case 'left-start':
            y = 0;
            x = -popWidth;
            break;
        case 'left-middle':
            y = (box.height - popHeight) / 2;
            x = -popWidth;
            break;
        case 'left-end':
            y = box.height;
            x = -popWidth;
            break;
        case 'right-start':
            y = 0;
            x = box.width;
            break;
        case 'right-middle':
            y = (box.height - popHeight) / 2;
            x = box.width;
            break;
        case 'right-end':
            y = box.height;
            x = box.width;
            break;
        case 'top-start':
            y = -popHeight;
            x = 0;
            break;
        case 'top-middle':
            y = -popHeight;
            x = (box.width - popWidth) / 2;
            break;
        case 'top-end':
            y = -popHeight;
            x = box.width;
            break;
        case 'bottom-start':
            y = box.height;
            x = 0;
            break;
        case 'bottom-middle':
            y = box.height;
            x = (box.width - popWidth) / 2;
            break;
        case 'bottom-end':
            y = box.height;
            x = box.width;
            break;
    }
    return {
        x,
        y
    };
}

function parsePosition(target, el, moniter, containChange, X, Y, second) {
    let check = target.$el.getBoundingClientRect();
    let inlineParentPosition = {};
    let inline = target.inline;
    if (inline) {
        let inlineFather = target.$el.parentElement;
        while (inlineFather && getComputedStyle(inlineFather, null).position === 'static') {
            inlineFather = inlineFather.parentElement;
        }
        inlineParentPosition = getPosition(inlineFather, { target, el, moniter, containChange, X, Y, second });
    }
    if (!containChange && moniter) {
        if (target.lastSize && check.width === target.lastSize.width && check.height === target.lastSize.height) {
            return;
        } else {
            target.lastSize = {
                width: check.width,
                height: check.height
            };
        }
    }
    if (target.$refs.selfPop) {
        target.$refs.selfPop.style.left = 'auto';
        target.$refs.selfPop.style.right = 'auto';
        target.$refs.selfPop.style.top = 'auto';
        target.$refs.selfPop.style.bottom = 'auto';
        const position = getPosition(el, { target, el, moniter, containChange, X, Y, second });
        const box = el.getBoundingClientRect();
        const popWidth = target.$refs.selfPop.getBoundingClientRect().width;
        const popHeight = target.$refs.selfPop.getBoundingClientRect().height;
        const windowWidth = document.documentElement.offsetWidth;
        const windowHeight = document.documentElement.offsetHeight;
        const placement = getPlacement(target.placement, box, popWidth, popHeight);
        let startLeft = position.x + (X !== undefined ? X : placement.x);
        let startTop = position.y + (Y !== undefined ? Y : placement.y);
        let rightOver = popWidth + startLeft > windowWidth;
        let bottomOver = popHeight + startTop > windowHeight;
        if (target.priority && target.priority.length && (rightOver || bottomOver)) {
            for (let i = 0; i < target.priority.length; i++) {
                let placementrPiority = getPlacement(target.priority[i], box, popWidth, popHeight);
                let startLeftPiority = position.x + (X !== undefined ? X : placementrPiority.x);
                let startTopPiority = position.y + (Y !== undefined ? Y : placementrPiority.y);
                let rightOverPiority = popWidth + startLeftPiority > windowWidth;
                let bottomOverPiority = popHeight + startTopPiority > windowHeight;
                if (!rightOverPiority && !bottomOverPiority) {
                    startLeft = startLeftPiority;
                    startTop = startTopPiority;
                    rightOver = rightOverPiority;
                    bottomOver = bottomOverPiority;
                    break;
                }
            }
        }
        if (startLeft + startTop === 0 || startLeft < 0 || startTop < 0) {
            return;
        }
        if (rightOver) {
            if (inline) {
                target.$refs.selfPop.style.left = `${windowWidth - popWidth - inlineParentPosition.x}px`;
            } else {
                if (X !== undefined) {
                    target.$refs.selfPop.style.left = `${windowWidth - popWidth}px`;
                } else {
                    target.$refs.selfPop.style.right = '0px';
                }
            }
        } else {
            if (inline) {
                target.$refs.selfPop.style.left = `${startLeft - inlineParentPosition.x}px`;
            } else {
                target.$refs.selfPop.style.left = `${startLeft}px`;
            }
        }
        if (bottomOver) {
            if (inline) {
                target.$refs.selfPop.style.top = `${windowHeight - popHeight - inlineParentPosition.y}px`;
            } else {
                if (Y !== undefined) {
                    target.$refs.selfPop.style.bottom = `${windowHeight - popHeight}px`;
                } else {
                    target.$refs.selfPop.style.bottom = '0px';
                }
            }
        } else {
            if (inline) {
                target.$refs.selfPop.style.top = `${startTop - inlineParentPosition.y}px`;
            } else {
                target.$refs.selfPop.style.top = `${startTop}px`;
            }
        }
    }
}

function rightClick(target, ev, el) {
    if (ev.button === 2) {
        target.show = false;
        target.$nextTick(() => {
            target.opacity = true;
            target.$lastevX = ev.offsetX;
            target.$lastevY = ev.offsetY;
            setTimeout(() => {
                target.show = true;
                target.opacity = false;
                setTimeout(() => {
                    parsePosition(target, el, false, false, ev.offsetX, ev.offsetY);
                });
            });
        });
    }
    ev.preventDefault();
    return false;
}

function handleHover(target, el, mos, delay, data) {
    if (mos) {
        target.setData(data);
        target.show = false;
        target.$nextTick(() => {
            target.$lastel = el;
            target.opacity = true;
            setTimeout(() => {
                target.show = true;
                target.opacity = false;
                setTimeout(() => {
                    parsePosition(target, el);
                });
            });
        });
    } else {
        if (delay) {
            setTimeout(() => {
                if (target.hover) {
                    target.waitToClose = true;
                } else {
                    target.setData(data);
                    target.closePop();
                }
            }, 200);
        } else {
            target.setData(data);
            target.closePop();
        }
    }
}

function handleClick(target, el) {
    if (!target.show) {
        target.$nextTick(() => {
            target.$lastel = el;
            target.opacity = true;
            setTimeout(() => {
                target.show = true;
                target.opacity = false;
                setTimeout(() => {
                    parsePosition(target, el);
                });
            });
        });
    } else {
        target.closePop();
        if (target.$lastel && target.$lastel !== el) {
            target.$nextTick(() => {
                target.$lastel = el;
                target.opacity = true;
                target.show = true;
                setTimeout(() => {
                    parsePosition(target, el);
                    target.opacity = false;
                });
            });
        }
    }
}

function doBind(el, binding, vnode, path) {
    // 就近取pop
    setTimeout(() => {
        el[POPFUNCHOOK] = {};
        if (binding.value && binding.value.disable) {
            return;
        }
        let triggerName = binding.arg || (binding.value && binding.value.triggerName);
        let item = vnode.context.$refs[triggerName] || window.pops[triggerName];
        let target = vnode.context.$refs[triggerName] || window.pops[triggerName];
        if (path && path.length) {
            path.forEach(name => {
                target = target && target.$refs[name];
            });
        }
        if (!target) {
            return;
        }
        let listener = target.resizeable;
        if (listener) {
            EleResize.on(target.$el,
                () => {
                    let checkVal = 0;
                    if (target.$lastel) {
                        let check = target.$lastel.getBoundingClientRect();
                        checkVal = check.x + check.y;
                    }
                    parsePosition.bind(window, target, checkVal ? target.$lastel : el, true, false, target.$lastevX, target.$lastevY)();
                },
                window
            );
            let oldReSize = window.onresize;
            window.onresize = function () {
                if (target.show) {
                    let checkVal = 0;
                    if (target.$lastel) {
                        let check = target.$lastel.getBoundingClientRect();
                        checkVal = check.x + check.y;
                    }
                    parsePosition(target, checkVal ? target.$lastel : el, true, true, target.$lastevX, target.$lastevY);
                }
                oldReSize && oldReSize.call(window);
            };
        }
        if (binding.modifiers.rightClick || binding.modifiers.rightclick) {
            let contextmenuHandler = function (e) {
                if (binding.value && binding.value.data) {
                    target.setData(binding.value.data);
                }
                rightClick(target, e, el);
            };
            el[POPFUNCHOOK].contextmenu = contextmenuHandler;
            el.addEventListener('contextmenu', contextmenuHandler);
        }
        if (binding.modifiers.hover) {
            let mouseenterHandler = function () {
                handleHover(target, el, true, binding.modifiers.delay, binding.value && binding.value.data);
            };
            let mouseleaveHandler = function () {
                handleHover(target, el, false, binding.modifiers.delay, binding.value && binding.value.data);
            };
            el[POPFUNCHOOK].mouseenter = mouseenterHandler;
            el[POPFUNCHOOK].mouseleave = mouseleaveHandler;
            el.addEventListener('mouseenter', mouseenterHandler);
            el.addEventListener('mouseleave', mouseleaveHandler);
        }
        if (binding.modifiers.click) {
            let clickHandler = function (e) {
                if (binding.value && binding.value.data) {
                    target.setData(binding.value.data);
                }
                handleClick(target, el);
                e.preventDefault();
                e.stopPropagation();
            };
            el[POPFUNCHOOK].click = clickHandler;
            el.addEventListener('click', clickHandler);
        }
        if (binding.modifiers.show) {
            handleClick(target, el);
            target.cantCloseByOthers = true;
        }
        if (binding.modifiers.manual) {
            item.showPop = () => {
                handleClick(target, el);
            };
            item.hidePop = () => {
                target.closePop();
            };
            target.cantCloseByOthers = true;
        }
    });
}

function unBind(el) {
    ['contextmenu', 'mouseenter', 'mouseleave', 'click'].forEach(action => {
        el[POPFUNCHOOK][action] && el.removeEventListener(action, el[POPFUNCHOOK][action]);
    });
}

export default function createPopperDirective(path) {
    return {
        bind: function (el, binding, vnode) {
            doBind(el, binding, vnode, path);
        },
        update: function (el, binding, vnode) {
            if (JSON.stringify(binding.oldValue) === JSON.stringify(binding.value)) {
                return;
            }
            unBind(el);
            doBind(el, binding, vnode, path);
        }
    };
}
