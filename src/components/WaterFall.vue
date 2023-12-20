<script setup>
import { nextTick, ref } from 'vue';
import axios from 'axios';
import _sampleSize from 'lodash/sampleSize';
import _throttle from 'lodash/throttle';
import router from '@/router';
import store from '@/store';

const { url, clickUrl, count } = defineProps({
  url: {
    type: String,
    default: () => '',
  },
  clickUrl: {
    type: String,
    default: () => '',
  },
  count: {
    type: Number,
    default: () => 0,
  },
});

const listRender = ref([]),
  waterFall = ref(null),
  canLoading = ref(false),
  isTouch = ref(false);

function jumpToDetail(id) {
  // 点击跳转详情
  router.push(`${clickUrl}?id=${id}`);
}

const getListImages = _throttle(async () => {
  const info = (await axios.get(url)).data;
  listRender.value.push(..._sampleSize(info, count));
  canLoading.value = true;
}, 600);

async function refreshListImages() {
  if (canLoading.value && !isTouch.value) {
    canLoading.value = false;
    listRender.value = [];
    await getListImages();
  }
}

listRender.value?.length > 0 || getListImages();

/**
 * 加载图标出现在视窗时
 * */
const headerLoading = ref(null),
  footerLoading = ref(null);

const options = {
  root: null, // 使用默认的根元素为视口
  rootMargin: '0px', // 根元素的边界偏移量
  threshold: 0.5, // 元素可见度的阈值，这里设置为50%
};

nextTick(() => {
  new IntersectionObserver(
    () => canLoading.value && !isTouch.value && getListImages(),
    options,
  ).observe(footerLoading.value); // 底部加载图标出现时
  new IntersectionObserver(refreshListImages, options).observe(headerLoading.value); // 顶部加载出现时全部重置
});

/**
 * 点击爱心收藏
 * @param {Object} card 卡片对象
 * */
function toggleFavorite(card) {
  card.isActive = !card.isActive;
  store.dispatch('addUserFavorite', card.id);
}
</script>

<template>
  <div
    class="container-fluid position-relative"
    @touchend="isTouch = false"
    @touchstart.passive="isTouch = true">
    <header class="position-absolute start-0 w-100 text-center">
      <i
        v-show="canLoading && listRender.length > 0"
        ref="headerLoading"
        class="spinner-border" />
    </header>
    <section
      ref="waterFall"
      v-masonry
      horizontal-order="true"
      item-selector=".card">
      <div
        v-for="item in listRender"
        v-show="item.url"
        :key="item.id"
        v-masonry-tile
        class="card m-2 my-3 mx-md-1"
        @click="jumpToDetail(item.id)">
        <div class="card-img-top">
          <img
            :src="item.url"
            alt="catImg"
            class="img-thumbnail rounded-3" />
        </div>
        <div class="card-body py-2">
          <p class="card-title m-0">{{ item.title }}</p>
          <i
            :class="item.isActive ? 'icon-like-fill' : 'icon-like'"
            class="iconfont btn-like me-2"
            @click.stop="toggleFavorite(item)" />
        </div>
      </div>
    </section>
    <!-- 上滑更新 -->
    <footer
      v-show="canLoading && listRender.length > 0"
      class="position-absolute start-0 w-100">
      <i
        ref="footerLoading"
        class="spinner-border" />
    </footer>
  </div>
</template>

<style lang="scss" scoped>
@use '~@/assets/scss/utils';

.card {
  width: 160px;
  position: relative;
}

.card-img-top img {
  width: 160px;
}

.icon-like-fill {
  color: #ff671c !important;
}

.container-fluid {
  header {
    top: 0;
  }

  section {
    scroll-snap-align: start;
    min-height: 90vh;
  }

  header,
  footer {
    height: 10vh;
    @extend %flex-center;
  }

  &:after,
  &:before {
    content: '';
    display: block;
    height: 10vh; /* 调整额外滑动区域的高度 */
  }
}

.btn-like {
  position: absolute;
  right: 0;
  bottom: 0;
  color: #d0d0d0;
  display: inline-block;
}
</style>
