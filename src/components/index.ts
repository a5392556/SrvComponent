import { DefineComponent } from 'vue';
import SRVButton from './SRVButton.vue';
import SRVTable from './SRVTable.vue';
const components = [
    SRVButton,
    SRVTable
];
components.forEach(comp => {
    (comp as DefineComponent).install = (Vue: any) => {
        Vue.component(comp.name, comp);
    };
})


export { SRVButton, SRVTable };

