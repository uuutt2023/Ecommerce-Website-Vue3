<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import * as Ysp from 'yup';
import VeeForm from '@/components/VeeForm.vue';

const { t } = useI18n();

const form = ref({
  act: '',
  pwd1: '',
  pwd2: '',
});

const item = {
  list: [
    {
      label: t('label.account'),
      name: 'act',
      type: 'text',
    },
    {
      label: t('label.password-n'),
      name: 'pwd1',
      type: 'password',
    },
    {
      label: t('label.password-2'),
      name: 'pwd2',
      type: 'password',
    },
  ],
  schema: Ysp.object({
    act: Ysp.string().required(t('error.required')),
    pwd1: Ysp.string()
      .required(t('error.required'))
      .test('unlikePwd', t('error.unlikePwd'), (val) =>
        form.value.pwd2.trim().length > 0 ? val === form.value.pwd2 : true,
      )
      .min(8, t('error.minLength', { num: 8 })),

    pwd2: Ysp.string()
      .required(t('error.required'))
      .test('unlikePwd', t('error.unlikePwd'), (val) =>
        form.value.pwd1.trim().length > 0 ? val === form.value.pwd1 : true,
      )
      .min(8, t('error.minLength', { num: 8 })),
  }),
  submit: t('submit.forgePwd'),
};
</script>

<template>
  <VeeForm
    v-model="form"
    v-bind="item">
    <template v-slot:btn>
      <RouterLink
        class="btn btn-secondary col-5"
        to="/index/signIn">
        {{ $t('jump.toSignIn') }}
      </RouterLink>
    </template>
  </VeeForm>
</template>
