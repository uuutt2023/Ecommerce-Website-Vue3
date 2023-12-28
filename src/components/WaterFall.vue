<!-- eslint-disable no-unused-vars -->
<script setup>
import { computed, nextTick, onActivated, onMounted, ref, watch } from 'vue';
import { flow, isEmpty, sampleSize, throttle, unionBy } from 'lodash';
import { checkValueInterpolation, jumpToDetail, toggleFavorite } from '@/assets/js/util';
import axios from 'axios';

const { list, url, clickUrl, count, width } = defineProps({
  width: {
    type: String,
    default: () => '',
  },
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
  list: {
    type: Array,
    default: () => [],
  },
});

const listRender = ref([]),
  waterFall = ref(null),
  canLoading = ref(false),
  isTouch = ref(false);

const userSIlluminatedLoveRestoration = async () =>
  (listRender.value = flow(
    checkValueInterpolation,
    (lt) => sampleSize(lt, count),
    (lt) => unionBy([...listRender.value], lt, (item) => item.id),
  )((await axios.get(url)).data));

/**
 * 请求列表数据
 */
const getListImages = throttle(async () => {
  if (!isEmpty(url)) {
    // 用户已点亮的爱心恢复
    await userSIlluminatedLoveRestoration();
    canLoading.value = true;
  }
}, 600);

/**
 * 下拉式添加推荐卡片
 */
function refreshListImages() {
  if (canLoading.value && !isTouch.value) {
    canLoading.value = false;
    listRender.value = [];
    getListImages();
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
const isLoadShow = computed(() => list.length === 0 && canLoading && listRender.value.length > 0);
</script>

<template>
  <div
    id="content"
    :class="{ 'extra-sliding-area': list.length === 0 }"
    class="container-fluid position-relative"
    @touchend="isTouch = false"
    @touchstart.passive="isTouch = true">
    <header
      v-show="isLoadShow"
      class="position-absolute start-0 w-100 text-center">
      <i
        ref="headerLoading"
        class="spinner-border" />
    </header>
    <section
      class="scroll"
      ref="waterFall"
      v-masonry
      horizontal-order="true"
      item-selector=".card">
      <div
        v-for="item in list.length > 0 ? list : listRender"
        v-show="item.url"
        :key="item.id"
        v-masonry-tile
        :style="{ width: width }"
        class="card my-3 mx-2"
        @click="jumpToDetail(clickUrl, item.id)">
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
      v-show="isLoadShow"
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
  position: relative;

  .img-thumbnail {
    width: 100%;
  }
}

.icon-like-fill {
  color: #ff671c !important;
}

.container-fluid {
  header {
    top: 0;
  }

  header,
  footer {
    height: 10vh;
    @extend %flex-center;
  }
}

.extra-sliding-area {
  section {
    min-height: 80vh;
  }

  &:after,
  &:before {
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
