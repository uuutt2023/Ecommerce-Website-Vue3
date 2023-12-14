<script setup>
import { ref } from 'vue';
// 验证规则
import * as Ysp from 'yup';
// 验证表单
import { Form as VeeForm } from 'vee-validate';
import VeeInput from '@/components/VeeInput.vue';
// 国际化
import i18n from '@/i18n';

const $i18n = (val, ...args) => i18n.global.t(val, ...args);

const schema = Ysp.object({
  act: Ysp.string().required($i18n('msg.required')),
  pwd1: Ysp.string()
    .required($i18n('msg.required'))
    .min(8, $i18n('msg.minLength', { num: 8 })),
});

const form = ref({
  act: '',
  pwd: '',
});

const list_input = [
  {
    label: $i18n('label.username'),
    name: 'act',
    type: 'text',
  },
  {
    label: $i18n('label.password_1'),
    name: 'pwd1',
    type: 'password',
  },
];
</script>

<template>
  <header>
    <h2>{{ $t('webIndex.signIn.h1') }}</h2>
    <h5>{{ $t('webIndex.signIn.h2') }}</h5>
  </header>

  <!-- 验证表单 -->
  <VeeForm
    :validation-schema="schema"
    class="d-grid my-3 my-md-4 p-3 p-md-4">
    <!-- 输入框 -->
    <VeeInput
      v-for="(item, index) in list_input"
      :key="index"
      v-model="form[item.name]"
      v-bind="item" />

    <button
      class="btn btn-success mt-4 p-2"
      type="submit">
      {{ $t('webIndex.signIn.submit') }}
    </button>
  </VeeForm>

  <!-- 跳转按钮 -->
  <footer class="row justify-content-around">
    <RouterLink
      class="btn btn-primary col-5 p-2"
      to="/index/signUp">
      {{ $t('button.jumpToSignUp') }}
    </RouterLink>

    <RouterLink
      class="btn btn-info col-5 p-2 text-white"
      to="/index/forge">
      {{ $t('button.jumpToForgePwd') }}
    </RouterLink>
  </footer>
</template>
