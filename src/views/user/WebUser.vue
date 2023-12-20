<script setup></script>

<template>
  <main>
    <router-view v-slot="{ Component }">
      <keep-alive include="UserHome">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </main>
</template>

<style lang="scss">
@use '~@/assets/scss/utils';

main {
  height: 100%;
  @extend %flex-column;
}

.iconfont {
  font-size: 22px;
}
</style>
