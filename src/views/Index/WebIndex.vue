<!--
 * @Author: uuutt 584193570@qq.com
 * @Date: 2023-12-09 20:03:45
 * @LastEditors: uuutt 584193570@qq.com
 * @LastEditTime: 2023-12-09 22:35:18
 * @FilePath: \vue3-data-pulse\src\views\Index\WebIndex.vue
 * @Description:
 *  网站登录页面
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
-->

<template>
  <div id="wrap">
    <form>

    </form>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
#wrap {
  height: 100vh;
  background: url("~@/assets/images/index/bg_light.png") no-repeat center;
  background-size: auto 100%;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  & form {
    width: 60vh;
    aspect-ratio: 19 / 26;
    background-color: white;
    box-shadow: 0 10px 40px 0 rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    position: relative;
    right: 7%;
  }
}
</style>
