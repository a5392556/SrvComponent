<template>
    <table border="1" width='50%' align="center" class="srv-table">
        <thead v-show="headVisible">
            <tr>
                <th v-for="(item) in tbHead" :key="item.key">{{ item.name }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, index) of tbBody" :key="index">
                <td v-show="isInKeys(key)" v-for="(value, key) in row" :key="key"
                    @click.stop="showEditInput($event, index, key, value)">{{ value }}
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script setup lang='ts'>
import { PropType, defineProps, createApp, reactive } from 'vue';
import SRVEditInput from "./SRVEditInput.vue";
let editInputApp: any = undefined;
const currentData = reactive({
    key: '',
    name: '',
    value: '',
    index: -1
});
const props = defineProps({
    tbHead: {
        type: Array as PropType<TbHeadKeyType[]>,
        default: () => []
    },
    tbBody: {
        type: Array as PropType<any[]>,
        default: () => []
    },
    headVisible: {
        type: Boolean as PropType<boolean>,
        default: () => true
    }
});

const emit = defineEmits<{(e: 'onChange', data: TableEditParamsType): void}>()
function isInKeys(key: string | number) {
    return props.tbHead.some(item => item.key === key);
}
function showEditInput(e: MouseEvent, index: number, key: number | string, value: string) {
    removeEditInput();
    if (!checkEditable(key)) return;

    const target = e.target as HTMLElement;
    const oFrag = document.createDocumentFragment();
    editInputApp = createApp(SRVEditInput, {
        value: target.textContent,
        setValue
    });
    if (editInputApp) {
        editInputApp.mount(oFrag);
        target.appendChild(oFrag);
        (target.querySelector('.edit-input') as HTMLInputElement).select();
    }

    setData({key: key as string, index: index, name: findName(key as string), value: ''})
}
// eslint-disable-next-line
function setValue(value: any) {
    currentData.value = value;
    emit('onChange', {...currentData});
}

function findName(key: string) {
    const { name } = props.tbHead.find(item => item.key === key) as TbHeadKeyType;
    return name;
}

function setData(params = { key: '', value: '', index: -1, name: '' }) {
    currentData.key = params.key;
    currentData.value = params.value;
    currentData.index = params.index;
    currentData.name = params.name;
}

function checkEditable(key: string | number) {
    return props.tbHead.some(item => item.key === key && item.editable);
}

function removeEditInput() {
    editInputApp && editInputApp.unmount();
    editInputApp = undefined;
    currentData.key = '';
    currentData.value = '';
    currentData.index = -1;
    currentData.name = '';
}

window.addEventListener('click', removeEditInput, false);
</script>
<style scoped lang='scss'>
.srv-table {
    width: 50%;
    border: 1px solid black;
    margin: 0 auto;
    border-collapse: collapse;

    td {
        height: 50px;
        border: 1px solid black;
        text-align: center;
        vertical-align: center;
        cursor: pointer;
        position: relative;
    }

    tbody tr:nth-child(even) {
        background-color: antiquewhite;
    }
}
</style>