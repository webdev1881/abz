<script setup lang="ts">
import { computed } from "vue";

interface ButtonProps {
  disabled?: boolean;
}

const props = defineProps<ButtonProps>();

const emit = defineEmits(["click"]);

const computedClass = computed(() => {
  return ["btn", { "btn--disabled": props.disabled }];
});

const handleClick = (event: Event) => {
  if (!props.disabled) {
    emit("click", event);
  }
}
</script>

<template>
  <div :class="computedClass" :disabled="disabled" @click="handleClick">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.btn {
  width: 100px;
  height: 34px;
  background-color: $primary;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 80px;
  cursor: pointer;
  transition: background-color 0.1s ease;
  &:hover {
    background-color: #FFE302;
  }
}

.btn--disabled {
  background-color: #B4B4B4;
  color: #FFFFFF;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
