/* eslint-disable promise/param-names */
import axios from 'axios';

import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  SEND_VERIFY_EMAIL,
} from '../actions/auth';

import api from '../../api';

const state = { usermail: '', token: localStorage.getItem('user-token') || '', status: '' };

/* eslint-disable no-shadow */
const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
  usermail: state => state.usermail,
};
/* eslint-enable no-shadow */

const actions = {
  // eslint-disable-next-line arrow-body-style
  [AUTH_REQUEST]: ({ commit }, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST);
      api.postAuth(user)
        .then((response) => {
          const token = response.data.user.token;
          localStorage.setItem('user-token', token);
          // eslint-disable-next-line dot-notation
          axios.defaults.headers.common['Authorization'] = token;
          commit(AUTH_SUCCESS, response);
          resolve(response);
        })
        .catch((err) => {
          commit(AUTH_ERROR, err);
          localStorage.removeItem('user-token');
          // eslint-disable-next-line dot-notation
          delete axios.defaults.headers.common['Authorization'];
          reject(err);
        });
    });
  },
  [SEND_VERIFY_EMAIL]: (usermail) => {
    const token = state.token;
    return new Promise((resolve, reject) => {
      api.getVerifyEmail(usermail, token)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    const token = state.token;
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT);
      localStorage.removeItem('user-token');
      // eslint-disable-next-line dot-notation
      delete axios.defaults.headers.common['Authorization'];
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
  [AUTH_ERROR]: ({ commit }) => {
    return new Promise((resolve) => {
      commit(AUTH_ERROR);
      resolve();
    });
  },
};

/* eslint-disable no-shadow */
const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = 'loading';
  },
  [AUTH_SUCCESS]: (state, response) => {
    state.status = 'success';
    state.usermail = response.data.user.usermail;
    state.token = response.data.user.token;
  },
  [AUTH_ERROR]: (state) => {
    state.status = 'error';
  },
  [AUTH_LOGOUT]: (state) => {
    state.usermail = '';
    state.token = '';
  },
};
/* eslint-enable no-shadow */

export default {
  state,
  getters,
  actions,
  mutations,
};
