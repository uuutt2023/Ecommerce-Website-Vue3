<script setup>
import VeeInput from '@/views/Index/components/VeeInput.vue';
import { Form } from 'vee-validate';
</script>

<template>
  <header>
    <h2>找回账号</h2>
    <h5>请输入您的邮箱账号找回密码。</h5>
  </header>
  <Form class="d-grid my-4 p-3 p-md-4">
    <VeeInput
      class="mb-3"
      label-str="账号"
      name="username"
      rules="minLength:6|required"
      type="text" />
    <VeeInput
      class="mb-3"
      label-str="新密码"
      name="password1"
      rules="required"
      type="password" />
    <VeeInput
      class="mb-3"
      label-str="新密码确认"
      name="password2"
      rules="required"
      type="password" />
    <button
      class="btn btn-success mt-4 p-2"
      type="submit">
      找回
    </button>
  </Form>
  <footer class="row justify-content-around">
    <RouterLink
      class="btn btn-primary col-5 p-2"
      to="/index/signIn">
      记得密码啦？
    </RouterLink>
    <RouterLink
      class="btn btn-info col-5 p-2 text-white"
      to="/index/signUp">
      重新注册
    </RouterLink>
  </footer>
</template>
