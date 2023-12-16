<script setup>
import { Field, Form } from 'vee-validate';
import { ObjectSchema } from 'yup';
import { ref, watchEffect } from 'vue';

// 接收父参数
const { modelValue } = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
  schema: {
    type: ObjectSchema,
    default: () => {},
  },
  modelValue: {
    type: Object,
    default: () => {},
  },
  submit: String,
});
// 更新事件
const emits = defineEmits(['update:modelValue']);
// 转存
const localValue = ref(modelValue);

const updateValue = (newValue) => {
  // 提交更新
  emits('update:modelValue', newValue);
};

watchEffect(() => {
  // 监听 localValue 的变化，一旦发生变化，更新父组件的 modelValue
  updateValue(localValue.value);
});

/**
 * 输入框样式切换
 * */
const toggleInputStyle = (msg, val) =>
  (msg && msg.length > 0 ? 'is-invalid'
  : val.trim().length > 0 ? 'is-valid'
  : ''
  ).concat(' form-control');
</script>

<template>
  <Form
    :validation-schema="schema"
    class="row form">
    <Field
      v-for="(item, index) in list"
      :key="index"
      v-slot="{ field, errorMessage, value }"
      v-model="localValue[item.name]"
      :name="item.name">
      <label class="p-0 py-1 mb-4 col-12">
        <input
          :autocomplete="item.type === 'password' ? 'off' : 'auto'"
          :class="toggleInputStyle(errorMessage, value)"
          :placeholder="item.label"
          type="text"
          v-bind="field" />
        <Transition
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
          name="fade">
          <span
            v-show="errorMessage"
            class="invalid-feedback error-msg">
            {{ errorMessage }}
          </span>
        </Transition>
      </label>
    </Field>
    <div class="p-0 d-flex justify-content-between">
      <slot name="btn" />
      <button
        class="btn btn-primary col-5"
        type="submit">
        {{ submit }}
      </button>
    </div>
    <slot name="forge" />
  </Form>
</template>

<style lang="scss" scoped>
.form {
  label {
    position: relative;
  }

  input {
    height: 44px;
  }
}

.error-msg {
  position: absolute;
  bottom: -1.25em;
}

button {
  height: 44px;
}
</style>
