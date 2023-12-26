<script setup>
import TopBar from '@/components/TopBar.vue';
import axios from 'axios';
import { computed, nextTick, ref, watch } from 'vue';
import { mapKeys, omit, omitBy, toPairs } from 'lodash/object';
import { flow, isEmpty, map, pick, sortBy } from 'lodash';
import * as echarts from 'echarts';

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
  GetEchar();
});

const table = computed(() =>
  flow([
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
  ])(detail.value),
);

// eslint-disable-next-line no-unused-vars
const GetEchar = () => {
  const myCharts = ref();
  // 数据排序
  const temp = flow([
    toPairs,
    (item) =>
      map(item, ([key, val]) => ({
        name: key,
        value: val,
        max: 100,
      })),
    (list) => {
      return isSort.value ? sortBy(list, ['value']) : list;
    },
  ])(detail.value.feature);
  // 基本数据
  const cat = map(temp, 'value');
  // 最大值
  const maxIndex = map(temp, (item) => pick(item, ['name', 'max']));

  nextTick(() => {
    myCharts.value = echarts.init(document.getElementById('catChart'));
    let option = {
      // 某图表
      title: {
        text: '猫咪评分',
      },
      radar: {
        indicator: maxIndex, // 配置各个维度的最大值
        shape: 'circle', // 配置雷达图最外层的图形 circle polygon
      },
      series: [
        {
          type: 'radar', // radar 此图表是一个雷达图
          areaStyle: {}, // 展示每一个雷达图的阴影面积
          label: {
            show: true, // 显示数字
          },
          data: [
            {
              name: detail.value.cname,
              value: cat,
            },
          ], // 雷达图的数据 可以多个
        },
      ],
    };
    myCharts.value.setOption(option);
    // 让图表跟随屏幕自动的去适应
    window.addEventListener('resize', function () {
      myCharts.value.resize();
    });
  });
};

const isSort = ref(false);

watch(isSort, GetEchar);
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
      <div class="d-flex w-100 overflow-scroll mt-4">
        <img
          class="mx-1 rounded-2 border"
          v-for="(url, index) in detail.pic"
          :key="index"
          :src="url"
          :alt="detail.name + index" />
      </div>

      <!-- 排序开关 -->
      <div
        @click="isSort = !isSort"
        id="btn-sort"
        class="form-check form-check-reverse form-switch position-relative">
        <input
          class="form-check-input"
          type="checkbox"
          id="flexSwitchCheckDefault" />
        <label
          class="form-check-label"
          for="flexSwitchCheckDefault">
          分数排序
        </label>
      </div>

      <div
        id="catChart"
        class="w-100"
        style="height: 400px" />

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

#btn-sort {
  top: 30px;
  z-index: 999;
}
</style>