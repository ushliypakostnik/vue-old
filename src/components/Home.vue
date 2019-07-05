<template>
  <div>
    <Loading v-if="loading"/>
    <div v-if="isAuthenticated">
      <Account />
    </div>
    <div v-if="!isAuthenticated && authStatus !== 'loading'">
      <Login />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Loading from './Loading';
import Login from './Login';
import Account from './Account';

export default {
  name: 'Home',
  components: {
    Loading,
    Login,
    Account,
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'authStatus']),

    loading() {
      return this.authStatus === 'loading' && !this.isAuthenticated;
    },
  },
};
</script>

<style scoped>
</style>
