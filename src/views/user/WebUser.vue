<script setup></script>

<template>
  <main>
    <RouterView />
  </main>
</template>

<style lang="scss">
@use '~@/assets/scss/utils';

main {
  height: 100%;
  @extend %flex-column;

  & > * {
    padding: 0 20px;
  }
}

.iconfont {
  font-size: 22px;
  width: 24px;
}
</style>
