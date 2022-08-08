<template>
    <div class="vue3-resize-drag" :style="styleHandler" @mousedown.stop="itemDown">
        <slot></slot>
        <div v-if="isRotate" class="rotate-icon" @mousedown.stop="itemRotate"></div>
        <!-- 组件移动辅助线 -->
        <div v-if="isGuide" v-for="i in [1, 2, 3, 4]" :key="i"
            :style="moveing ? { ...guideBaseStyle[i - 1], ...guideStyle } : {}" class="guide">
        </div>
        <!-- 组件四周缩放按钮 -->
        <div v-if="isResizable && isActive" v-for="(el, index) in dragElResizeIcon" :key="el.class"
            class="dragElResizeIcon" :class="el.class" :style="el.style"
            @mousedown.stop="itemResize($event, el.class, index)">
        </div>
    </div>
</template>
<script setup lang='ts'>
import renderFn from './func/renderData';
import props from './func/props';
import itemDrag from './func/drag';
import itemResizeFn from './func/resize';
import itemRotateFn from './func/rotate';
import watchProps from './func/watchProps';
import active from './func/active';
const propsRes = defineProps(props);
const emit = defineEmits<{
    (event: 'moveHandler', el: HTMLElement, e: MouseEvent, top: number, left: number): void,
    (event: 'downHandler', el: HTMLElement, e: MouseEvent): void,
    (event: 'mouseUpHandler', el: HTMLElement, e: MouseEvent, top: number, left: number): void,
    (event: 'resizeHandler', el: HTMLElement, e: MouseEvent, width: number, height: number, top: number, left: number): void,
    (event: 'rotateHandler', el: HTMLElement, e: MouseEvent, rotate: number): void,
    (event: 'activated', el: HTMLElement, e: MouseEvent, rotate: number): void,
    (event: 'deactivated', el: HTMLElement, e: MouseEvent, rotate: number): void,
}>();
// 初始化 props 数据
let {
    style,  // 初始化组件位置级 z-index
    moveing,  // 是否移动变量 用来判断辅助线是否显示
    styleHandler,  // 计算属性处理 style 变量
    dragElResizeIcon,  // 缩放图标初始位置 样式
    guideBaseStyle  // 辅助线默认样式
} = renderFn(propsRes); 
// 监听 props
watchProps(propsRes, style); 
// 缩放
const itemResize = (ev: MouseEvent, cls: string, index: number) => {
    itemResizeFn(ev, cls, index, emit, style);
}
// 旋转
const itemRotate = (ev: MouseEvent) => {  // 旋转
    itemRotateFn(ev, emit, style);
}
// 拖拽
const itemDown = (ev: MouseEvent) => {
    itemDrag(ev, emit, props, style, moveing);
}
// 监听是否激活
active(props, emit);
</script>
<style scoped lang='scss'>
.vue3-resize-drag {
    position: absolute;
    box-sizing: border-box;
    border: 1px dashed #ccc;
    transition: width height 1s;
    transform-origin: center center;
}

/* 辅助线 */
.guide {
    position: absolute;
}

/* 旋转图标 */
.rotate-icon {
    width: 16px;
    height: 16px;
    position: absolute;
    top: -20px;
    left: calc(50% - 8px);
    background: url('../../assets/rotate.png') no-repeat;
    background-size: 100%;
}

/* 缩放角标 */
.dragElResizeIcon {
    position: absolute;
    background: #fff;
    border: 1px solid #ccc;
}

.drag-ct {
    cursor: s-resize;
}

.drag-lt {
    cursor: se-resize;
}

.drag-rt {
    cursor: ne-resize;
}

.drag-rc {
    cursor: w-resize;
}

.drag-rb {
    cursor: se-resize;
}

.drag-bc {
    cursor: s-resize;
}

.drag-lb {
    cursor: ne-resize;
}

.drag-lc {
    cursor: w-resize;
}
</style>