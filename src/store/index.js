import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import pass from './modules/pass';
import user from './modules/user';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    auth,
    pass,
    user,
  },
  strict: debug,
});
