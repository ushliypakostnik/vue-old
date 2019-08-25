import Vue from 'vue';

import {
  USER_REQUEST,
  USER_ERROR,
  USER_SUCCESS,
  SEND_VERIFY_EMAIL,
  SEND_VERIFY_EMAIL_SUCCESS,
  SEND_VERIFY_EMAIL_ERROR,
} from '../actions/user';
import { AUTH_LOGOUT } from '../actions/auth';

import api from '../../api';
import storage from '../../storage';

const state = {
  status: '',
  profile: {},
  email: '',
};

/* eslint-disable no-shadow */
const getters = {
  getProfile: state => state.profile,
  isProfileLoaded: state => !!state.profile.name,
  email: state => state.email,
};
/* eslint-enable no-shadow */

const actions = {
  [USER_REQUEST]: ({ commit, dispatch }) => {
    commit(USER_REQUEST);
    api.getUserProfile()
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
  [SEND_VERIFY_EMAIL]: ({ commit }) => {
    const usermail = localStorage.getItem('user-mail');
    return new Promise((resolve, reject) => {
      api.postVerifyEmail(usermail)
        .then((response) => {
          commit(SEND_VERIFY_EMAIL_SUCCESS);
          resolve(response);
        })
        .catch((err) => {
          commit(SEND_VERIFY_EMAIL_ERROR);
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
    Vue.set(state, 'profile', responce.data.user);
  },
  [USER_ERROR]: (state) => {
    state.status = 'error';
  },
  [AUTH_LOGOUT]: (state) => {
    state.profile = {};
  },
  [SEND_VERIFY_EMAIL_SUCCESS]: (state) => {
    state.email = 'success';
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
