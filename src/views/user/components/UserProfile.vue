<script setup>
const imgUrl = [
  require('@/assets/images/img/01.png'),
  require('@/assets/images/img/02.png'),
  require('@/assets/images/img/03.png'),
];
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
      <p class="btn btn-outline-secondary border-0 col p-3 m-0">
        <i class="iconfont icon-i18n" />
        <br />
        <small>中转英</small>
      </p>
      <p class="btn btn-outline-secondary border-0 col p-3 m-0">
        <i class="iconfont icon-set-up" />
        <br />
        <small>设置</small>
      </p>
      <p class="btn btn-outline-secondary border-0 col p-3 m-0">
        <i class="iconfont icon-exit" />
        <br />
        <small>退出</small>
      </p>
    </div>
  </div>
</template>

<style>
a {
  text-decoration: none;
  color: #000;
}

.module1 {
  margin-top: 5px;
  position: relative;
  height: 50px;
}

.mui-btn1 {
  position: absolute;
  top: 10%;
  left: 80%;
  background: white;
  border: none;
}

.mui-btn2 {
  position: absolute;
  top: 10%;
  left: 90%;
  background: white;
  border: none;
}

#myInfo {
  margin-top: 5px;
  /* 父元素相对定位 */
  position: relative;
  height: 100px;
  border-radius: 10px;
  /* background-color: antiquewhite; */
}

#myInfo img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.myName {
  /* 子元素绝对定位 */
  position: absolute;
  top: 10%;
  left: 30%;
  font-size: 20px;
}

.myHobby {
  position: absolute;
  top: 40%;
  left: 30%;
  font-size: 15px;
}

#module2 {
  position: relative;
  /* background-color: aquamarine; */
  /* 内边距 */
  margin-top: 50px;
  padding-top: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 80px;
  border-radius: 10px;
  /* background-color: rgb(244, 244, 244); */
}

.commonFunction {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 18px;
  margin: 5px;
}

#module2 a {
  height: 20px;
  font-size: 20px;
  color: #000;
}

.module3 {
  margin: 5px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100px;
  /* background-color: antiquewhite; */
  border-radius: 5px;
}

.module3 a {
  font-size: 20px;
  color: #000;
}

.module4 {
  position: relative;
  width: 100px;
  height: 100px;
}

.module4 .cat1 img {
  position: absolute;
  top: auto;
  left: 20px;
  height: 100px;
}

.module4 .cat2 img {
  position: absolute;
  top: auto;
  left: 220px;
  height: 100px;
}

.module5 {
  position: relative;
  margin: 5px 0;
  justify-content: space-evenly;
  background-color: rgb(244, 244, 244);
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100px;
  border-radius: 5px;
}

.myNew {
  position: absolute;
  width: 80px;
  text-align: center;
  height: 80px;
  left: 4%;
  top: 20%;
}

.myNovel {
  position: absolute;
  width: 80px;
  text-align: center;
  height: 80px;
  left: 27%;
  top: 20%;
}

.integralCenter {
  position: absolute;
  width: 80px;
  text-align: center;
  height: 80px;
  left: 50%;
  top: 20%;
}

.myGame {
  position: absolute;
  width: 80px;
  text-align: center;
  height: 80px;
  left: 73%;
  top: 20%;
}
</style>
