<script setup>
import { prefixLocal } from '@/assets/js/local';
import store from '@/store';
import { useCookie } from 'vue-cookie-next';
import BottomBar from '@/components/BottomBar.vue';

const cookie = useCookie();
cookie.setCookie(`${prefixLocal.toLocaleLowerCase()}-user`, store.state.user);
</script>

<template>
  <main>
    <router-view v-slot="{ Component }">
      <keep-alive include="UserHome">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <BottomBar
      class="bottomNav"
      v-if="!$route.meta.noBottomBar" />
  </main>
</template>

<style lang="scss">
@use '~@/assets/scss/utils';

main {
  height: 100%;
  @extend %flex-column;
  justify-content: space-between;
}

.iconfont {
  font-size: 22px;
}

.container-fluid {
  flex-grow: 1;
  @extend %none-scrollBar;
  scroll-snap-type: y mandatory;
}

.bottomNav {
  height: 64px !important;
}
</style>
