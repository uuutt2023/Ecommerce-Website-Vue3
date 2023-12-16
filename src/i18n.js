import { createI18n } from 'vue-i18n';
import zhCN from '@/lang/zh-CN.json';
import en from '@/lang/en.json';

export const i18n = createI18n({
  legacy: false,
  locale: navigator.language || 'en',
  fallbackLocale: 'en',
  globalInjection: true, // 全局注册$t方法
  messages: {
    'zh-CN': zhCN,
    en,
  },
});

/**
 * 切换语言环境
 * @param {String} locale 国家语言缩写
 * */
export function setI18nLanguage(locale) {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale;
  } else {
    i18n.global.locale.value = locale;
  }
  document.documentElement.setAttribute('lang', locale);
}
