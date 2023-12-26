<script setup>
import TopBarVue from '@/components/TopBar.vue';
import { jumpToDetail, toggleFavorite } from '@/assets/js/util';
import { post } from '@/http';
import store from '@/store/store';
import { ref } from 'vue';

// * 渲染列表请求
const listRender = ref([]);
post('/api/card/favorites', {
  list: store.getters.currentUserFavorites,
}).then(({ data }) => (listRender.value = data));
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
      @click="jumpToDetail('/user/home/detail', item.id)">
      <div class="card-img-top">
        <img
          :src="item.url"
          alt="catImg"
          class="img-thumbnail rounded-3 w-100" />
      </div>
      <div class="card-body py-2">
        <p class="card-title m-0">{{ item.title }}</p>
        <i
          :class="!item.isActive ? 'icon-like-fill' : 'icon-like'"
          class="iconfont btn-like me-2"
          @click.stop="toggleFavorite(item)" />
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