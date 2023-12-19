<script setup>
import TopBar from '@/components/TopBar.vue';
import WaterFall from '@/components/WaterFall.vue';
import BottomBar from '@/components/BottomBar.vue';
</script>

<template>
  <TopBar>
    <template #left>
      <i class="iconfont icon-back" />
    </template>
    <template #title></template>
    <template #right>
      <i class="iconfont icon-set-up me-3" />
      <i class="iconfont icon-search" />
    </template>
    <template #section>
      <h1 class="m-0 col">
        伍零叁柒
        <small>2.476 猫猫图o(=•ェ•=)m</small>
      </h1>
      <img
        alt="logo"
        class="avatar"
        src="~@/assets/images/user/Oval.png" />
    </template>
  </TopBar>

  <WaterFall
    :click-url="'/api/detail/cat'"
    :count="6"
    :url="'/api/card/list'" />

  <BottomBar />
</template>

<style lang="scss" scoped>
@use '~@/assets/scss/utils';

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

.iconfont {
  font-size: 24px;
}
</style>
