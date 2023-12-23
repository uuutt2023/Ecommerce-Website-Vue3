const { defineConfig } = require('@vue/cli-service');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

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

  chainWebpack: (config) => {
    config.plugin('loadshReplace').use(new LodashModuleReplacementPlugin());
  },
});
