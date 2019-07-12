<template>
  <div class="password">
    <Logo />
    <form @submit.prevent="submit">
      <v-text-field
        v-model="password1"
        :error-messages="password1Errors"
        :append-icon="show ? 'visibility' : 'visibility_off'"
        :type="show ? 'text' : 'password'"
        label="Password"
        ref="p1"
        required
        loading
        @click:append="show = !show"
      >
        <template v-slot:progress>
          <v-progress-linear
            :password="progress1"
            :color="color1"
            height="7"
          ></v-progress-linear>
        </template>
      </v-text-field>
      <v-text-field
        v-model="password2"
        :error-messages="password2Errors"
        :append-icon="show ? 'visibility' : 'visibility_off'"
        :type="show ? 'text' : 'password'"
        label="Password again"
        ref="p2"
        required
        loading
        @click:append="show = !show"
      >
        <template v-slot:progress>
          <v-progress-linear
            :password="progress2"
            :color="color2"
            height="7"
          ></v-progress-linear>
        </template>
      </v-text-field>

      <v-btn large type="submit">Set password</v-btn>

      <div class="wrapper">
        <v-text-field
          class="wrapper__message"
          :error-messages="match"
          height="0"
          disabled
          error
        ></v-text-field>
      </div>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, minLength } from 'vuelidate/lib/validators';

// eslint-disable-next-line no-unused-vars
import { SET_NEW_PASSWORD } from '../../store/actions/pass';

import Logo from '../Entry/Logo';

export default {
  name: 'Login',

  components: {
    Logo,
  },

  mixins: [validationMixin],

  validations: {
    password1: { required, minLength: minLength(6) },
    password2: { required, minLength: minLength(6) },
  },

  data: () => ({
    password1: '',
    password2: '',
    show: false,
    match: '',
  }),

  computed: {

    password1Errors() {
      const err = [];
      if (!this.$v.password1.$dirty) return err;
      !this.$v.password1.required && err.push('Password is required'); // eslint-disable-line
      !this.$v.password1.minLength && err.push('Password must be more than 5 characters'); // eslint-disable-line
      return err;
    },

    password2Errors() {
      const err = [];
      if (!this.$v.password2.$dirty) return err;
      !this.$v.password2.required && err.push('Password is required'); // eslint-disable-line
      !this.$v.password2.minLength && err.push('Password must be more than 5 characters'); // eslint-disable-line
      return err;
    },

    progress1() {
      return Math.min(100, this.password1.length * 10);
    },
    progress2() {
      return Math.min(100, this.password2.length * 10);
    },
    color1() {
      return ['error', 'warning', 'success'][Math.floor(this.progress1 / 30)];
    },
    color2() {
      return ['error', 'warning', 'success'][Math.floor(this.progress2 / 30)];
    },
  },

  methods: {
    submit() {
      this.$v.$touch();

      const p1 = this.$refs.p1.value;
      const p2 = this.$refs.p2.value;
      // eslint-disable-next-line
      if (!!!(this.password1Errors + this.password2Errors)) {
        if (p1 !== p2) {
          this.match = 'Passwords do not match';
        } else {
          const query = this.$route.hash;
          const id = query.split('&')[0].slice(4);
          const token = query.split('&')[1].slice(6);
          this.$store.dispatch('pass/SET_NEW_PASSWORD', token);
          this.$router.replace({ name: 'Home' });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
