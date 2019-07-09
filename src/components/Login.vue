<template>
  <div class="login">
    <img src="../assets/logo.png" width="70px">
    <h1 class="login__header">Vue cli based frontend boilerplate</h1>
    <form @submit.prevent="submit">
      <v-text-field
        v-model="email"
        :error-messages="emailErrors || errors.message"
        label="E-mail"
        required
        ref="input"
      ></v-text-field>
      <v-text-field
        v-if="login"
        v-model="password"
        :error-messages="passwordErrors || errors.message"
        :append-icon="show ? 'visibility' : 'visibility_off'"
        :type="show ? 'text' : 'password'"
        label="Password"
        ref="password"
        required
        loading
        @click:append="show = !show"
      >
        <template v-slot:progress>
          <v-progress-linear
            :password="progress"
            :color="color"
            height="7"
          ></v-progress-linear>
        </template>
      </v-text-field>

      <v-btn large type="submit">{{ !login ? "Remind Рassword" : "Login / Registration" }}</v-btn>
      <v-text-field
        class="message"
        :error-messages="errors.message"
        height="0"
        disabled
      ></v-text-field>
      <a
        href="#"
        class="login__remind-password-link"
        @click.prevent="login = !login"
      >{{ login ? "Remind Рassword ?" : "Login / Registration" }}</a>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, email, minLength } from 'vuelidate/lib/validators';

import {
  AUTH_REQUEST,
  REMIND_PASSWORD,
} from '../store/actions/auth';

export default {
  name: 'Login',

  mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) },
  },

  data: () => ({
    email: '',
    password: '',
    show: false,
    login: false,
  }),

  computed: {
    ...mapGetters(['errors']),

    emailErrors() {
      const err = [];
      if (!this.$v.email.$dirty) return err;
      !this.$v.email.email && err.push('Must be valid e-mail'); // eslint-disable-line
      !this.$v.email.required && err.push('E-mail is required'); // eslint-disable-line
      return err;
    },

    passwordErrors() {
      const err = [];
      if (!this.$v.password.$dirty) return err;
      !this.$v.password.required && err.push('Password is required'); // eslint-disable-line
      !this.$v.password.minLength && err.push('Password must be more than 5 characters'); // eslint-disable-line
      return err;
    },

    progress() {
      return Math.min(100, this.password.length * 10);
    },
    color() {
      return ['error', 'warning', 'success'][Math.floor(this.progress / 30)];
    },

  },

  methods: {
    submit() {
      this.$v.$touch();
      const usermail = this.$refs.input.value;

      if (this.login) {
        const password = this.$refs.password.value;
        // eslint-disable-next-line
        !!!(this.emailErrors + this.passwordErrors) &&
          this.$store.dispatch(AUTH_REQUEST, { usermail, password });
      } else {
        // eslint-disable-next-line
        this.emailErrors !== [] && this.$store.dispatch(REMIND_PASSWORD, { usermail });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/_stylebase.scss';

.login {
  text-align: center;

  .container {
    padding-top: 60px;
    padding-bottom: 60px;

    @media only screen {
      max-width: 300px;
    }
  }

  &__header {
    font-size: 28px;
    color: $color_white;

    @include xs {
      font-size: 24px;
    }
  }

  &__remind-password-link {
    display: inline-block;
    margin-top: $size / 4;
  }
}
</style>
