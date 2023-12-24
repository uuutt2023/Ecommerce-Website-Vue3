<script setup>
import TopBarVue from '@/components/TopBar.vue';
import { get } from '@/http';
import { ref } from 'vue';

import { pick, map } from 'lodash';

const list = ref([]);
// * 请求数据
get('/api/cat/all').then(({ data }) => {
  const pageData = map(data, (obj) => pick(obj, ['avatar_src', 'cname', 'name', 'nickname']));
  console.log(pageData);
  // list.value = map(data, (obj) => pick(obj, ['avatar_src', 'cname', 'name', 'nickname']));
});
</script>

<template>
  <TopBarVue />
  <div class="container-fluid">
    <h1>猫咪品种详解</h1>
    <section class="row justify-content-center">
      <div
        class="col-5 p-0 m-2 border-0"
        v-for="(item, index) in list"
        :key="index">
        <div class="card-img-top">
          <img
            class="w-100 rounded-3"
            :src="item.avatar_src" />
        </div>
        <div class="card-body">
          <div class="card-title">
            <p class="m-0">{{ item.cname }}</p>
            <small v-if="item.name">{{ item.name }}</small>
            <small v-else>{{ item.nickname }}</small>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
