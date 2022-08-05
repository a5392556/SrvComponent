<template>
    <div class="echart" :style="{width, height}" id="echartLineDom"></div>
</template>
<script setup lang='ts'>
import * as echarts from 'echarts';
import { onBeforeUnmount, onMounted, PropType, watch } from 'vue';
let chartDom: HTMLElement | null = null;
let myChart: echarts.ECharts | undefined;
let timer: any = undefined;
const props = defineProps({
    option: {
        type: Object as PropType<EChartsOption>,
        default: () => {
            const res = {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [150, 230, 224, 218, 135, 147, 260],
                        type: 'line'
                    }
                ]
            }
            return res;
        }
    },
    drawType: {
        type: String as PropType<EchartLineDrawType>,
        default: () => 'canvas'
    },
    name: {
       type: String,
       default: 'lineChart' 
    },
    width: {
        type: String,
        default: '500px'
    },
    height: {
        type: String,
        default: '500px'
    }
});
//重绘图表函数
const resizeHandler = () => {
    myChart?.resize();
}
// 防抖函数
function debounce(fun: () => void, delay: number) {
    return function () {
        clearTimer();
        timer = setTimeout(() => {
            fun && fun();
        }, delay);
    }
}
// 清除定时器
function clearTimer() {
    if(timer) {
        clearTimeout(timer);
        timer = undefined;
    }
}
const cancalDebounce = debounce(resizeHandler, 500);
onMounted(() => {
    chartDom = document.getElementById('echartLineDom');
    if(!chartDom) {
        console.error(`${props.name} DOM is undefinded!`);
        return ;
    }
    myChart = echarts.init(chartDom, undefined, {renderer: props.drawType as any});
    props.option && myChart.setOption(props.option);
    //自适应不同屏幕时改变图表尺寸
    window.addEventListener('resize', cancalDebounce);
});
onBeforeUnmount(() => {
    clearTimer();
    window.removeEventListener('resize', cancalDebounce);
    myChart?.dispose();
});
//监听图表数据时候变化，重新渲染图表
watch(() => props.option, () => {
    myChart?.setOption(props.option, true);
}, { deep: true });
</script>
<style scoped lang='scss'>
.echart {
    width: 100%;
    height: 100%;
}
</style>