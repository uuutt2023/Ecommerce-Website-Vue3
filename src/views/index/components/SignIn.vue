<script setup>
import { nextTick, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import * as Ysp from 'yup';
import { getRoute } from '@/router';
import { veeLabel, veeRules } from '@/assets/js/rules';
import { Form } from 'vee-validate';
import VeeField from '@/components/VeeField.vue';
import { onSignIn } from '@/assets/js/submit';

import { eq, isEmpty } from 'lodash';

const { t } = useI18n();
const form = ref({
  act: '',
  pwd: '',
});
const rules = veeRules(form);
// 表单基本数据
const item = {
  list: [veeLabel.act, veeLabel.pwd],
  submit: t('submit.signIn'),
};

const schema = Ysp.object({
  act: rules.act,
  pwd: rules.pwd,
});

// 弹窗提示
const toast = ref({
    title: '',
    msg: '',
  }),
  // 提示映射
  toastMap = {
    close: () => {
      isShowToast.value = false;
    },
    0: () =>
      (toast.value = {
        title: '欢迎新用户',
        msg: '请您重新输入账号与密码',
      }),
    1: () =>
      (toast.value = {
        title: '修改提醒',
        msg: '密码已修改成功',
      }),
    2: () =>
      (toast.value = {
        title: '权限不足',
        msg: '请您先登录在访问该网站哦~',
      }),
  },
  // 路由url参数
  route = getRoute(),
  isShowToast = ref(!isEmpty(route?.query?.show));
// 当前组件渲染完成时
nextTick(() => {
  const showId = route?.query?.show ?? null;
  showId && toastMap[showId]();
});
</script>

<template>
  <!-- 弹窗提示 -->
  <transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut">
    <div
      v-show="isShowToast"
      :class="{ 'bg-danger text-white': eq(+route.query.show, 2) }"
      aria-atomic="true"
      aria-live="assertive"
      class="toast show w-100">
      <div class="toast-header">
        <strong class="me-auto">{{ toast.title }}~</strong>
        <button
          class="btn-close m-0"
          type="button"
          @click="toastMap['close']()" />
      </div>
      <div class="toast-body">
        <small>{{ toast.msg }}</small>
      </div>
    </div>
  </transition>

  <Form
    :validation-schema="schema"
    class="row form"
    @submit="onSignIn">
    <VeeField
      v-model="form"
      v-bind="item">
      <template v-slot:btn>
        <RouterLink
          class="text-white text-decoration-none"
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
    </VeeField>
  </Form>
</template>

<style lang="scss" scoped>
.toast {
  position: absolute;
  top: -50%;
}
</style>