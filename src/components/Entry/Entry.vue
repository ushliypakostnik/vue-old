<template>
  <div>
    Auth: {{ this.$store.state.auth }}
    <Logo />
    <Login
      v-if="login"
      :email.sync="email"
    />
    <Remind
      v-else
      :email.sync="email"
    />

    <a
      href="#"
      class="switch"
      @click.prevent="usercase"
    >{{ login ? "Remind Рassword ?" : "Login / Registration" }}</a>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Logo from './Logo';
import Login from './Login';
import Remind from './Remind';

export default {
  name: 'Entry',

  components: {
    Logo,
    Login,
    Remind,
  },

  data: () => ({
    login: true,
    email: '',
  }),

  computed: {
    ...mapState({
      success: state => state.auth.success
    }),
    /* ...mapState('auth', { // namespaced: true in module auth
      success: state => state.success
    }), */
  },

  methods: {
    usercase() {
      this.login = !this.login;
      console.log(this.success.message);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/_stylebase.scss';

.switch {
  display: inline-block;
  margin-top: $size / 4;
}
</style>
