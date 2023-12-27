<script setup>
import TopBar from '@/components/TopBar.vue';
import WaterFall from '@/components/WaterFall.vue';
import store from '@/store/store';
import { ref } from 'vue';
import axios from 'axios';

const searchTerm = ref();
const listRendering = ref([]);
// eslint-disable-next-line no-unused-vars
const onSearch = async () => {
  listRendering.value = (await axios.get(`/api/card/search?term=${searchTerm.value}`)).data;
};
</script>

<template>
  <TopBar :can-back="false">
    <template #right>
      <input
        id="screen"
        aria-controls="collapseExample"
        aria-expanded="false"
        autocomplete="off"
        class="btn-check"
        data-bs-target="#collapseExample"
        data-bs-toggle="collapse"
        type="checkbox" />
      <label for="screen">
        <i class="iconfont icon-search ms-3" />
      </label>
    </template>
    <template #section>
      <div class="row col-12 mb-1">
        <h1 class="m-0 col">
          伍零叁柒
          <small>2.476 猫猫图o(=•ェ•=)m</small>
        </h1>
        <img
          alt="logo"
          class="avatar rounded-circle"
          :src="store.getters.currentUserAvatar" />
      </div>
      <div
        id="collapseExample"
        class="collapse w-100 m-0">
        <form
          class="input-group my-2"
          @submit.prevent="onSearch">
          <input
            v-model="searchTerm"
            aria-describedby="button-addon1"
            class="form-control"
            name="searchValue"
            placeholder="猫咪名搜索"
            type="text" />
          <button
            id="search"
            class="btn btn-outline-primary rounded-start-0"
            type="submit">
            搜索
          </button>
        </form>
      </div>
    </template>
  </TopBar>

  <WaterFall
    :list="listRendering"
    :click-url="'/user/home/detail'"
    :count="6"
    :url="'/api/card/list'"
    :width="'165px'" />
</template>

<style lang="scss" scoped>
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
