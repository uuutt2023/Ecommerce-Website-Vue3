<script setup>
import { hashString } from '@/assets/js/util';

const { text } = defineProps({
  name: String,
  label: String,
  text: Array,
  fn: Function,
});
const listBtn = ['不限', ...text];
</script>

<template>
  <div class="row mt-2">
    <label
      class="col-form-label col-auto"
      v-text="label + '：'" />

    <div
      aria-label="Basic radio toggle button group"
      class="col-auto btn-group p-0"
      role="group">
      <span
        v-for="(item, index) in listBtn"
        :key="index">
        <input
          :id="hashString(label + item)"
          :checked="index === 0"
          :name="name"
          autocomplete="off"
          class="btn-check"
          type="radio" />
        <label
          :for="hashString(label + item)"
          class="btn btn-outline-primary"
          @click="fn(item)"
          v-text="item" />
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.row {
  align-items: center;
}

label {
  border: 0;
}

ul {
  margin: 0;
  padding: 0;
  overflow: hidden;
  flex-direction: row-reverse;
}
</style>
