<script setup lang="ts">
import { ref } from "vue";

interface UploadProps {
  modelValue: File | null;
  label: string;
  placeholder: string;
  error?: boolean;
  errorText?: string;
}

const props = defineProps<UploadProps>();
const emit = defineEmits(["update:modelValue"]);
const fileInput = ref<HTMLInputElement | null>(null);
const fileName = ref<string>(props.modelValue ? props.modelValue.name : "");
const touched = ref(false);

const onFileChange = async (event: Event) => {
  const target = await event.target as HTMLInputElement;
  const file = target.files?.[0] || null;
  fileName.value = file ? file.name : "";
  emit("update:modelValue", file);
};

const onButtonClick = () => {
  fileInput.value?.click();
};
</script>

<template>
  <div @click="touched = true" :class="['upload-container', { 'upload--error': error && touched }]">
    <button
      @click.stop="onButtonClick"
      :class="['upload-button', { 'upload-button--error': error && touched }]"
    >
      {{ label }}
    </button>
    <input
      type="file"
      ref="fileInput"
      @change="onFileChange"
      class="upload-input"
    />
    <span
      :class="['upload-placeholder', { 'upload-placeholder--error': error && touched }]"
    >
      {{ fileName || placeholder }}
    </span>
    <p v-if="error" class="upload-error-text">{{ errorText }}</p>
  </div>
</template>

<style lang="scss" scoped>
.upload-container {
  display: flex;
  margin: 0;
  position: relative;
}

.upload-button {
  padding:0 16px;
  font-size: 16px;
  border: 1px solid #000;
  border-radius: 4px 0 0 4px;
  background-color: transparent;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.upload-button--error {
  border-color: #ff0000;
}

.upload-input {
  display: none;
}

.upload-placeholder {
  padding: 13px;
  border: 1px solid #ccc;
  border-radius: 0 4px 4px 0;
  border-left: none;
  flex-grow: 1;
  color: #757575;
}

.upload-placeholder--error {
  border-color: #ff0000;
}

.upload--error .upload-placeholder {
  border-color: #ff0000;
}

.upload-error-text {
  position: absolute;
  top: 31px;
  left: 13px;
  color: #ff0000;
  font-size: 0.75rem;
}
</style>
