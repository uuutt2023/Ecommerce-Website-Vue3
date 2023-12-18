<script setup>
import { i18n, setI18nLanguage } from '@/i18n';
import { ref } from 'vue'; // 引用组件

const isEnglish = ref(i18n.global.locale?.value === 'en');

function changeLang() {
  // 切换语言
  setI18nLanguage(isEnglish.value ? 'zh-CN' : 'en');
}
</script>

<template>
  <div id="wrap">
    <header>
      <i class="logo-circle" />
      <h1 class="mt-2 mb-0">
        {{ $t('logo.title') }}
        <small>{{ $t('logo.title.small') }}</small>
      </h1>
    </header>
    <RouterView />
    <footer class="row justify-content-between">
      <p class="col-12 text-center">{{ $t('msg.skill') }}</p>
      <i class="border border-1 iconfont icon-vue col-2" />
      <i class="border border-1 iconfont icon-mock col-2" />
      <i
        :class="isEnglish && 'i18n-click'"
        class="border border-1 btn iconfont icon-i18n col-2"
        @click="changeLang" />
    </footer>
  </div>
</template>

<style lang="scss" scoped>
@use '~@/assets/scss/_utils';

.center {
  position: absolute;
  left: 32px;
  right: 32px;
}

#wrap {
  padding: 40px 32px;
  height: 100vh;
  @extend %flex-column;
  justify-content: space-between;
  position: relative;

  header {
    @extend %flex-center;
    flex-direction: column;
  }
}

a {
}

.i18n-click {
  /* 切换语言 */
  background-color: #ea4d8a !important;
  color: white !important;

  &:after {
    color: #ea4d8a;
  }
}

.iconfont {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 93px;
  height: 44px;
  box-sizing: border-box;
  border-radius: 6px;
  position: relative;

  font-size: 24px;

  $list:
    [ 'vue',
    'i18n',
    'mock'];

  &:after {
    display: block;
    position: absolute;
    bottom: -1.75em;
    left: 50%;
    transform: translateX(-50%);
    font-size: 14px;
  }

  @each $item in $list {
    &.icon-#{$item}:after {
      content: $item;
    }
  }
}

.logo-circle {
  /* LOGO图 */
  box-shadow: 0 5px 10px 0 rgba(27, 27, 29, 0.15);
  background: rgb(255, 255, 255);
  border-radius: 50%;
  background: url('~@/assets/images/index/Logo.png') no-repeat center;
  display: block;
  width: 76px;
  aspect-ratio: 1 / 1;

  & + h1 {
    color: rgb(45, 45, 47);
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: 0;
    text-align: center;
    white-space: nowrap;
    @extend %flex-column;

    small {
      color: rgb(45, 45, 47);
      font-size: 18px;
      font-weight: 250;
      line-height: 22px;
      letter-spacing: 0;
      text-align: center;
      margin-top: 4px;
    }
  }
}

input {
  height: 44px;
  border-radius: 6px;
  background: rgb(246, 246, 246);
}
</style>
