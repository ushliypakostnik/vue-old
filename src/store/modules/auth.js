/* eslint-disable promise/param-names */
import axios from 'axios';

import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
} from '../actions/auth';

import api from '../../api';

const state = { token: localStorage.getItem('user-token') || '', status: '' };

const getters = {
  isAuthenticated: state => !!state.token, // eslint-disable-line
  authStatus: state => state.status, // eslint-disable-line
};

const actions = {
  [AUTH_REQUEST]: ({ commit, dispatch }, user) => { // eslint-disable-line
    return new Promise((resolve, reject) => { // eslint-disable-line
      commit(AUTH_REQUEST);
      api.postAuth(user)
        .then((response) => {
          const token = response.data.user.token;
          localStorage.setItem('user-token', token);
          axios.defaults.headers.common['Authorization'] = token; // eslint-disable-line
          commit(AUTH_SUCCESS, response);
          resolve(response);
        })
        .catch((err) => {
          commit(AUTH_ERROR, err);
          localStorage.removeItem('user-token');
          delete axios.defaults.headers.common['Authorization']; // eslint-disable-line
          reject(err);
        });
    });
  },
  [AUTH_LOGOUT]: ({ commit, dispatch }) => { // eslint-disable-line
    const token = state.token;
    return new Promise((resolve, reject) => { // eslint-disable-line
      commit(AUTH_LOGOUT);
      api.getLogout(token)
        .then((response) => {
          localStorage.removeItem('user-token');
          delete axios.defaults.headers.common['Authorization']; // eslint-disable-line
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  [AUTH_ERROR]: ({ commit, dispatch }) => { // eslint-disable-line
    return new Promise((resolve, reject) => { // eslint-disable-line
      commit(AUTH_ERROR);
      resolve();
    });
  },
};

const mutations = {
  [AUTH_REQUEST]: (state) => { // eslint-disable-line
    state.status = 'loading';
  },
  [AUTH_SUCCESS]: (state, response) => { // eslint-disable-line
    state.status = 'success';
    state.token = response.data.user.token;
  },
  [AUTH_ERROR]: (state) => { // eslint-disable-line
    state.status = 'error';
  },
  [AUTH_LOGOUT]: (state) => { // eslint-disable-line
    state.token = '';
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
