<script setup lang="ts">

interface InputProps {
  modelValue: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  errorText?: string;
  touched?: boolean;
}

const props = defineProps<InputProps>();
const emit = defineEmits(["update:modelValue"]);

const touched = ref(false);

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
}

</script>

<template>
  <div :class="['input-container', { 'invalid': error && touched }]">
    <label :class="{ 'invalid': error && touched }">{{ modelValue ? label : '' }}</label>
    <input
      :value="modelValue"
      @input="onInput"
      :placeholder="placeholder"
      :class="{ invalid: error && touched }"
      @focus="touched = true"
    />
    <p :class="['input-helper', { 'invalid': error && touched }]">
      {{ error && touched ? errorText : helperText }}
    </p>
    
  </div>
</template>

<style lang="scss" scoped>
.input-container {
  width: 380px;
  position: relative;
  display: flex;
  flex-direction: column;
}

label {
  position: absolute;
  top: -6px;
  left: 12px;
  background-color: $background;
  font-size: 0.75rem;
  color: #757575;
  line-height: normal;
  padding: 0px 4px;
}

input {
  color: black;
  padding: 17px 16px;
  border: 1px solid #ccc;
  background-color: $background;
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s;
}

.input-helper {
  position: absolute;
  bottom: -38px;
  font-size: 0.75rem;
  color: #757575;
  margin-left: 17px;
  margin-top: 0;
}


.input--error input {
  border-color: #ff0000;
}
.input-label--error {
  color: #ff0000;
}
.input-helper--error {
  color: #ff0000;
}
.invalid {
  border-color: red;
  color: red;
}
@media (max-width: 768px) {
  .input-container {
    width: 328px;
  }
}
</style>
