import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/components/Router/Home';
import Password from '@/components/Router/Password';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/password',
      name: 'Password',
      component: Password,
    },
  ],
});
