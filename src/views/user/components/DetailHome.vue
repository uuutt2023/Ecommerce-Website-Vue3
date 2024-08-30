<script setup>
import { nextTick, ref } from 'vue';
import { checkValueInterpolation, toggleFavorite } from '@/assets/js/util';
import TopBar from '@/components/TopBar.vue';
import { isNull, isObject } from 'lodash';
import store from '@/store/store';
import axios from 'axios';
import { getUrlQueryParams } from '@/assets/js/util';

// 详情页数据
let detail = ref({
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

// 轮播图数据
const imgUrl = ref([]);
nextTick(async () => {
  // 请求后端获取数据
  const id = getUrlQueryParams().id;
  detail.value = (await axios.get(`/api/detail/cat${id}`)).data;
  imgUrl.value = [detail.value.url, ...(await axios.get('/api/random/img/cat?count=4')).data];
});

// 发布评论
const comment = ref(null);
// 最底部元素
const back = ref(null);

async function sendComment() {
  if (isNull(comment.value)) {
    return false;
  }
  detail.value = (
    await axios.post(`/api/add/comment`, {
      id: detail.value.id,
      name: store.state.user.name,
      comment: comment.value,
      avatar: store.getters.currentUserAvatar,
    })
  ).data;
  comment.value = null;
  await nextTick(() => back.value.scrollIntoView({ behavior: 'smooth' }));
}
</script>

<template>
  <!-- 顶部栏 -->
  <TopBar />
  <div class="container-fluid p-0">
    <div class="scroll py-3">
      <header class="px-3 pb-0 border-bottom mb-4">
        <!-- 顶部轮播图 -->
        <div
          v-if="imgUrl && imgUrl.length > 0"
          id="cat-img"
          class="carousel slide border border-2 overflow-hidden rounded-3"
          data-bs-interval="3000"
          data-bs-slide="true"
          data-bs-ride="carousel">
          <!-- 指示符 -->
          <div class="carousel-indicators">
            <button
              v-for="index in imgUrl.length"
              :key="index"
              :class="{ active: --index === 0 }"
              :data-bs-slide-to="index"
              data-bs-target="#cat-img"
              type="button" />
          </div>

          <!-- 轮播图片 -->
          <div class="carousel-inner w-100">
            <div
              v-for="(img, index) in imgUrl"
              :key="index"
              :class="{ active: index === 0 }"
              class="carousel-item">
              <img
                :src="img"
                alt="轮播图{{index}}"
                class="d-block w-100" />
            </div>
          </div>

          <!-- 左右切换按钮 -->
          <button
            class="carousel-control-prev"
            data-bs-slide="prev"
            data-bs-target="#cat-img"
            type="button">
            <span class="carousel-control-prev-icon"></span>
          </button>
          <button
            class="carousel-control-next"
            data-bs-slide="next"
            data-bs-target="#cat-img"
            type="button">
            <span class="carousel-control-next-icon"></span>
          </button>
        </div>

        <!-- 作者分享文案 -->
        <div class="mt-4">
          <h4 class="fw-bold">{{ detail.title }}</h4>
          <p class="lh-lg">
            {{ detail.description }}
            <small class="d-block text-end">12-07 上海</small>
          </p>
        </div>
      </header>

      <section>
        <h5 class="d-block ps-3">共{{ detail.user_messages.length }}条评论</h5>
        <article
          v-for="(item, index) in detail.user_messages"
          :key="index"
          class="my-4 px-3 pb-4 d-flex align-items-start border-1 border-bottom">
          <img
            :src="isObject(item) ? item?.avatar : `https://picsum.photos/48?${index}`"
            alt="tx"
            class="col-2 rounded-circle flex-shrink-0" />

          <div class="flex-grow-1 ms-3">
            <p>
              {{ isObject(item) ? item?.name : '测试用户' }}
              <small class="d-block text-secondary">n个小时前 - IP属地：天津</small>
            </p>
            <p class="lh-sm mb-4">{{ isObject(item) ? item.comment : item }}</p>
          </div>
        </article>
      </section>

      <span ref="back"></span>

      <footer
        class="fixed-bottom bg-light border-top border-secondary row align-items-center py-2 px-2 shadow-lg">
        <form
          @submit.prevent="sendComment"
          class="input-group align-items-center">
          <input
            v-model="comment"
            aria-describedby="btn-sendComment"
            class="form-control col py-2 rounded-start-5 border-0"
            placeholder="不发没关系，请继续友善哦~"
            type="text" />
          <button
            type="submit"
            class="btn btn-outline-primary rounded-end-5 px-3"
            id="btn-sendComment">
            发送
          </button>
          <i
            @click="toggleFavorite(detail)"
            :class="checkValueInterpolation(detail) ? 'icon-like-fill' : 'icon-like'"
            class="iconfont col-1 p-0 ps-2 text-center" />
        </form>
      </footer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.carousel-inner {
  $h: 400px;
  height: $h;

  img {
    object-fit: cover;
    object-position: center;
    height: $h;
  }
}

footer {
  //height: 56px;
}

header,
article,
footer {
  border-color: #cccccc !important;
}

.icon-like-fill {
  color: #ff671c !important;
}
</style>
