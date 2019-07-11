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

      <v-btn large type="submit">Remind Рassword</v-btn>

      <div class="wrapper">
        <v-text-field
          v-if="success"
          class="wrapper__message"
          :messages="success.message"
          height="0"
          disabled
          success
        ></v-text-field>
        <v-text-field
          v-else
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
} from '../../store/actions/auth';

export default {
  name: 'Login',

  components: {
  },

  mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) },
  },

  props: {
    email: String,
  },

  data: () => ({
  }),

  computed: {
    ...mapGetters(['error', 'success']),

    usermail: {
      get: function(){
        return this.email;
      },
      set: function(newValue){
        this.$emit('update:email', newValue);
      }
    },

    emailErrors() {
      const err = [];
      if (!this.$v.email.$dirty) return err;
      !this.$v.email.email && err.push('Must be valid e-mail'); // eslint-disable-line
      !this.$v.email.required && err.push('E-mail is required'); // eslint-disable-line
      return err;
    },
  },

  methods: {
    submit() {
      this.$v.$touch();
      const usermail = this.$refs.usermailref.value;
      // eslint-disable-next-line
      this.emailErrors.length === 0 && this.$store.dispatch(REMIND_PASSWORD, usermail);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
