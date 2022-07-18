import { DefineComponent } from 'vue';
import SRVButton from './SRVButton.vue';
const components = [
    SRVButton
];
components.forEach(comp => {
    (comp as DefineComponent).install = (Vue: any) => {
        Vue.component(comp.name, comp);
    };
})


export { SRVButton };

