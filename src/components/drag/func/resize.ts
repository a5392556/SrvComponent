// 元素缩放
const itemResize = (ev: MouseEvent, cls: string, index: number, emit: Function, style: any) => {
    if(!ev.target) return;
    let target: HTMLElement = (ev.target as any).offsetParent || (ev as any).srcElement.parentNode;
    ev.stopPropagation();
    ev.preventDefault();
    let w: number = 0;
    let h: number = 0;
    let top: number = 0;
    let left: number = 0;
    const {
        parentOffsetLeft,
        parentOffsetTop
    } = getParentInfo(target.parentNode as HTMLElement);
    // 鼠标拖拽改变元素大小
    document.onmousemove = (e) => {
        switch (cls) {
            case 'drag-ct':  // top center
                h = target.offsetHeight + target.offsetTop + parentOffsetTop - e.clientY;
                w = target.offsetWidth;
                top = e.clientY - parentOffsetTop;
                left = target.offsetLeft;
                break;
            case 'drag-lc':  // left center
                h = target.offsetHeight;
                w = target.offsetWidth + target.offsetLeft + parentOffsetLeft - e.clientX;
                top = target.offsetTop;
                left = e.clientX - parentOffsetLeft;
                break;
            case 'drag-bc':  // bottom center
                h = e.clientY - target.offsetTop;
                w = target.offsetWidth;
                top = target.offsetTop;
                left = target.offsetLeft;
                break;
            case 'drag-rc':  // right center
                h = target.offsetHeight;
                w = e.clientX - target.offsetLeft - parentOffsetLeft;
                top = target.offsetTop ;
                left = target.offsetLeft;
                break;
            case 'drag-lt':  // left top
                h = target.offsetHeight + target.offsetTop - e.clientY + parentOffsetTop;
                w = target.offsetWidth + target.offsetLeft - e.clientX + parentOffsetLeft;
                top = e.clientY - parentOffsetTop;
                left = e.clientX - parentOffsetLeft;
                break;
            case 'drag-rt':  // right top
                h = target.offsetHeight + target.offsetTop - e.clientY - parentOffsetTop;
                w = e.clientX - target.offsetLeft - parentOffsetLeft;
                top = e.clientY - parentOffsetTop;
                left = target.offsetLeft;
                break;
            case 'drag-rb':  // right bottom
                h = e.clientY - target.offsetTop - parentOffsetTop;
                w = e.clientX - target.offsetLeft - parentOffsetLeft;
                top = target.offsetTop;
                left = target.offsetLeft;
                break;
            case 'drag-lb':  // left bottom
                h = e.clientY - target.offsetTop - parentOffsetTop;
                w = target.offsetWidth + target.offsetLeft - e.clientX + parentOffsetLeft;
                top = target.offsetTop;
                left = e.clientX - parentOffsetLeft;
                break;
            default:
                w = target.offsetWidth;
                h = target.offsetHeight;
                top = target.offsetTop;
                left = target.offsetLeft;
                break;
        }
        emit('resizeHandler', {
            el: target,
            e,
            w,
            h,
            top,
            left
        });
        style.width = w;
        style.height = h;
        style.top = top;
        style.left = left;
    }
    document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
    }
}

function getParentInfo(parentEl: HTMLElement) {
    const parentOffsetLeft = parentEl.offsetLeft;
    const parentOffsetTop = parentEl.offsetTop;
    return {
        parentOffsetLeft,
        parentOffsetTop
    };
}
export default itemResize;