<script setup>
import { Form as VeeForm } from 'vee-validate';
import VeeInput from '@/views/Index/components/VeeInput.vue';
</script>

<template>
  <header>
    <h2>登录</h2>
    <h5>请输入您的账号与密码</h5>
  </header>
  <!-- 验证表单 -->
  <VeeForm class="d-grid my-4 p-3 p-md-4">
    <VeeInput
      class="mb-3"
      label-str="账号"
      name="username"
      rules="required"
      type="text" />
    <VeeInput
      label-str="密码"
      name="password"
      rules="required"
      type="password" />
    <button
      class="btn btn-success mt-4 p-2"
      type="submit">
      登录
    </button>
  </VeeForm>
  <!-- 跳转按钮 -->
  <footer class="row justify-content-around">
    <RouterLink
      class="btn btn-primary col-5 p-2"
      to="/index/signUp">
      新用户?
    </RouterLink>
    <RouterLink
      class="btn btn-info col-5 p-2 text-white"
      to="/index/forge">
      忘了？
    </RouterLink>
  </footer>
</template>
