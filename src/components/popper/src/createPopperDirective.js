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

function getPlacement(target, box) {
    const placement = target.placement.split('-');
    let y = 0;
    let x = 0;
    switch (placement[0]) {
        case 'top':
            break;
        case 'middle':
            y = box.height / 2;
            break;
        case 'bottom':
            y = box.height;
            break;
    }
    switch (placement[1]) {
        case 'start':
            break;
        case 'middle':
            x = box.width / 2;
            break;
        case 'end':
            x = box.width;
            break;
    }
    return {
        x,
        y
    };
}

function parsePosition(target, el, moniter, containChange) {
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
    target.$refs.selfPop.style.left = 'auto';
    target.$refs.selfPop.style.right = 'auto';
    target.$refs.selfPop.style.top = 'auto';
    target.$refs.selfPop.style.bottom = 'auto';
    const position = getPosition(el);
    const box = el.getBoundingClientRect();
    const placement = getPlacement(target, box);
    const startLeft = position.x + placement.x;
    const startTop = position.y + placement.y;
    const popWidth = Number(getComputedStyle(target.$refs.selfPop).width.replace('px', ''));
    const popHeight = Number(getComputedStyle(target.$refs.selfPop).height.replace('px', ''));
    const windowWidth = document.documentElement.offsetWidth;
    const windowHeight = document.documentElement.offsetHeight;
    const rightOver = popWidth + startLeft > windowWidth;
    const bottomOver = popHeight + startTop > windowHeight;
    if (startLeft + startTop === 0) {
        return;
    }
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
            const popWidth = Number(getComputedStyle(target.$refs.selfPop).width.replace('px', ''));
            const popHeight = Number(getComputedStyle(target.$refs.selfPop).height.replace('px', ''));
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
            target.show = true;
        });
    }
    ev.preventDefault();
    return false;
}

function handleHover(target, el, mos, delay) {
    if (mos) {
        target.show = false;
        target.$nextTick(() => {
            parsePosition(target, el);
            target.show = true;
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
            parsePosition(target, el);
            target.show = true;
        });
    } else {
        target.closePop();
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
            EleResize.on(target.$el, parsePosition.bind(window, target, el, true, false), window);
            let oldReSize = window.onresize;
            window.onresize = function () {
                parsePosition(target, el, true, true);
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
