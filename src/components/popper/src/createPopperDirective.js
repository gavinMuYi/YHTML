function getPosition(dom) {
    var iTop = 0;
    var iLeft = 0;
    do {
        iTop += dom.offsetTop;
        iLeft += dom.offsetLeft;
        dom = dom.offsetParent;
    } while (dom.offsetParent);
    return {
        x: iLeft,
        y: iTop
    };
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
            const windowWidth = document.documentElement.clientWidth;
            const windowHeight = document.documentElement.clientHeight;
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
            target.$refs.selfPop.style.left = 'auto';
            target.$refs.selfPop.style.right = 'auto';
            target.$refs.selfPop.style.top = 'auto';
            target.$refs.selfPop.style.bottom = 'auto';
            const position = getPosition(el);
            const box = el.getBoundingClientRect();
            const popWidth = Number(getComputedStyle(target.$refs.selfPop).width.replace('px', ''));
            const popHeight = Number(getComputedStyle(target.$refs.selfPop).height.replace('px', ''));
            const startLeft = position.x + box.width / 2;
            const startTop = position.y + box.height;
            const windowWidth = document.documentElement.clientWidth;
            const windowHeight = document.documentElement.clientHeight;
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
    target.show = false;
    target.$nextTick(() => {
        target.$refs.selfPop.style.left = 'auto';
        target.$refs.selfPop.style.right = 'auto';
        target.$refs.selfPop.style.top = 'auto';
        target.$refs.selfPop.style.bottom = 'auto';
        const position = getPosition(el);
        const box = el.getBoundingClientRect();
        const popWidth = Number(getComputedStyle(target.$refs.selfPop).width.replace('px', ''));
        const popHeight = Number(getComputedStyle(target.$refs.selfPop).height.replace('px', ''));
        const startLeft = position.x + box.width / 2;
        const startTop = position.y + box.height;
        const windowWidth = document.documentElement.clientWidth;
        const windowHeight = document.documentElement.clientHeight;
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
        target.show = true;
    });
}

export default function createPopperDirective(path) {
    return {
        bind: function (el, binding, vnode) {
            // 就近取pop
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
        }
    };
}
