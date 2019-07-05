<template>
  <div>
    <h1>Account</h1>
    <v-btn large @click.prevent="logout">Sign Out</v-btn>
  </div>
</template>

<script>
import { AUTH_LOGOUT } from '../store/actions/auth';

export default {
  name: 'Account',

  methods: {
    logout() {
      this.$store.dispatch(AUTH_LOGOUT);
    },
  },
};
</script>

<style scoped>
</style>
