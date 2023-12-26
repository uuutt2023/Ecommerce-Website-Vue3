<script setup>
import TopBar from '@/components/TopBar.vue';
import axios from 'axios';
import { computed, nextTick, ref } from 'vue';
import { mapKeys, omit, omitBy, toPairs } from 'lodash/object';
import { flow, isEmpty } from 'lodash';

const detail = ref({
  body_type: '',
  weight: '',
  from: '',
  hair_length: '',
  cname: '',
  name: '',
  nickname: '',
  avatar_src: '',
  archives: '',
  pic: [],
  feature: {},
});

nextTick(async () => {
  detail.value = (await axios.get(`/api/cat/info${location.search}`)).data[0];
  console.log(detail);
});

const table = computed(() =>
  flow(
    (detail) => omit(detail, ['avatar_src', 'pic', 'feature', 'archives']),
    (newArr) => omitBy(newArr, isEmpty),
    (obj) =>
      mapKeys(
        obj,
        (val, key) =>
          ({
            body_type: '体型',
            weight: '体重',
            from: '来自',
            hair_length: '毛长',
            cname: '中文名',
            name: '英文名',
            nickname: '别名',
          })[key],
      ),
    toPairs,
  )(detail.value),
);
</script>

<template>
  <TopBar :title="detail.cname" />
  <div class="container-fluid p-3">
    <header class="card m-0 shadow rounded-3 overflow-hidden row">
      <img
        class="card-img-top p-0"
        :src="detail.avatar_src"
        alt="顶部图" />
      <div class="card-body p-2 row-cols-2 row mx-0">
        <dl
          class="my-1 d-flex pe-0"
          :class="index < table.length - 1 || table.length % 2 === 0 ? 'col' : 'col-12'"
          v-for="([key, val], index) in table"
          :key="index">
          <dt
            v-text="key"
            class="p-0 me-1"
            style="width: 3.5em" />
          <dd
            v-text="val"
            class="m-0 d-inline-block text-truncate" />
        </dl>
      </div>
    </header>

    <section>
      <div class="d-flex w-100 overflow-scroll my-4">
        <img
          class="mx-1 rounded-2 border"
          v-for="(url, index) in detail.pic"
          :key="index"
          :src="url"
          :alt="detail.name + index" />
      </div>

      <article class="px-2">
        <h2>简述</h2>
        <p
          class="lh-lg"
          style="text-indent: 2em">
          {{ detail.archives }}
        </p>
      </article>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.img-top + div {
  position: relative;
  bottom: 20px;
}
</style>