import { shallowMount } from '@vue/test-utils';
import {SRVButton} from '../../src/components/index';

describe('Srvbuitton.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(SRVButton, {
      props: {size: 'normal'}
    });
    expect(wrapper.find('.is-normal').exists()).toBe(true);
  });
});
