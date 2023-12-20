<script setup>
import { ref } from 'vue';
import router from '@/router';

const listBtn = ['icon-home-fill', 'icon-more-fill', 'icon-like-fill', 'icon-me'];
const active = ref(0);

const jumpMap = {
  0: '/user/home',
  1: '/user/categories',
  2: '/user/favorites',
  3: '/user/profile',
};

function jumpToPage(index) {
  active.value = index;
  router.push(jumpMap[index]);
}
</script>

<template>
  <nav>
    <i
      v-for="(item, index) in listBtn"
      :key="index"
      :class="`iconfont ${item} ${active === index ? 'active' : ''}`"
      @click="jumpToPage(index)" />
  </nav>
</template>

<style lang="scss" scoped>
@use '~@/assets/scss/utils';

nav {
  flex-shrink: 0;
  display: flex;
  align-items: stretch;
  justify-content: space-around;
  border-top: 1px solid #d0d0d0;
}

.iconfont {
  color: #d0d0d0;
  width: 48px;
  aspect-ratio: 1 / 1;
  @extend %flex-center;
  font-size: 32px;

  &.active {
    color: #2967ff;
  }
}
</style>
