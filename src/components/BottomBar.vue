<script setup>
import { ref } from 'vue';

const listBtn = ['icon-home-fill', 'icon-more-fill', 'icon-like-fill', 'icon-me'];
const active = ref(0);
</script>

<template>
  <nav>
    <i
      v-for="(item, index) in listBtn"
      :key="index"
      :class="`iconfont ${item} ${active === index ? 'active' : ''}`"
      @click="active = index" />
  </nav>
</template>

<style lang="scss" scoped>
@use '~@/assets/scss/utils';

nav {
  height: 96px;
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
