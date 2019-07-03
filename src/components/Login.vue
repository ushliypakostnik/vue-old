<template>
  <form>
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="E-mail"
      required
      ref="input"
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
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
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
    >
      <template v-slot:progress>
        <v-progress-linear
          :password="progress"
          :color="color"
          height="7"
        ></v-progress-linear>
      </template>
    </v-text-field>

    <v-btn large @click="submit">submit</v-btn>
    Output: {{ output }}
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email, minLength } from 'vuelidate/lib/validators';

import api from '../api';

export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) },
  },

  data: () => ({
    name: '',
    email: '',
    show: false,
    password: '',
    output: '',
  }),

  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push('Must be valid e-mail'); // eslint-disable-line
      !this.$v.email.required && errors.push('E-mail is required'); // eslint-disable-line
      return errors;
    },

    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push('Password is required'); // eslint-disable-line
      !this.$v.password.minLength && errors.push('Password must be more than 5 characters'); // eslint-disable-line
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
    submit() {
      this.$v.$touch();
      this.output = {
        email: this.$refs.input.value,
        password: this.$refs.password.value,
      };
      api.postAuth(this.output)
        .then((response) => {
          this.output = response;
        });
    },
  },
};
</script>

<style scoped>
</style>
