<script setup>
import VeeInput from '@/views/Index/components/VeeInput.vue';
import { Form } from 'vee-validate';
</script>

<template>
  <header>
    <h2>注册</h2>
    <h5>没有账号？那就注册一个吧。</h5>
  </header>
  <Form class="d-grid my-4 p-3 p-md-4">
    <VeeInput
      :label-str="$t('username')"
      class="mb-3"
      name="username"
      rules="minLength:6|required"
      type="text" />
    <VeeInput
      :label-str="$t('password_1')"
      class="mb-3"
      name="password1"
      rules="required"
      type="password" />
    <VeeInput
      :label-str="$t('password_2')"
      class="mb-3"
      name="password2"
      rules="required"
      type="password" />
    <button
      class="btn btn-success mt-4 p-2"
      type="submit">
      立即注册
    </button>
  </Form>
  <footer class="row justify-content-around">
    <RouterLink
      class="btn btn-primary col-5 p-2"
      to="/index/signIn">
      有账号啦？
    </RouterLink>
    <RouterLink
      class="btn btn-info col-5 p-2 text-white"
      to="/index/forge">
      忘了？
    </RouterLink>
  </footer>
</template>

<style lang="scss" scoped></style>
