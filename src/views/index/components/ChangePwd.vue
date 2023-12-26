<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import * as Ysp from 'yup';
import { veeLabel, veeRules } from '@/assets/js/rules';
import { changePwd } from '@/assets/js/submit';
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
  list: [veeLabel.act, veeLabel.pwdN, veeLabel.pwd2],
  submit: t('submit.forgePwd'),
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
    @submit="changePwd">
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
    </VeeField>
  </Form>
</template>
