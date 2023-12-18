<script setup>
import TopBar from '@/components/TopBar.vue';
import BaseCard from '@/views/user/components/BaseCard.vue';
import { nextTick, ref, watch } from 'vue';
import axios from 'axios';
import { throttle } from '@/assets/js/util';

// 渲染数量
let readerNum = ref(0);

// 渲染卡片列表
let listReader = ref([]);

// 监听渲染数量
watch(
  readerNum,
  async () => {
    const resp = await axios.get(`/api/card/info?num=${readerNum.value}`);
    await nextTick(() => listReader.value.push(...resp.data));
  },
  { immediate: true },
);

const addMoreImages = () => {
  throttle(() => {
    console.log('滚动');
    readerNum.value += 8;
  }, 2000)();
};
</script>

<template>
  <TopBar>
    <template #left>
      <i class="iconfont icon-back me-auto" />
    </template>
    <template #title></template>
    <template #right>
      <i class="iconfont icon-set-up" />
      <i class="iconfont icon-search" />
    </template>
    <template #section>
      <h1 class="m-0 col">
        伍零叁柒
        <small>2.476 猫猫图o(=•ェ•=)m</small>
      </h1>
      <img
        alt="logo"
        class="avatar"
        src="~@/assets/images/user/Oval.png" />
    </template>
    <template #nav></template>
  </TopBar>
  <section class="p-0">
    <div
      v-if="listReader"
      v-infinite-scroll="addMoreImages"
      class="row justify-content-evenly">
      <BaseCard
        v-for="(item, index) in listReader"
        :key="index"
        :list="item"
        class="col-5" />
    </div>
    <!-- 上滑更新 -->
    <footer class="mx-auto my-3">
      <i class="spinner-border" />
    </footer>
  </section>
</template>

<style lang="scss" scoped>
@use '~@/assets/scss/utils';

section {
  overflow-y: scroll;
  flex-grow: 1;
  border-top: 2px solid #e6e6e7;

  footer {
    @extend %flex-center;
  }

  &::after {
    content: '';
    display: block;
    flex: 1 1 auto;
    width: 30%;
  }
}

.avatar {
  width: 44px;
  height: 44px;
  padding: 0;
}

h1 {
  display: inline-flex;
  flex-direction: column;
  color: rgb(45, 45, 47);
  font-size: 24px;
  font-weight: 700;
  text-align: left;

  small {
    color: rgb(141, 141, 142);
    font-size: 14px;
    font-weight: 250;
    line-height: 18px;
    text-align: left;
  }
}
</style>
