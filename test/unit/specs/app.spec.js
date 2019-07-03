import Vue from 'vue';
import Vuetify from 'vuetify';
import App from '@/App';

// mock component
const routerView = {
  name: 'router-view',
  render: h => h('div'),
};

// register mock component
Vue.component('router-view', routerView);

Vue.use(Vuetify);

describe('App.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(App);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.app__header').textContent)
      .toEqual('Vue cli based frontend boilerplate');
  });
});
