<script setup></script>

<template>
  <header>
    <div
      id="bar"
      class="row">
      <slot name="left" />
      <slot name="title" />
      <slot name="right" />
    </div>
    <div class="title row">
      <slot name="section" />
    </div>
    <nav>
      <slot name="nav" />
    </nav>
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

nav {
  width: 100%;
  height: 38px;
}
</style>
