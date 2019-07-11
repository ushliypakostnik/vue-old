<template>
  <div>
    <h1>Account</h1>
    <v-btn large @click.prevent="logout">Sign Out</v-btn>
    <v-btn large @click.prevent="send">Send Verify Email</v-btn>
  </div>
</template>

<script>
import { AUTH_LOGOUT } from '../../store/actions/auth';
import {
  USER_REQUEST,
  SEND_VERIFY_EMAIL,
} from '../../store/actions/user';

export default {
  name: 'Account',

  beforeCreate() {
    this.$store.dispatch(USER_REQUEST);
  },

  methods: {
    logout() {
      this.$store.dispatch(AUTH_LOGOUT);
    },
    send() {
      this.$store.dispatch(SEND_VERIFY_EMAIL);
    },
  },
};
</script>

<style scoped>
</style>
