import Vue from 'vue';
import { USER_REQUEST, USER_ERROR, USER_SUCCESS } from '../actions/user';
import { AUTH_LOGOUT } from '../actions/auth';

const state = { status: '', profile: {} };

const getters = {
  getProfile: state => state.profile, // eslint-disable-line
  isProfileLoaded: state => !!state.profile.name, // eslint-disable-line
};

const actions = {
  [USER_REQUEST]: ({ commit, dispatch }) => { // eslint-disable-line
    commit(USER_REQUEST);
    /* apiCall({url: 'user/me'})
      .then(resp => {
        commit(USER_SUCCESS, resp);
      })
      .catch(resp => {
        commit(USER_ERROR);
        // if resp is unauthorized, logout, to
        dispatch(AUTH_LOGOUT);
      }) */
  },
};

const mutations = {
  [USER_REQUEST]: (state) => { // eslint-disable-line
    state.status = 'loading';
  },
  [USER_SUCCESS]: (state, resp) => { // eslint-disable-line
    state.status = 'success';
    Vue.set(state, 'profile', resp);
  },
  [USER_ERROR]: (state) => { // eslint-disable-line
    state.status = 'error';
  },
  [AUTH_LOGOUT]: (state) => { // eslint-disable-line
    state.profile = {};
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
