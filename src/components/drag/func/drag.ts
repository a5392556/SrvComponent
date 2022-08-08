// 获取父元素
function getParents(el: any, parentSelector: string /* optional */) {
    const parents = [];
    let p = el.parentNode;
    while (p !== document) {
        const o = p;
        if ((' ' + p.className + ' ').indexOf(' ' + parentSelector + ' ') > -1) {
            parents.push(o);
        }
        p = o.parentNode;
    }
    return parents;
}

// 外层元素点击拖拽
const itemDrag = (ev: MouseEvent, emit: Function, props: any, style: any, moveing: any): void => {
    // 修复包含子节点 拖动跑偏的问题
    let target: HTMLElement = getParents(ev.target, 'vue3-resize-drag')[0] || ev.target || ev.srcElement;
    ev.stopPropagation();
    ev.preventDefault();
    //算出鼠标相对元素的位置
    let disX: number = ev.clientX - target.offsetLeft;
    let disY: number = ev.clientY - target.offsetTop;
    // 点击元素事件回调
    emit('downHandler', {  
        el: target,
        e: ev
    });
    if (!props.isDraggable) return;
    //鼠标按下并移动的事件
    document.onmousemove = (e: MouseEvent) => {
        moveing.value = true
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left: number = e.clientX - disX;
        let top: number = e.clientY - disY;
        //绑定元素位置到positionX和positionY上面 移动当前元素
        style.top = top;
        style.left = left;
        emit('moveHandler', {  // 移动事件回调
            el: target,
            e,
            top,
            left
        });
    }
    document.onmouseup = (e: any) => {
        moveing.value = false;
        // 抬起事件回调
        emit('mouseUpHandler', {  
            el: target,
            e,
            top: style.top,
            left: style.left
        });
        document.onmousemove = null;
        document.onmouseup = null;
    }
}
export default itemDrag