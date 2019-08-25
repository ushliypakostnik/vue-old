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
import { createNamespacedHelpers } from 'vuex';

import { validationMixin } from 'vuelidate';
import {
  required,
  email,
  minLength,
} from 'vuelidate/lib/validators';

// eslint-disable-next-line no-unused-vars
import { REMIND_PASSWORD } from '../../store/actions/pass';

import { UTILS, MESSAGES } from '../../constants';

const { mapGetters } = createNamespacedHelpers('pass');

export default {
  name: 'Remind',

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
  }),

  computed: {
    ...mapGetters({
      error: 'error',
      success: 'success',
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
  },

  methods: {
    submit() {
      this.$v.$touch();
      const usermail = this.$refs.usermailref.value;
      // eslint-disable-next-line
      this.emailErrors.length === 0 && this.$store.dispatch('pass/REMIND_PASSWORD', usermail);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
