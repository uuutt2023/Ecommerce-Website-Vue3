<script setup>
import TopBarVue from '@/components/TopBar.vue';
import { jumpToDetail, toggleFavorite } from '@/assets/js/util';
import store from '@/store/store';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { assign, isEmpty, map } from 'lodash';

// * 渲染列表请求
const listRender = ref([]);

async function init() {
  const data = (
    await axios.post('/api/card/favorites', { list: store.getters.currentUserFavorites })
  ).data;
  listRender.value = map(data, (item) => assign(item, { isActive: true }));
}

onMounted(init);
</script>

<template>
  <TopBarVue :can-back="false" />

  <section class="container-fluid position-relative">
    <div class="scroll py-2 flex-grow-1">
      <div
        v-if="isEmpty(listRender)"
        class="h-100 d-flex justify-content-center align-items-center">
        <h3 class="text-secondary fw-light">什么也没有找到 ∑( 口 ||</h3>
      </div>
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
            :class="!item.isActive ? 'icon-like' : 'icon-like-fill'"
            class="iconfont btn-like me-2"
            @click.stop="toggleFavorite(item)" />
        </div>
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
