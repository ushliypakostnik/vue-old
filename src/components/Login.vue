<template>
  <div class="login">
    <Logo />
    <form @submit.prevent="submit">
      <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        label="E-mail"
        required
        ref="input"
        @input="clear"
      ></v-text-field>
      <v-text-field
        v-if="login"
        v-model="password"
        :error-messages="passwordErrors"
        :append-icon="show ? 'visibility' : 'visibility_off'"
        :type="show ? 'text' : 'password'"
        label="Password"
        ref="password"
        required
        loading
        @click:append="show = !show"
        @input="clear"
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

      <a
        href="#"
        class="login__remind-password-link"
        @click.prevent="usercase"
      >{{ login ? "Remind Рassword ?" : "Login / Registration" }}</a>

      <v-text-field
        v-if="errors"
        class="message"
        :error-messages="message1"
        height="0"
        disabled
        error
      ></v-text-field>
      <v-text-field
        v-if="success"
        class="message"
        :messages="message2"
        height="0"
        disabled
        success
      ></v-text-field>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { validationMixin } from 'vuelidate';
import {
  required,
  email,
  minLength
} from 'vuelidate/lib/validators';

import {
  AUTH_REQUEST,
  REMIND_PASSWORD,
} from '../store/actions/auth';

import Logo from './Logo';

export default {
  name: 'Login',

  components: {
    Logo,
  },

  mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) },
  },

  data: () => ({
    email: '',
    password: '',
    passerrors: false,
    show: false,
    login: true,
    input: false,
  }),

  computed: {
    ...mapGetters(['errors', 'success']),

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
      if (this.passerrors) { return null; }
      return err;
    },

    message1() {
      if (!this.input) {
        return this.errors.message;
      }
      return null;
    },

    message2() {
      if (!this.input) {
        return String(this.success);
      }
      return '';
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
      this.input = false;
      const usermail = this.$refs.input.value;

      if (this.login) {
        const password = this.$refs.password.value;
        // eslint-disable-next-line
        !!!(this.emailErrors + this.passwordErrors) &&
          this.$store.dispatch(AUTH_REQUEST, { usermail, password });
      } else {
        console.log(this.emailErrors.length === 0);
        // eslint-disable-next-line
        this.emailErrors.length === 0 && this.$store.dispatch(REMIND_PASSWORD, usermail);
      }
    },

    usercase() {
      this.login = !this.login;
      this.clear();
      this.passerrors = true;
    },

    clear() {
      this.input = true;
      this.passerrors = false;
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

  &__remind-password-link {
    display: inline-block;
    margin-top: $size;
  }
}
</style>
