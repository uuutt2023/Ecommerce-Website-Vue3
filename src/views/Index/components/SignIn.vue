<script setup>
import { nextTick, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import * as Ysp from 'yup';
import VeeForm from '@/components/VeeForm.vue';
import router, { getRoute } from '@/router';
import { veeLabel, veeRules } from '@/assets/js/rules';
import { submitPost } from '@/assets/js/submit';

const { t } = useI18n();
const form = ref({
  act: '',
  pwd: '',
});
const rules = veeRules(form);
// 表单基本数据
const item = {
  list: [veeLabel.act, veeLabel.pwd],
  schema: Ysp.object({
    act: rules.act,
    pwd: rules.pwd,
  }),
  submit: t('submit.signIn'),
};

function onSignIn(values, actions) {
  submitPost('/api/user/signIn', { username: values.act, password: values.pwd }, (resp) => {
    if (resp.data.result === 'error') {
      actions.setErrors({
        act: '用户名或密码错误',
        pwd: '用户名或密码错误',
      });
    } else {
      // 跳转首页
      router.push(`/${resp.data.data.roles}`);
    }
  });
}

// 弹窗提示
const toast = reactive({
  newUser: false, // 新用户
  changePwd: false, // 密码修改
});
const toastMap = {
  0: () => (toast.newUser = true),
  1: () => (toast.changePwd = true),
  2: () => (toast.changePwd = toast.newUser = false),
};
const route = getRoute();
// 当前组件渲染完成时
nextTick(() => {
  toastMap[route?.query?.show ?? 2]();
});
</script>

<template>
  <Transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut">
    <div
      v-show="route?.query?.show"
      class="toast show">
      <div class="toast-header">
        <strong class="me-auto">欢迎新用户~</strong>
        <button
          class="btn-close m-0"
          data-bs-dismiss="toast"
          type="button"
          @click="toastMap[2]()" />
      </div>
      <div class="toast-body">请您重新输入账号和密码。</div>
    </div>
  </Transition>

  <VeeForm
    v-model="form"
    v-bind="item"
    @submit="onSignIn">
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
        to="/index/changePwd">
        {{ $t('jump.toForgePwd') }}
      </RouterLink>
    </template>
  </VeeForm>
</template>
