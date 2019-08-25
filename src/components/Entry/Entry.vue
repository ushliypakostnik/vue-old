<template>
  <div class="entry">
    <v-container>
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
    </v-container>
  </div>
</template>

<script>
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

  methods: {
    usercase() {
      this.login = !this.login;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/_stylebase.scss';

.entry {
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;

  .container {
    position: relative;
    top: -7vh;
    height: 530px;
  }
}

.switch {
  display: inline-block;
  margin-top: $size / 4;
}
</style>
