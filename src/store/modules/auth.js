/* eslint-disable promise/param-names */
import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from '../actions/auth';
import { USER_REQUEST } from '../actions/user'; // eslint-disable-line

import api from '../../api';

const state = { token: localStorage.getItem('user-token') || '', status: '', hasLoadedOnce: false };

const getters = {
  isAuthenticated: state => !!state.token, // eslint-disable-line
  authStatus: state => state.status, // eslint-disable-line
};

const actions = {
  [AUTH_REQUEST]: ({ commit, dispatch }, user) => { // eslint-disable-line
    return new Promise((resolve, reject) => { // eslint-disable-line
      commit(AUTH_REQUEST);
      api.postAuth(user)
        .then(response => { // eslint-disable-line
          localStorage.setItem('user-token', response.data.user.token);
        });
      /* apiCall({url: 'auth', data: user, method: 'POST'})
      .then(resp => {
        localStorage.setItem('user-token', resp.token);
        // Here set the header of your ajax library to the token value.
        // example with axios
        // axios.defaults.headers.common['Authorization'] = resp.token
        commit(AUTH_SUCCESS, resp);
        dispatch(USER_REQUEST);
        resolve(resp);
      })
      .catch(err => {
        commit(AUTH_ERROR, err);
        localStorage.removeItem('user-token');
        reject(err);
      }) */
    });
  },
  [AUTH_LOGOUT]: ({ commit, dispatch }) => { // eslint-disable-line
    return new Promise((resolve, reject) => { // eslint-disable-line
      commit(AUTH_LOGOUT);
      localStorage.removeItem('user-token');
      resolve();
    });
  },
};

const mutations = {
  [AUTH_REQUEST]: (state) => { // eslint-disable-line
    state.status = 'loading';
  },
  [AUTH_SUCCESS]: (state, resp) => { // eslint-disable-line
    state.status = 'success';
    state.token = resp.token;
    state.hasLoadedOnce = true;
  },
  [AUTH_ERROR]: (state) => { // eslint-disable-line
    state.status = 'error';
    state.hasLoadedOnce = true;
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
