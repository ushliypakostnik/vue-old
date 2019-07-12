<template>
  <div>
    <h1>Account</h1>
    <v-btn large @click.prevent="logout">Sign Out</v-btn>
    <v-btn large @click.prevent="send">Send Verify Email</v-btn>
  </div>
</template>

<script>
import { AUTH_LOGOUT } from '../../store/actions/auth'; // eslint-disable-line no-unused-vars
import {
  USER_REQUEST, // eslint-disable-line no-unused-vars
  SEND_VERIFY_EMAIL, // eslint-disable-line no-unused-vars
} from '../../store/actions/user';

export default {
  name: 'Account',

  beforeCreate() {
    this.$store.dispatch('user/USER_REQUEST');
  },

  methods: {
    logout() {
      this.$store.dispatch('auth/AUTH_LOGOUT');
    },
    send() {
      this.$store.dispatch('user/SEND_VERIFY_EMAIL');
    },
  },
};
</script>

<style scoped>
</style>
