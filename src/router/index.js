import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/components/Home';
import Password from '@/components/Password';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'Home',
      component: Home,
    },
    {
      path: '/password',
      name: 'Back door',
      component: Password,
    },
  ],
});
