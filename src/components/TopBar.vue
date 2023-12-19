<script setup></script>

<template>
  <header>
    <div
      id="bar"
      class="row d-flex justify-content-between align-items-center">
      <div class="col">
        <slot name="left" />
      </div>
      <div class="col">
        <slot name="title" />
      </div>
      <div class="col d-inline-flex justify-content-end">
        <slot name="right" />
      </div>
    </div>
    <div class="title row mb-2">
      <slot name="section" />
    </div>
  </header>
</template>

<style lang="scss" scoped>
#bar {
  height: 48px;
  position: sticky;
  top: 0;
}

header {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}

.title {
  height: 56px;
}
</style>
