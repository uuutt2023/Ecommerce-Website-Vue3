<script setup>
import { nextTick, ref, watch } from 'vue';
import { i18n } from '@/i18n';

const isRouterAlive = ref(true);
/**
 * 监控语言环境，不刷新实时加载
 * */
watch(i18n.global.locale, () => {
  isRouterAlive.value = false;
  nextTick(() => {
    isRouterAlive.value = true;
  });
});
</script>

<template>
  <div class="container view p-0">
    <RouterView v-if="isRouterAlive" />
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.view {
  height: 100vh;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 0 20px #bcbcbc;
}
</style>
