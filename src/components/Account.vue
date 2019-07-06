<template>
  <div>
    <h1>Account</h1>
    <v-btn large @click.prevent="logout">Sign Out</v-btn>
    <v-btn large @click.prevent="send">Send Verify Email</v-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import {
  AUTH_LOGOUT,
  SEND_VERIFY_EMAIL,
} from '../store/actions/auth';

export default {
  name: 'Account',

  computed: {
    ...mapGetters(['usermail']),
  },

  methods: {
    logout() {
      this.$store.dispatch(AUTH_LOGOUT);
    },
    send() {
      const usermail = this.usermail;
      this.$store.dispatch(SEND_VERIFY_EMAIL, usermail);
    },
  },
};
</script>

<style scoped>
</style>
