<template>
    <!-- <SRVButton size='small' type="primary" long="long" disabled="true">快点我</SRVButton> -->
    <SRVTable @onChange="onChange" :tb-head="tabHeadData" :tb-body="tabBodyData"></SRVTable>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { SRVTable } from "./index";
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

function onChange(data: TableEditParamsType) {
    const {key, index, value} = data;
    tabBodyData[index][key] = value;
}
</script>

<style scoped lang="scss">
</style>
