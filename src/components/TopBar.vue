<script setup>
import router from '@/router';

defineProps({
  canBack: {
    type: Boolean,
    default: () => true,
  },
  title: {
    type: String,
    default: () => '',
  },
});

const jumpBack = () => router.back();
</script>

<template>
  <div>
    <header class="row d-flex flex-column px-4">
      <div
        id="bar"
        class="col-12">
        <div class="col-1 p-0">
          <i
            v-if="canBack"
            class="iconfont icon-back"
            @click="jumpBack" />
        </div>
        <div
          id="topBar-title"
          class="col-auto p-0">
          <h5 class="m-0 text-center">{{ title.length > 0 ? title : $route.meta?.title }}</h5>
        </div>
        <div class="col-auto p-0 d-inline-flex justify-content-end">
          <i class="iconfont icon-set-up" />
          <slot name="right" />
        </div>
      </div>
      <div
        id="topBar-section"
        class="col-12 p-0">
        <slot name="section" />
      </div>
    </header>
    <hr class="mb-0 mt-1" />
  </div>
</template>

<style lang="scss" scoped>
#bar {
  height: 56px;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}

#topBar-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

#topBar-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.iconfont {
  font-size: 26px;
}
</style>