<script setup>
import TopBarVue from '@/components/TopBar.vue';
import { nextTick, reactive, ref, watch } from 'vue';

import { get } from '@/http';
import { hashString, jumpToDetail } from '@/assets/js/util';
import BaseCategorized from '@/components/BaseCategorized.vue';

import { filter, flow, isEqual, reduce, set, some, sortBy, toLower } from 'lodash';

const listRender = ref([]);
let temp;

nextTick(async () => {
  temp = [...(await get(`/api/cat/card`))];
  if (listRender.value?.length === 0) listRender.value = temp;
});

// 分类标记配置
const listCategorized = [
  {
    label: '体型',
    name: 'shape',
    text: ['大型', '中型', '小型'],
    fn: (val) => (keyword.body_type = val),
  },
  {
    label: '毛长',
    name: 'hair',
    text: ['长毛', '短毛'],
    fn: (val) => (keyword.hair_length = val),
  },
];

/**
 * 判断数据中是否包含 “不限” 字段
 * 包含返回原数据，
 * 不包含自动匹配字段并筛选数据
 * @param {Array} arr 过滤数据来源
 * @param {String} tag 过滤标签
 * @param {String} key 暂存器解构 Key
 * @param {String} value 暂存器解构 Value
 * @return {Array} 过滤 or 原数据
 * */
const filterArr = (arr, [key, value], tag = '不限') =>
  isEqual(value, tag) ? arr : filter(arr, (item) => isEqual(item[key], value));

// 分类标签点击返回值
const keyword = reactive({
  body_type: '不限',
  hair_length: '不限',
});

const update = flow(
  Object.entries,
  (listTmp) => sortBy(listTmp, ([, value]) => (isEqual(value, '不限') ? 0 : 1)),
  (listTmp) =>
    reduce(
      listTmp,
      (search, list) =>
        filterArr(
          search.length > 0 ? search
          : searchTerm.value != null ? searchTemp
          : temp,
          list,
        ),
      [],
    ),
  (listTmp) => set(listRender, 'value', listTmp),
);

watch(keyword, update);

const searchTerm = ref(null);
let searchTemp;

/**
 * 搜索事件
 * */
function onSearch() {
  listRender.value = searchTemp = flow([
    toLower,
    (term) =>
      filter(temp, (cat) => some(Object.values(cat), (value) => toLower(value).includes(term))),
  ])(searchTerm.value ?? '');
  update(keyword);
}
</script>

<template>
  <TopBarVue>
    <template #section>
      <form
        class="input-group mt-1"
        @submit.prevent="onSearch">
        <input
          v-model="searchTerm"
          aria-describedby="button-addon1"
          class="form-control"
          name="searchValue"
          placeholder="猫咪名搜索"
          type="text" />

        <span class="btn-group">
          <button
            id="search"
            class="btn btn-outline-primary rounded-start-0 border-end-0"
            type="submit">
            搜索
          </button>

          <input
            id="screen"
            aria-controls="collapseExample"
            aria-expanded="false"
            autocomplete="off"
            class="btn-check"
            data-bs-target="#collapseExample"
            data-bs-toggle="collapse"
            type="checkbox" />
          <label
            class="btn btn-outline-primary"
            for="screen">
            筛选
          </label>
        </span>
      </form>
      <div
        id="collapseExample"
        class="collapse">
        <BaseCategorized
          v-for="(item, index) in listCategorized"
          :key="index"
          class="my-2"
          v-bind="item" />
      </div>
    </template>
  </TopBarVue>

  <div class="container-fluid px-3">
    <section class="row row-cols-2">
      <div
        v-for="(item, index) in listRender"
        v-show="!item?.canload"
        :key="index"
        class="col my-2"
        @click="jumpToDetail('/user/categories/detail', hashString(item.name))">
        <div class="card-img-top">
          <img
            :src="item.avatar_src"
            alt="猫猫图"
            class="w-100 rounded-3 border border-4"
            @error="item.canload = true" />
        </div>
        <div class="card-body">
          <div class="card-title">
            <p class="m-0">
              {{ item.cname }}
            </p>
            <p
              v-if="searchTerm != null"
              class="small m-0">
              {{ item.nickname }}
            </p>
            <small v-if="item.name">{{ item.name }}</small>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
