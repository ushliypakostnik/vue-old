/* eslint-disable promise/param-names */
import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  SET_TOKEN,
  REMIND_PASSWORD,
  REMIND_PASSWORD_SUCCESS,
  REMIND_PASSWORD_ERROR,
} from '../actions/auth';
import { USER_REQUEST } from '../actions/user';

import api from '../../api';
import storage from '../../storage';

const state = {
  status: '',
  token: localStorage.getItem('user-token') || '',
  errors: '',
  success: '',
};

/* eslint-disable no-shadow */
const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
  errors: state => state.errors,
  success: state => state.success,
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
  [REMIND_PASSWORD]: ({ commit, dispatch }, email) => {
    return new Promise((resolve, reject) => {
      console.log(email);
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
  [REMIND_PASSWORD_SUCCESS]: (state, response) => {
    state.errors = '';
    state.success = response.data.success.message;
  },
  [REMIND_PASSWORD_ERROR]: (state, err) => {
    state.success = '';
    state.errors = err.response.data.errors;
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
