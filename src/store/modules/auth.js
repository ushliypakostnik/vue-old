/* eslint-disable promise/param-names */
import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  SET_TOKEN,
  REMIND_PASSWORD,
} from '../actions/auth';
import { USER_REQUEST } from '../actions/user';

import api from '../../api';
import storage from '../../storage';

const state = {
  status: '',
  token: localStorage.getItem('user-token') || '',
  errors: '',
};

/* eslint-disable no-shadow */
const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
  errors: state => state.errors,
};
/* eslint-enable no-shadow */

const actions = {
  // eslint-disable-next-line arrow-body-style
  [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST);
      api.postAuth(user)
        .then((response) => {
          const token = response.data.user.token;
          storage.setAuth(token);
          commit(AUTH_SUCCESS, response);
          dispatch(USER_REQUEST);
          resolve(response);
        })
        .catch((err) => {
          commit(AUTH_ERROR, err);
          storage.deleteAuth();
          reject(err);
        });
    });
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    const token = state.token;
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT);
      storage.deleteAuth();
      storage.deleteUserProfile();
      api.getLogout(token)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // eslint-disable-next-line arrow-body-style
  [REMIND_PASSWORD]: ({ commit }, email) => {
    // console.log("AUTH [REMIND_PASSWORD]!!!", email);
    return new Promise((resolve, reject) => {
      commit(REMIND_PASSWORD);
      // sconsole.log("AUTH [REMIND_PASSWORD]!!!", email);
      api.postRemindPassword(email)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  [SET_TOKEN]: ({ commit }, token) => {
    commit(SET_TOKEN, token);
    storage.setAuth(token);
  },
};

/* eslint-disable no-shadow */
const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = 'loading';
    state.errors = '';
  },
  [AUTH_SUCCESS]: (state, response) => {
    state.status = 'success';
    state.token = response.data.user.token;
    state.errors = '';
  },
  [AUTH_ERROR]: (state, err) => {
    state.status = 'error';
    state.errors = err.response.data.errors;
  },
  [AUTH_LOGOUT]: (state) => {
    state.token = '';
    state.errors = '';
  },
  [SET_TOKEN]: (state, token) => {
    state.status = 'success';
    state.token = token;
  },
};
/* eslint-enable no-shadow */

export default {
  state,
  getters,
  actions,
  mutations,
};
