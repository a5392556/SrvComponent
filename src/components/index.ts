import { DefineComponent } from 'vue';
import SRVButton from './SRVButton.vue';
import SRVTable from './SRVTable.vue';
import SRVChart from "./SRVChart.vue";
import SRVDragResize from './drag/SRVDragResize.vue';
const components = [
    SRVButton,
    SRVTable,
    SRVChart,
    SRVDragResize
];
components.forEach(comp => {
    (comp as DefineComponent).install = (Vue: any) => {
        Vue.component(comp.name, comp);
    };
});
export { SRVButton, SRVTable, SRVChart, SRVDragResize };

