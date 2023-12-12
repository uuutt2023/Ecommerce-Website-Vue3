<script setup>
import { Field } from 'vee-validate';

defineProps({
  name: String,
  type: String,
  labelStr: String,
  rules: String,
});

const hasString = (val) => val && val.length > 0;

function toggleMsgShow(field, errorMessage) {
  return (
    hasString(errorMessage) ? 'is-invalid'
    : field?.value && field.value.length > 0 ? 'is-valid'
    : ''
  );
}
</script>

<template>
  <div>
    <label
      :for="name"
      class="form-label">
      {{ labelStr }}
    </label>
    <Field
      v-slot="{ field, errorMessage }"
      :name="name"
      :rules="rules">
      <input
        :id="name"
        :autocomplete="type === 'password' ? 'off' : null"
        :class="toggleMsgShow(field, errorMessage)"
        :type="type"
        class="form-control"
        v-bind="field" />
      <Transition name="bounce">
        <span
          v-show="hasString(errorMessage)"
          class="invalid-feedback">
          {{ errorMessage }}
        </span>
      </Transition>
    </Field>
  </div>
</template>

<style scoped>
label {
  color: #748aa1;
}

span,
label {
  text-indent: 0.5em;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
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
    max-height: 25px;
  }
}
</style>
