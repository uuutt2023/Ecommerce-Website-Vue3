import { i18n } from '@/lang/i18n';
import * as Ysp from 'yup';

const { t } = i18n.global;
/**
 * 可用规则
 * */
export const veeRules = (form) => {
  return {
    act: Ysp.string().required(t('error.required')),

    pwd: Ysp.string()
      // 必填
      .required(t('error.required'))
      // 字符串长度至少 6
      .min(6, t('error.minLength', { num: 6 })),

    /* 确认密码 */
    pwd1: Ysp.string()
      .required(t('error.required'))
      .test('unlikePwd', t('error.unlikePwd'), (val) =>
        form.value.pwd2.trim().length > 0 ? val === form.value.pwd2 : true,
      )
      .min(6, t('error.minLength', { num: 6 })),

    pwd2: Ysp.string()
      .required(t('error.required'))
      .test('unlikePwd', t('error.unlikePwd'), (val) =>
        form.value.pwd1.trim().length > 0 ? val === form.value.pwd1 : true,
      )
      .min(6, t('error.minLength', { num: 6 })),
  };
};

export const veeLabel = {
  act: {
    label: t('label.account'),
    name: 'act',
    type: 'text',
  },
  pwd: {
    label: t('label.password'),
    name: 'pwd',
    type: 'password',
  },
  pwd1: {
    label: t('label.password'),
    name: 'pwd1',
    type: 'password',
  },
  pwd2: {
    label: t('label.password-2'),
    name: 'pwd2',
    type: 'password',
  },
  pwdN: {
    label: t('label.password-n'),
    name: 'pwd1',
    type: 'password',
  },
};
