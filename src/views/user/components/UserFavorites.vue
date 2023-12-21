<script setup>
import TopBarVue from '@/components/TopBar.vue';

import { post } from '@/http';
import store from '@/store';
import { find, isEqual } from 'lodash';
import { ref } from 'vue';
import { jumpToDetail } from '@/assets/js/util';
// 获取当前用户名
const { username } = store.state.user;

const listFavoritesId = find(store.state.userFavorites, (_val, key) => isEqual(key, username));
const listRender = ref([]);
post('/api/card/favorites', {
  list: listFavoritesId,
}).then(({ data }) => {
  listRender.value = data;
});
</script>

<template>
  <TopBarVue />
  <section class="container-fluid position-relative">
    <div
      v-for="item in listRender"
      v-show="item.url"
      :key="item.id"
      v-masonry-tile
      class="card my-3"
      @click="jumpToDetail('/user/detail', item.id)">
      <div class="card-img-top">
        <img
          :src="item.url"
          alt="catImg"
          class="img-thumbnail rounded-3 w-100" />
      </div>
      <div class="card-body py-2">
        <p class="card-title m-0">{{ item.title }}</p>
        <i
          @click.stop="item.isActive = !item.isActive"
          :class="item.isActive ? 'icon-like' : 'icon-like-fill'"
          class="iconfont btn-like me-2" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.icon-like-fill {
  color: #ff671c !important;
}

.card-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
