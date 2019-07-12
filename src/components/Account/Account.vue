<template>
  <div>

    <v-toolbar
      color="blue-grey-dark"
      dark
      fixed
      app
      clipped-right
    >
      <v-toolbar-side-icon @click.stop="mini = !mini"></v-toolbar-side-icon>
      <v-toolbar-title>Vue cli based frontend boilerplate</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="drawerRight = !drawerRight"></v-toolbar-side-icon>
    </v-toolbar>

    <v-navigation-drawer
      fixed
      v-model="drawerRight"
      right
      clipped
      app
    >
    </v-navigation-drawer>

    <v-content>
      <v-container fluid fill-height>
        <v-layout>
            <h1>Account</h1>
            <v-btn large @click.prevent="logout">Sign Out</v-btn>
            <v-btn large @click.prevent="send">Send Verify Email</v-btn>
        </v-layout>
      </v-container>
    </v-content>

    <v-navigation-drawer
      v-model="drawer"
      class="left-panel"
      app
      fixed
      clipped
      :mini-variant.sync="mini"
      stateless
    >
    </v-navigation-drawer>

    <v-footer color="blue-grey" app>
      <v-container fluid>
        <span>Levon Gambaryan</span>
        <v-spacer></v-spacer>
        <span>&copy; 2017</span>
      </v-container>
    </v-footer>
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

  props: {
    source: String,
  },

  data: () => ({
    drawer: true,
    drawerRight: false,
    mini: true,
    right: null,
    items: [
      { title: 'Home', icon: 'dashboard' },
      { title: 'About', icon: 'question_answer' }
    ],
  }),

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

<style lang="scss" scoped>
.v-toolbar--clipped {
  z-index: 0;
}

.left-panel {
  margin-top: 0 !important;
  max-height: 100% !important;
}

.v-footer {
  .container {
    padding-top: 0;
    padding-bottom: 0;
  }
}
</style>
