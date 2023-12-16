<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import * as Ysp from 'yup';
import VeeForm from '@/components/VeeForm.vue';
import { veeLabel, veeRules } from '@/assets/js/rules';
import { submitPost } from '@/assets/js/submit';
import router from '@/router';

const { t } = useI18n();

const form = ref({
  act: '',
  pwd1: '',
  pwd2: '',
});
const rules = veeRules(form);
const item = {
  list: [veeLabel.act, veeLabel.pwdN, veeLabel.pwd2],
  schema: Ysp.object({
    act: rules.act,
    pwd1: rules.pwd1,
    pwd2: rules.pwd2,
  }),
  submit: t('submit.forgePwd'),
};

function changePwd(values, actions) {
  submitPost(
    '/api/user/changePwd',
    {
      username: values.act,
      password: values.pwd1,
    },
    (resp) => {
      if (resp.data.result === 'error') {
        actions.setErrors({
          act: '账号不存在',
        });
      } else {
        // 修改成功，跳转到登录页面
        router.push('/index/signIn?show=1');
      }
    },
  );
}
</script>

<template>
  <VeeForm
    v-model="form"
    v-bind="item"
    @submit="changePwd">
    <template v-slot:btn>
      <RouterLink
        class="btn btn-secondary col-5"
        to="/index/signIn">
        {{ $t('jump.toSignIn') }}
      </RouterLink>
    </template>
  </VeeForm>
</template>
