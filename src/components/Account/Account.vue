<template>
  <div class="account">

    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      :width="panelWidth"
      :mini-variant-width="panelWidthMin"
      :mini-variant.sync="mini"
      :mobile-break-point="breackpointSM"
    >
    </v-navigation-drawer>

    <v-navigation-drawer
      v-model="drawerMobile"
      app
      clipped
      right
      :width="panelWidthMobile"
      :mobile-break-point="breackpointSM"
    >
    </v-navigation-drawer>

    <v-toolbar
      color="blue-grey-dark"
      dark
      fixed
      app
      clipped-right
    >
      <v-toolbar-side-icon
        @click.stop="mini = !mini"
        class="desktop-nav"
      ></v-toolbar-side-icon>
      <v-toolbar-title>Vue cli based frontend boilerplate</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon
        @click.stop="drawerMobile = !drawerMobile"
        class="mobile-nav"
      ></v-toolbar-side-icon>
    </v-toolbar>

    <Loading v-if="isProfileLoaded"/>
    <v-content v-else>
      <v-container fluid fill-height>
        <v-layout>
          <div class="layout-wrapper">
            <h1>Account</h1>
            <h3>Email: <strong>{{ profile.usermail }}</strong></h3>
            <h3>isVerify: <strong>{{ profile.isVerify }}</strong></h3>
            <v-btn large @click.prevent="logout">Sign Out</v-btn>
            <div
              v-if="!profile.isVerify"
              class="button-wrapper"
            >
              <v-btn large @click.prevent="send">Send Verify Email</v-btn>
              <div class="wrapper">
                <v-text-field
                  v-if="ifEmailMessage"
                  class="wrapper__message"
                  :messages="emailMessage"
                  height="0"
                  disabled
                  success
                ></v-text-field>
              </div>
            </div>
          </div>
        </v-layout>

        <v-footer color="blue-grey">
          <v-container fluid>
            <span>Levon Gambaryan frontend</span>
            <v-spacer></v-spacer>
            <span>&copy; 2017</span>
          </v-container>
        </v-footer>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

import { AUTH_LOGOUT } from '../../store/actions/auth'; // eslint-disable-line no-unused-vars
import {
  USER_REQUEST, // eslint-disable-line no-unused-vars
  SEND_VERIFY_EMAIL, // eslint-disable-line no-unused-vars
} from '../../store/actions/user';

import ScreenHelper from '../../utils/screen-helper';

import { MESSAGES } from '../../constants';

import Loading from '../Utils/Loading';

const { mapGetters } = createNamespacedHelpers('user');

export default {
  name: 'Account',

  components: {
    Loading,
  },

  props: {
    source: String,
  },

  data: () => ({
    drawer: null,
    drawerMobile: false,
    mini: true,
    breackpointSM: ScreenHelper.SM,
  }),

  beforeCreate() {
    this.$store.dispatch('user/USER_REQUEST');
  },

  computed: {
    ...mapGetters({
      isProfileLoaded: 'isProfileLoaded',
      profile: 'getProfile',
      email: 'email',
    }),

    panelWidth() {
      if (ScreenHelper.isLG()) {
        return 320;
      }
      return 220;
    },

    panelWidthMin() {
      if (ScreenHelper.isLG()) {
        return 80;
      }
      return 60;
    },

    panelWidthMobile() {
      if (ScreenHelper.isMin()) {
        return 240;
      }
      return 300;
    },

    ifEmailMessage() {
      if (this.email !== '' || !this.profile.isVerify) return true;
      return false;
    },

    emailMessage() {
      if (this.email !== '') return MESSAGES.resend_verify_email;
      if (!this.profile.isVerify) return MESSAGES.verify_account;
      return '';
    },
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
@import '../../styles/_stylebase.scss';

.account {
  height: 100%;
}

.v-toolbar__title {
  @include xs {
    font-size: 14px;
    margin-left: 0;
  }
}

// Content

.v-content {
  height: 100%;
}

.v-content__wrap {
  .container {
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
  }
}

.layout {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  align-self: stretch;

  .layout-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    align-self: stretch;
    padding: 0 $size;

    h1 {
      align-self: stretch;
      padding: $size 0;
    }

    h3 {
      margin-bottom: $size;
    }

    .v-btn {
      width: 300px;
      margin-bottom: $size;

      @include xs {
        width: 100%;
      }
    }

    .button-wrapper .v-btn {
      margin-bottom: 0;
    }

    .wrapper__message {
      width: 300px;
    }
  }
}

.mobile-nav {
  @include not-xs {
    display: none;
  }
  @include xs {
    display: block;
  }
}

.desktop-nav {
  @include not-xs {
    display: block;
  }
  @include xs {
    display: none;
  }
}

.v-footer {
  .container {
    width: 100%;
    padding: 0 $size;
    display: flex;
    flex-direction: row;
  }
}
</style>
