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
        @input="clear"
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
        @input="clear"
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
      <v-text-field
        class="message"
        :error-messages="match"
        height="0"
        disabled
        error
      ></v-text-field>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, minLength } from 'vuelidate/lib/validators';

/* import {
  SET_TOKEN,
} from '../store/actions/auth'; */

import Logo from './Logo';

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
    match: null,
  }),

  /* beforeCreate() {
    // console.log('Старт!', this.$route.params.query);
    if (this.$route.hash) {
      console.log(this.$route.hash.slice(0, 7));
      if (this.$route.hash.slice(0, 7) === '#token=') {
        console.log("Да!");
        const token = this.$route.hash.slice(7);
        console.log(token);
        this.$store.dispatch(SET_TOKEN, token);
        this.$router.replace({ name: 'Home'});
      }
    }
  }, */

  computed: {
    ...mapGetters(['errors']),

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
        if (p1 === p2) {
          // this.$store.dispatch(ACTION, {});
        } else {
          this.match = 'Passwords do not match';
        }
      }
    },

    clear() {
      this.match = null;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/_stylebase.scss';

.password {
  &__header {
    font-size: 28px;
    color: $color_white;

    @include xs {
      font-size: 24px;
    }
  }
}
</style>
