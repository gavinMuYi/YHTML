import { EleResize } from '@/utils/dom.js';

function getPosition(dom) {
    var iTop = 0;
    var iLeft = 0;
    do {
        iTop += dom.offsetTop;
        iLeft += dom.offsetLeft;
        dom = dom.offsetParent;
    } while (dom && dom.offsetParent);
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
            y = box.height / 2;
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
            y = box.height / 2;
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
            x = box.width / 2;
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
            x = box.width / 2;
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

function parsePosition(target, el, moniter, containChange, X, Y) {
    let check = target.$el.getBoundingClientRect();
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
        const position = getPosition(el);
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
        if (startLeft + startTop === 0) {
            return;
        }
        if (rightOver) {
            if (X !== undefined) {
                target.$refs.selfPop.style.left = `${windowWidth - popWidth}px`;
            } else {
                target.$refs.selfPop.style.right = '0px';
            }
        } else {
            target.$refs.selfPop.style.left = `${startLeft}px`;
        }
        if (bottomOver) {
            if (Y !== undefined) {
                target.$refs.selfPop.style.bottom = `${windowHeight - popHeight}px`;
            } else {
                target.$refs.selfPop.style.bottom = '0px';
            }
        } else {
            target.$refs.selfPop.style.top = `${startTop}px`;
        }
    }
}

function rightClick(target, ev, el) {
    if (ev.button === 2) {
        target.show = false;
        target.$nextTick(() => {
            target.$refs.selfPop.style.left = 'auto';
            target.$refs.selfPop.style.right = 'auto';
            target.$refs.selfPop.style.top = 'auto';
            target.$refs.selfPop.style.bottom = 'auto';
            const position = getPosition(el);
            const popWidth = target.$refs.selfPop.getBoundingClientRect().width;
            const popHeight = target.$refs.selfPop.getBoundingClientRect().height;
            const startLeft = ev.offsetX + position.x;
            const startTop = ev.offsetY + position.y;
            const windowWidth = document.documentElement.offsetWidth;
            const windowHeight = document.documentElement.offsetHeight;
            const rightOver = popWidth + startLeft > windowWidth;
            const bottomOver = popHeight + startTop > windowHeight;
            if (rightOver) {
                target.$refs.selfPop.style.right = '0px';
            } else {
                target.$refs.selfPop.style.left = `${startLeft}px`;
            }
            if (bottomOver) {
                target.$refs.selfPop.style.bottom = '0px';
            } else {
                target.$refs.selfPop.style.top = `${startTop}px`;
            }
            target.opacity = true;
            target.show = true;
            target.$lastevX = ev.offsetX;
            target.$lastevY = ev.offsetY;
            setTimeout(() => {
                parsePosition(target, el, false, false, ev.offsetX, ev.offsetY);
                target.opacity = false;
            });
        });
    }
    ev.preventDefault();
    return false;
}

function handleHover(target, el, mos, delay) {
    if (mos) {
        target.show = false;
        target.$nextTick(() => {
            target.opacity = true;
            target.show = true;
            setTimeout(() => {
                parsePosition(target, el);
                target.opacity = false;
            });
            target.$lastel = el;
        });
    } else {
        if (delay) {
            setTimeout(() => {
                if (target.hover) {
                    target.waitToClose = true;
                } else {
                    target.closePop();
                }
            }, 200);
        } else {
            target.closePop();
        }
    }
}

function handleClick(target, el) {
    if (!target.show) {
        target.$nextTick(() => {
            target.opacity = true;
            target.show = true;
            setTimeout(() => {
                parsePosition(target, el);
                target.opacity = false;
            });
            target.$lastel = el;
        });
    } else {
        target.closePop();
        if (target.$lastel && target.$lastel !== el) {
            target.$nextTick(() => {
                target.opacity = true;
                target.show = true;
                setTimeout(() => {
                    parsePosition(target, el);
                    target.opacity = false;
                });
                target.$lastel = el;
            });
        }
    }
}

function doBind(el, binding, vnode, path, listener) {
    // 就近取pop
    setTimeout(() => {
        let item = vnode.context.$parent.$refs[binding.arg] || window.pops[binding.arg];
        let target = vnode.context.$parent.$refs[binding.arg] || window.pops[binding.arg];
        if (path && path.length) {
            path.forEach(name => {
                target = target && target.$refs[name];
            });
        }
        if (!target) {
            return;
        }
        if (listener) {
            EleResize.on(target.$el,
                parsePosition.bind(window, target, target.$lastel || el, true, false, target.$lastevX, target.$lastevY),
                window
            );
            let oldReSize = window.onresize;
            window.onresize = function () {
                if (target.show) {
                    parsePosition(target, target.$lastel || el, true, true, target.$lastevX, target.$lastevY);
                }
                oldReSize && oldReSize.call(window);
            };
        }
        if (binding.modifiers.rightClick) {
            el.addEventListener('contextmenu', function (e) {
                rightClick(target, e, el);
            });
        }
        if (binding.modifiers.hover) {
            el.addEventListener('mouseenter', function () {
                handleHover(target, el, true, binding.modifiers.delay);
            });
            el.addEventListener('mouseleave', function () {
                handleHover(target, el, false, binding.modifiers.delay);
            });
        }
        if (binding.modifiers.click) {
            el.addEventListener('click', function (e) {
                handleClick(target, el);
                e.preventDefault();
                e.stopPropagation();
            });
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

export default function createPopperDirective(path) {
    return {
        bind: function (el, binding, vnode) {
            doBind(el, binding, vnode, path, true);
        },
        update: function (el, binding, vnode) {
            if (binding.oldValue === binding.value) {
                return;
            }
            doBind(el, binding, vnode, path);
        }
    };
}
