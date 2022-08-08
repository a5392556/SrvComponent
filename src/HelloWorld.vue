<template>
    <!-- <div style="height: 100px;width: 100%;">
        <SRVButton size='small' type="primary" long="short" disabled="false">快点我</SRVButton>
        <SRVButton size='small' type="success" long="short" disabled="true">快点我</SRVButton>
        <SRVButton size='large' type="error" long="short" disabled="true">快点我</SRVButton>
        <SRVButton style="width: 200px;height:30px;" size='small' type="warn" long="short" disabled="true">快点我
        </SRVButton>
    </div>
    <div style="height: 300px;width: 100%;">
        <SRVTable :tr-bg-colors="trBgColors" border-color="rgb(38, 38, 38)" border-width="1"
            :input-border-color="inputBorderColor" @onChange="onChange" :tb-head="tabHeadData" :tb-body="tabBodyData">
        </SRVTable>
    </div>
    <div style="height: 300px;width: 400px;">
        <SRVChart width="100%" height="100%" :option="option" draw-type="canvas"></SRVChart>
    </div> -->
    <div style="height: 300px;width: 400px;">
        <SRVDragResize v-for="(item, index) in data.data" :key="item.name" :x="item.x" :y="item.y" :zIndex="1"
            :isDraggable="item.drag" :isResizable="item.resize" :isRotate="item.rotate" :isActive="item.active"
            :resizeIconSize="8" :isGuide="true" :guideStyle="{}">
            {{ item.x }}
            <span>{{ item.name }}</span>
        </SRVDragResize>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { reactive } from "vue";
import { SRVTable, SRVChart, SRVButton, SRVDragResize } from "./components/index";
const tabHeadData = reactive<TbHeadKeyType[]>([
    {
        key: 'date',
        name: '日期',
        editable: true
    },
    {
        key: 'income',
        name: '收入',
        editable: false
    }
]);
const tabBodyData = reactive<any[]>([
    {
        date: '1111',
        income: 1222,
    },
    {
        date: '1111',
        income: 1222,
    },
    {
        date: '1111',
        income: 1222,
    }
]);
const inputBorderColor = 'blue';
function onChange(data: TableEditParamsType) {
    const { key, index, value } = data;
    tabBodyData[index][key] = value;
}
const trBgColors = reactive(['#ffffff', '#antiquewhite']);
type EChartsOption = echarts.EChartsOption;
const option: EChartsOption = {
    color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
    title: {
        text: 'Gradient Stacked Area Chart'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: 'Line 1',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgb(128, 255, 165)'
                    },
                    {
                        offset: 1,
                        color: 'rgb(1, 191, 236)'
                    }
                ])
            },
            emphasis: {
                focus: 'series'
            },
            data: [140, 232, 101, 264, 90, 340, 250]
        },
        {
            name: 'Line 2',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgb(0, 221, 255)'
                    },
                    {
                        offset: 1,
                        color: 'rgb(77, 119, 255)'
                    }
                ])
            },
            emphasis: {
                focus: 'series'
            },
            data: [120, 282, 111, 234, 220, 340, 310]
        },
        {
            name: 'Line 3',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgb(55, 162, 255)'
                    },
                    {
                        offset: 1,
                        color: 'rgb(116, 21, 219)'
                    }
                ])
            },
            emphasis: {
                focus: 'series'
            },
            data: [320, 132, 201, 334, 190, 130, 220]
        },
        {
            name: 'Line 4',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgb(255, 0, 135)'
                    },
                    {
                        offset: 1,
                        color: 'rgb(135, 0, 157)'
                    }
                ])
            },
            emphasis: {
                focus: 'series'
            },
            data: [220, 402, 231, 134, 190, 230, 120]
        },
        {
            name: 'Line 5',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            label: {
                show: true,
                position: 'top'
            },
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgb(255, 191, 0)'
                    },
                    {
                        offset: 1,
                        color: 'rgb(224, 62, 76)'
                    }
                ])
            },
            emphasis: {
                focus: 'series'
            },
            data: [220, 302, 181, 234, 210, 290, 150]
        }
    ]
};
let data = reactive({
    data: [
        {
            x: 100,
            y: 100,
            name: '哈哈',
            drag: false,
            resize: true,
            rotate: true,
            active: false
        },
        {
            x: 200,
            y: 200,
            name: '哈哈2',
            drag: true,
            resize: true,
            rotate: true,
            active: true
        },
        {
            x: 300,
            y: 300,
            name: '哈哈3',
            drag: true,
            resize: true,
            rotate: true,
            active: false
        },
        {
            x: 400,
            y: 400,
            name: '哈哈4',
            drag: true,
            resize: true,
            rotate: true,
            active: false
        },
        {
            x: 500,
            y: 500,
            name: '哈哈5',
            drag: true,
            resize: true,
            rotate: true,
            active: false
        },
        {
            x: 600,
            y: 600,
            name: '哈哈6',
            drag: true,
            resize: false,
            rotate: false,
            active: false
        }
    ]
});


</script>

<style scoped lang="scss">
</style>
