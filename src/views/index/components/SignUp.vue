<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import * as Ysp from 'yup';
import { veeLabel, veeRules } from '@/assets/js/rules';
import { onSignUp } from '@/assets/js/submit';
import VeeField from '@/components/VeeField.vue';
import { Form } from 'vee-validate';

const { t } = useI18n();

const form = ref({
  act: '',
  pwd1: '',
  pwd2: '',
});
const rules = veeRules(form);
const item = {
  list: [veeLabel.act, veeLabel.pwd1, veeLabel.pwd2],
  submit: t('submit.signUp'),
};

const schema = Ysp.object({
  act: rules.act,
  pwd1: rules.pwd1,
  pwd2: rules.pwd2,
});
</script>

<template>
  <Form
    :validation-schema="schema"
    class="row form"
    @submit="onSignUp">
    <VeeField
      v-model="form"
      v-bind="item">
      <template v-slot:btn>
        <RouterLink
          class="text-white text-decoration-none"
          to="/index/signIn">
          {{ $t('jump.toSignIn') }}
        </RouterLink>
      </template>
      <template v-slot:forge>
        <RouterLink
          class="col-auto text-center mx-auto mt-2 text-decoration-none"
          to="/index/changePwd">
          {{ $t('jump.toForgePwd') }}
        </RouterLink>
      </template>
    </VeeField>
  </Form>
</template>
