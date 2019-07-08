<template>
  <div>
    <img src="../assets/logo.png" width="70px">
    <h1 class="app__header">Vue cli based frontend boilerplate</h1>
    <form @submit.prevent="login">
      <v-text-field
        v-model="email"
        :error-messages="emailErrors || errors.message"
        label="E-mail"
        required
        ref="input"
      ></v-text-field>
      <v-text-field
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

      <v-btn large type="submit">submit</v-btn>
      <v-text-field
        class="message"
        :error-messages="errors.message"
        height="0"
        disabled
      ></v-text-field>
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
    email: '',
    password: '',
    show: false,
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
