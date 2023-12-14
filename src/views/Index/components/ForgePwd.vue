<script setup>
import VeeInput from '@/components/VeeInput.vue';
import { Form as VeeForm } from 'vee-validate';
import i18n from '@/i18n';
import { ref } from 'vue';
import * as Ysp from 'yup';
// 用户输入数据
const form = ref({
  act: '',
  pwd1: '',
  pwd2: '',
});
// i18n 提取 t 方法
const $i18n = (val, ...args) => i18n.global.t(val, ...args);
// yup 校验规则
const schema = Ysp.object({
  act: Ysp.string().required($i18n('msg.required')),

  pwd1: Ysp.string()
    .required($i18n('msg.required'))
    .test('unlikePwd', $i18n('msg.unlikePwd'), (val) =>
      form.value.pwd2.trim().length > 0 ? val === form.value.pwd2 : true,
    )
    .min(8, $i18n('msg.minLength', { num: 8 })),

  pwd2: Ysp.string()
    .required($i18n('msg.required'))
    .test('unlikePwd', $i18n('msg.unlikePwd'), (val) =>
      form.value.pwd1.trim().length > 0 ? val === form.value.pwd1 : true,
    )
    .min(8, $i18n('msg.minLength', { num: 8 })),
});

const list_input = [
  {
    label: $i18n('label.username'),
    name: 'act',
    type: 'text',
  },
  {
    label: $i18n('label.password_new'),
    name: 'pwd1',
    type: 'password',
  },
  {
    label: $i18n('label.password_2'),
    name: 'pwd2',
    type: 'password',
  },
];
</script>

<template>
  <header>
    <h2>{{ $t('webIndex.forgePwd.h1') }}</h2>
    <h5>{{ $t('webIndex.forgePwd.h2') }}</h5>
  </header>
  <!-- 校验表单 -->
  <VeeForm
    :validation-schema="schema"
    class="d-grid my-3 my-md-4 p-3 p-md-4">
    <!-- 输入框 -->
    <VeeInput
      v-for="(item, index) in list_input"
      :key="index"
      v-model="form[item.name]"
      v-bind="item" />
    <!-- 提交按钮 -->
    <button
      class="btn btn-success mt-4 p-2"
      type="submit">
      {{ $t('webIndex.forgePwd.submit') }}
    </button>
  </VeeForm>
  <!-- 路由跳转按钮 -->
  <footer class="row justify-content-around">
    <RouterLink
      class="btn btn-primary col-5 p-2"
      to="/index/signIn">
      {{ $t('button.jumpToSignIn') }}
    </RouterLink>
    <RouterLink
      class="btn btn-info col-5 p-2 text-white"
      to="/index/signUp">
      {{ $t('button.jumpToSignUp') }}
    </RouterLink>
  </footer>
</template>
