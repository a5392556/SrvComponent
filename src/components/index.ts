import { DefineComponent } from 'vue';
import SRVButton from './SRVButton.vue';
(SRVButton as DefineComponent).install = (Vue: any) => {
    Vue.component(SRVButton.name, SRVButton);
};

export { SRVButton };

