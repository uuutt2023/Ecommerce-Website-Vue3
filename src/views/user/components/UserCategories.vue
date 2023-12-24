<script setup>
import TopBarVue from '@/components/TopBar.vue';

// 写死
const list = [
  {id:1,Category:"类别1"},
  {id:2,Category:"类别2"},
  {id:3,Category:"类别3"},
  {id:4,Category:"类别4"},
  {id:5,Category:"类别5"}
];
</script>
<template>
  <TopBarVue />
  <div class="container-fluid">
    <!-- 商品卡片 -->
    <div
        v-for="(item) in list "
        :key="item.id"
    >

      <router-link to="/path/to/route">{{item.Category}}</router-link>


    </div></div>
</template>
