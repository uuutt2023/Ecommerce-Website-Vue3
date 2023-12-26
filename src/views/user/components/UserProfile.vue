<script setup>
import { useCookie } from 'vue-cookie-next';
import { prefixLocal } from '@/assets/js/local';
import { switchLang } from '@/lang/i18n';
import router from '@/router';

const imgUrl = [
  require('@/assets/images/user/01.png'),
  require('@/assets/images/user/02.png'),
  require('@/assets/images/user/03.png'),
];

const cookie = useCookie();

const fn = {
  /**
   * 移除Cookies，退出APP。
   * */
  exitApp: () => {
    // 移除 cookies
    cookie.removeCookie(`${prefixLocal.toLocaleLowerCase()}-user`);
    router.push('/index');
  },
  switchLang: switchLang,
};
</script>

<template>
  <div class="container-fluid p-0">
    <!-- 我的信息 -->
    <div class="row mt-4 align-items-center">
      <!-- 头像框图片 -->
      <img
        alt="头像图片"
        class="col-3 rounded-circle ms-3"
        src="https://picsum.photos/200" />
      <div class="col-auto">
        <p class="h3 d-inline-block">林北</p>
        <p class="small mb-0 text-secondary">猫猫~我的最爱</p>
      </div>
    </div>

    <span
      class="row py-1 mt-4"
      style="background: rgb(246, 246, 246)"></span>

    <div class="row row-cols-4 text-center">
      <!-- module2指收藏，浏览记录等 -->
      <p class="btn btn-outline-secondary border-0 col p-3 m-0">
        <i class="iconfont icon-book" />
        <br />
        <small>书签</small>
      </p>
      <p class="btn btn-outline-secondary border-0 col p-3 m-0">
        <i class="iconfont icon-history" />
        <br />
        <small>历史</small>
      </p>
      <p class="btn btn-outline-secondary border-0 col p-3 m-0">
        <i class="iconfont icon-download" />
        <br />
        <small>下载</small>
      </p>
      <p class="btn btn-outline-secondary border-0 col p-3 m-0">
        <i class="iconfont icon-focus" />
        <br />
        <small>关注</small>
      </p>
    </div>

    <span
      class="row py-1"
      style="background: rgb(246, 246, 246)"></span>

    <!-- 轮播猫猫图 -->

    <div
      id="cat-img"
      class="carousel slide py-2"
      data-ride="carousel"
      data-bs-ride="carousel">
      <!-- 指示符 -->
      <div class="carousel-indicators">
        <button
          class="active"
          data-bs-slide-to="0"
          data-bs-target="#cat-img"
          type="button" />
        <button
          data-bs-slide-to="1"
          data-bs-target="#cat-img"
          type="button" />
        <button
          data-bs-slide-to="2"
          data-bs-target="#cat-img"
          type="button" />
      </div>

      <!-- 轮播图片 -->
      <div class="carousel-inner">
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

    <span
      class="row py-1"
      style="background: rgb(246, 246, 246)"></span>

    <div class="row row-cols-4 text-center mt-auto">
      <!-- module3指的是常用功能 -->
      <p class="btn btn-outline-secondary border-0 col p-3 m-0">
        <i class="iconfont icon-night-day" />
        <br />
        <small>白天</small>
      </p>
      <p
        class="btn btn-outline-secondary border-0 col p-3 m-0"
        @click="switchLang">
        <i class="iconfont icon-i18n" />
        <br />
        <small>中转英</small>
      </p>
      <p class="btn btn-outline-secondary border-0 col p-3 m-0">
        <i class="iconfont icon-set-up" />
        <br />
        <small>设置</small>
      </p>
      <p
        class="btn btn-outline-secondary border-0 col p-3 m-0"
        @click="fn.exitApp">
        <i class="iconfont icon-exit" />
        <br />
        <small>退出</small>
      </p>
    </div>
  </div>
</template>

<style scoped></style>
