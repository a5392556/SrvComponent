<template>
    <table width='50%' align="center" class="srv-table" :style="{ border: `${borderWidth}px solid ${borderColor}` }">
        <thead v-show="headVisible" :style="{ 'background-color': tbHeaderBgColor }">
            <tr>
                <th v-for="(item) in tbHead" :key="item.key"
                    :style="{ border: `${borderWidth}px solid ${borderColor}` }">{{ item.name }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, index) of tbBody" :key="index"
                :style="{ border: `${borderWidth}px solid ${borderColor}`, 'background-color': `${ trBgColors[index % trBgColors.length] }` }">
                <td v-show="isInKeys(key)" v-for="(value, key) in row" :key="key"
                    @click.stop="showEditInput($event, index, key, value)"
                    :style="{ 'border': `${borderWidth}px solid ${borderColor}`}">
                    {{ value }}
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script setup lang='ts'>
import { PropType, defineProps, createApp, reactive, onUnmounted } from 'vue';
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
    },
    tableBorder: {
        type: Number as PropType<number>,
        default: () => 0
    },
    inputBorderColor: {
        type: String,
        default: 'red'
    },
    borderColor: {
        type: String,
        default: 'black'
    },
    borderWidth: {
        type: String,
        default: '1'
    },
    tbHeaderBgColor: {
        type: String,
        default: '#ffffff'
    },
    trBgColors: {
        type: Array as PropType<string[]>,
        default: () => ['#ffffff']
    }
});
// 改变表格的数据
const emit = defineEmits<{ (e: 'onChange', data: TableEditParamsType): void }>();
function isInKeys(key: string | number) {
    return props.tbHead.some(item => item.key === key);
}
// 显示输入框
function showEditInput(e: MouseEvent, index: number, key: number | string, value: string) {
    // 移除输入框并且清空数据
    removeEditInput();
    if (!checkEditable(key)) return;
    const target = e.target as HTMLElement;
    const oFrag = document.createDocumentFragment();
    editInputApp = createApp(SRVEditInput, {
        value: target.textContent,
        setValue,
        inputBorderColor: props.inputBorderColor
    });
    if (editInputApp) {
        editInputApp.mount(oFrag);
        target.appendChild(oFrag);
        (target.querySelector('.edit-input') as HTMLInputElement).select();
    }
    // 设置当前选中单元数据
    setData({ key: key as string, index: index, name: findName(key as string), value: '' });
}
// eslint-disable-next-line
function setValue(value: any) {
    currentData.value = value;
    // 把改变表格数据的操作给 input 的 onBlur
    emit('onChange', { ...currentData });
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
// 检测是否可以编辑
function checkEditable(key: string | number) {
    // 根据目前的字段是否匹配而且 editable === true 
    return props.tbHead.some(item => item.key === key && item.editable);
}

function removeEditInput() {
    // 卸载 editInputApp
    editInputApp && editInputApp.unmount();
    editInputApp = undefined;
    currentData.key = '';
    currentData.value = '';
    currentData.index = -1;
    currentData.name = '';
}

window.addEventListener('click', removeEditInput, false);

onUnmounted(() => {
    window.removeEventListener('click', removeEditInput, false);
});
</script>
<style scoped lang='scss'>
.srv-table {
    width: 50%;
    margin: 0 auto;
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid black;
    color: #606266;

    thead {
        tr {
            th {
                border: 1px solid black;
            }
        }
    }

    tbody tr:nth-child(even) {
        background-color: antiquewhite;
    }

    tbody tr:hover {
        background-color: rgb(58, 58, 58) !important;
        color: white;
    }

    tbody {
        tr {
            border: 1px solid black;

            td {
                height: 50px;
                text-align: center;
                vertical-align: center;
                cursor: pointer;
                position: relative;
                border: 1px solid rgb(0, 0, 0);
            }

        }

    }
}
</style>