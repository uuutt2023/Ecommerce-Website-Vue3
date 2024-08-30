const { defineConfig } = require('@vue/cli-service');

const ENV = process.env.NODE_ENV;

module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    i18n: {
      locale: 'zh-cn',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true,
    },
  },
  publicPath: ENV === 'development' ? '' : '/Ecommerce-Website-Vue3/',
});
