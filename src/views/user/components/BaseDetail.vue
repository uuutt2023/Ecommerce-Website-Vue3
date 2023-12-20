<script setup>
import axios from 'axios';
import { nextTick, ref } from 'vue';
import TopBar from '@/components/TopBar.vue';

// 详情页数据
let catDetail = ref({
  // 详情页基本数据
  id: 'xxx',
  title: '标题',
  description: '简介',
  // 猫咪基本数据
  name: '小黑',
  fur_color: '毛色',
  animal: '动物类别',
  breed: '品种',
  // 其他
  user_messages: ['用户留言'],
  url: '图片URL',
  width: '图片宽度',
  height: '图片高度',
});

nextTick(async () => {
  // 请求后端获取数据
  const resp = await axios.get(`/api/detail/cat${location.search}`);
  catDetail.value = resp.data;
  // 数据获取
  console.log(catDetail.value.animal);
});
</script>

<template>
  <!-- 顶部栏 -->
  <TopBar />
  <!-- 页面获取数据 -->
  <div>{{ catDetail.title }}</div>
</template>

<style lang="scss" scoped></style>
