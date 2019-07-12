/* eslint-disable promise/param-names */
import {
  REMIND_PASSWORD,
  REMIND_PASSWORD_SUCCESS,
  REMIND_PASSWORD_ERROR,
  SET_NEW_PASSWORD,
} from '../actions/pass';
// eslint-disable-next-line no-unused-vars
import { AUTH_SUCCESS } from '../actions/auth';

import api from '../../api';
import storage from '../../storage';

const state = {
  error: '',
  success: '',
};

/* eslint-disable no-shadow */
const getters = {
  error: state => state.error,
  success: state => state.success,
};
/* eslint-enable no-shadow */

const actions = {
  // eslint-disable-next-line arrow-body-style
  [REMIND_PASSWORD]: ({ commit }, email) => {
    return new Promise((resolve, reject) => {
      api.postRemindPassword(email)
        .then((response) => {
          commit(REMIND_PASSWORD_SUCCESS, response);
          resolve(response);
        })
        .catch((err) => {
          commit(REMIND_PASSWORD_ERROR, err);
          reject(err);
        });
    });
  },
  [SET_NEW_PASSWORD]: ({ commit, dispatch }, token) => {
    storage.setAuth(token);
    commit('auth/AUTH_SUCCESS', token, { root: true });
    dispatch('user/USER_REQUEST', null, { root: true });
  },
};

/* eslint-disable no-shadow */
const mutations = {
  [REMIND_PASSWORD_SUCCESS]: (state, response) => {
    state.error = '';
    state.success = response.data.success;
  },
  [REMIND_PASSWORD_ERROR]: (state, err) => {
    state.success = '';
    state.error = err.response.data.error;
  },
};
/* eslint-enable no-shadow */

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
