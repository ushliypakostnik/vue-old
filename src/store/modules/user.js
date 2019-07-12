import Vue from 'vue';

import {
  USER_REQUEST,
  USER_ERROR,
  USER_SUCCESS,
  SEND_VERIFY_EMAIL,
} from '../actions/user';
import { AUTH_LOGOUT } from '../actions/auth';

import api from '../../api';
import storage from '../../storage';

const state = {
  status: '',
  profile: {},
};

/* eslint-disable no-shadow */
const getters = {
  getProfile: state => state.profile,
  isProfileLoaded: state => !!state.profile.name,
};
/* eslint-enable no-shadow */

const actions = {
  [USER_REQUEST]: ({ commit, dispatch }) => {
    const token = localStorage.getItem('user-token');
    commit(USER_REQUEST);
    api.getUserProfile(token)
      .then((responce) => {
        commit(USER_SUCCESS, responce);
        storage.setUserProfile(responce);
      })
      .catch(() => {
        commit(USER_ERROR);
        // if resp is unauthorized, logout, to
        dispatch('auth/AUTH_LOGOUT', null, { root: true });
      });
  },
  [SEND_VERIFY_EMAIL]: () => {
    const usermail = localStorage.getItem('user-mail');
    const token = localStorage.getItem('user-token');
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
};

/* eslint-disable no-shadow */
const mutations = {
  [USER_REQUEST]: (state) => {
    state.status = 'loading';
  },
  [USER_SUCCESS]: (state, responce) => {
    state.status = 'success';
    Vue.set(state, 'profile', responce);
  },
  [USER_ERROR]: (state) => {
    state.status = 'error';
  },
  [AUTH_LOGOUT]: (state) => {
    state.profile = {};
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
