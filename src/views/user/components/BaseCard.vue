<script setup>
import { ref, toRefs } from 'vue';
import { get } from '@/http';

const { list } = defineProps({
  list: {
    type: Object,
    default: () => ({
      animal: '',
      bread: '',
      description: '',
      fur_color: '',
      height: 0,
      id: '',
      name: '',
      title: '',
      user_messages: [],
      width: 0,
      url: '',
    }),
  },
});

/**
 * 跳转进详情页
 * */
const jumpToDetail = () => {
  get('/api/card/detail', {
    id: list.id,
  }).then((resp) => {
    console.log(resp);
  });
};

/**
 * 部分数据有多条url地址
 * 查询其中 url ~ url9 的数据，将其封装成数组
 * */
let listImgUrl = ref([]);
for (let toRefsKey in toRefs(list)) {
  if (/^url[0-9]?/.test(toRefsKey)) {
    list[toRefsKey] && listImgUrl.value.push(list[toRefsKey]);
  }
}

/**
 * 尝试访问图片 url
 * */
const showUrl = ref(null);
listImgUrl.value.forEach((url) => {
  let image = new Image();
  image.src = url;
  image.onload = () => (showUrl.value = url);
  image.onerror = () => (image = null);
});
</script>

<template>
  <div
    v-if="showUrl"
    class="card"
    @click="jumpToDetail">
    <img
      :src="showUrl"
      alt="封面"
      class="card-img-top img-thumbnail" />
    <div class="card-body">
      <h5 class="card-title">{{ list.title }}</h5>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrap {
  width: 160px;
  column-width: 160px;
  display: flex;
  flex: -1;

  & > div {
    column-width: 160px;
  }
}

.card {
  flex: -1;
}

.card-body {
  flex: 0;
}
</style>
