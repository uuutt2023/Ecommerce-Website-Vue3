<script setup>
import { ref } from 'vue';
import router from '@/router';
import store from '@/store/store';

const listBtn = ['icon-home-fill', 'icon-more-fill', 'icon-like-fill', 'icon-me'];
const tabState = ref(store.state.tabState);

const jumpMap = {
  0: '/user/home',
  1: '/user/categories',
  2: '/user/favorites',
  3: '/user/profile',
};

function jumpToPage(index) {
  tabState.value = index;
  router.push(jumpMap[index]);
}

// 在导航守卫中保存和恢复标签栏的状态
router.beforeEach((to, _from, next) => {
  // 保存标签栏的状态到Vuex中
  if (to.meta.saveTabState) {
    store.commit('setTabState', tabState.value);
  }
  // 标签切换时，同步标签栏状态
  const beforeState = +to.meta.tabState;
  if (beforeState >= 0) {
    tabState.value = beforeState;
  }
  next();
});
</script>

<template>
  <KeepAlive>
    <nav>
      <i
        v-for="(item, index) in listBtn"
        :key="index"
        :class="`iconfont ${item} ${tabState === index ? 'active' : ''}`"
        @click="jumpToPage(index)" />
    </nav>
  </KeepAlive>
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
