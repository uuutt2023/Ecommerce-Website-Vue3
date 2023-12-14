<script setup>
import { Field } from 'vee-validate';

defineProps({
  label: String, // 标签名
  name: String, // 别名
  type: String, // 类型
  modelValue: {
    type: String,
    required: true,
  }, // 父组件传值接收
});

defineEmits(['update:modelValue']);

const hasString = (val) => val && val.length > 0;

const toggleInputStyle = (field, errorMessage) =>
  'form-control ' +
  (hasString(errorMessage) ? 'is-invalid'
  : hasString(field?.value) ? 'is-valid'
  : '');
</script>

<template>
  <div class="mb-2 mb-md-3">
    <Field
      v-slot="{ field, errorMessage }"
      :name="name"
      :type="type">
      <label
        :for="`${type}-${name}`"
        class="form-label"
        v-text="label" />

      <input
        :id="`${type}-${name}`"
        :class="toggleInputStyle(field, errorMessage)"
        :value="modelValue"
        v-bind="field"
        @input="$emit('update:modelValue', $event.target.value)" />

      <Transition name="bounce">
        <span
          v-if="errorMessage"
          class="invalid-feedback">
          {{ errorMessage }}
        </span>
      </Transition>
    </Field>
  </div>
</template>

<style lang="scss" scoped>
label {
  color: #748aa1;
}

span,
label {
  text-indent: 0.5em;
}

.bounce {
  &-enter-active {
    animation: bounce-in 0.5s ease;
  }

  &-leave-active {
    animation: bounce-in 0.5s reverse;
  }
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
    max-height: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    max-height: 1.45em;
  }
}
</style>
