<template>
  <div>
    <form @submit.prevent="submit">
      <v-text-field
        v-model="usermail"
        :error-messages="emailErrors"
        label="E-mail"
        required
        ref="usermailref"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :error-messages="passwordErrors"
        :append-icon="show ? 'visibility' : 'visibility_off'"
        :type="show ? 'text' : 'password'"
        label="Password"
        ref="passwordref"
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

      <v-btn large type="submit">Login / Registration</v-btn>

      <div class="wrapper">
        <v-text-field
          v-if="error"
          class="wrapper__message"
          :error-messages="error.message"
          height="0"
          disabled
          error
        ></v-text-field>
      </div>
    </form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

import { validationMixin } from 'vuelidate';
import {
  required,
  email,
  minLength,
} from 'vuelidate/lib/validators';

// eslint-disable-next-line no-unused-vars
import { AUTH_REQUEST } from '../../store/actions/auth';

import { UTILS, MESSAGES } from '../../constants';

const { mapGetters } = createNamespacedHelpers('auth');

export default {
  name: 'Login',

  components: {
  },

  mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: { required, minLength: minLength(UTILS.min_password_lenght) },
  },

  props: {
    email: String,
  },

  data: () => ({
    password: '',
    show: false,
  }),

  computed: {
    ...mapGetters({
      error: 'error',
    }),

    usermail: {
      get() {
        return this.email;
      },
      set(value) {
        this.$emit('update:email', value);
      },
    },

    emailErrors() {
      const err = [];
      if (!this.$v.email.$dirty) return err;
      !this.$v.email.email && err.push(MESSAGES.email_must_be_valid); // eslint-disable-line
      !this.$v.email.required && err.push(MESSAGES.email_required); // eslint-disable-line
      return err;
    },

    passwordErrors() {
      const err = [];
      if (!this.$v.password.$dirty) return err;
      !this.$v.password.required && err.push(MESSAGES.password_required); // eslint-disable-line
      !this.$v.password.minLength && err.push(MESSAGES.password_min_lenght); // eslint-disable-line
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
      const usermail = this.$refs.usermailref.value;
      const password = this.$refs.passwordref.value;
      // eslint-disable-next-line
      !!!(this.emailErrors + this.passwordErrors) &&
        this.$store.dispatch('auth/AUTH_REQUEST', { usermail, password });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
