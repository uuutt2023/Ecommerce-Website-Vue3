<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import * as Ysp from 'yup';
import VeeForm from '@/components/VeeForm.vue';
import axios from 'axios';
import router from '@/router';

const { t } = useI18n();

const form = ref({
  act: '',
  pwd: '',
});

const item = {
  list: [
    {
      label: t('label.account'),
      name: 'act',
      type: 'text',
    },
    {
      label: t('label.password'),
      name: 'pwd',
      type: 'password',
    },
  ],
  schema: Ysp.object({
    act: Ysp.string().required(t('error.required')),
    pwd: Ysp.string()
      // 必填
      .required(t('error.required'))
      // 字符串长度至少 6
      .min(6, t('error.minLength', { num: 8 })),
  }),
  submit: t('submit.signIn'),
};

function onLogin(values, actions) {
  axios
    .post(
      '/api/user/login',
      {
        username: values.act,
        password: values.pwd,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    .then((resp) => {
      console.log(resp.data);
      if (resp.data.result === 'error') {
        actions.setErrors({
          act: '用户名或密码错误',
          pwd: '用户名或密码错误',
        });
      } else {
        console.log('登录成功');
        router.push(`/${resp.data.data.roles}`);
      }
    });
}
</script>

<template>
  <VeeForm
    v-model="form"
    v-bind="item"
    @submit="onLogin">
    <template v-slot:btn>
      <RouterLink
        class="btn btn-secondary col-5"
        to="/index/signUp">
        {{ $t('jump.toSignUp') }}
      </RouterLink>
    </template>
    <template v-slot:forge>
      <RouterLink
        class="col-auto text-center mx-auto mt-2 text-decoration-none"
        to="/index/forge">
        {{ $t('jump.toForgePwd') }}
      </RouterLink>
    </template>
  </VeeForm>
</template>
