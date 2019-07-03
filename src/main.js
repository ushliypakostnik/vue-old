// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';

import App from './App';
import router from './router';

import 'vuetify/dist/vuetify.min.css'; // eslint-disable-line

Vue.config.productionTip = false;
Vue.use(Vuetify);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});