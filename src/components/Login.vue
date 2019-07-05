<template>
  <div>
    <img src="../assets/logo.png" width="70px">
    <h1 class="app__header">Vue cli based frontend boilerplate</h1>
    <form @submit.prevent="login">
      <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        label="E-mail"
        required
        ref="input"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :error-messages="passwordErrors"
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

      <v-btn large type="submit">submit</v-btn>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, email, minLength } from 'vuelidate/lib/validators';

import { AUTH_REQUEST } from '../store/actions/auth';

export default {
  name: 'Login',

  mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) },
  },

  data: () => ({
    name: '',
    email: '',
    password: '',
    show: false,
  }),

  computed: {
    ...mapGetters(['authStatus']),

    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push('Must be valid e-mail'); // eslint-disable-line
      !this.$v.email.required && errors.push('E-mail is required'); // eslint-disable-line
      if (this.authError !== '') {
        errors.push(this.authError);
      }
      return errors;
    },

    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push('Password is required'); // eslint-disable-line
      !this.$v.password.minLength && errors.push('Password must be more than 5 characters'); // eslint-disable-line
      return errors;
    },

    authError() {
      const errors = [];
      if (this.authStatus === 'error') {
        errors.push('Authorization / registration failed');
      }
      return errors;
    },

    progress() {
      return Math.min(100, this.password.length * 10);
    },
    color() {
      return ['error', 'warning', 'success'][Math.floor(this.progress / 30)];
    },

  },

  methods: {
    login() {
      this.$v.$touch();
      const usermail = this.$refs.input.value;
      const password = this.$refs.password.value;
      // eslint-disable-next-line
      if (!!!(this.emailErrors + this.passwordErrors)) {
        this.$store.dispatch(AUTH_REQUEST, { usermail, password });
      }
    },
  },
};
</script>

<style scoped>
</style>
