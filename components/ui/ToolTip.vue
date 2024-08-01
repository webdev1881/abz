<script setup>
import { ref } from "vue"
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
})
const show = ref(false)
</script>

<template>
  <div
    class="tooltip-container"
    @mouseover="show = true"
    @mouseleave="show = false"
  >
    <slot />
    <div v-if="show" class="tooltip-popup">{{ text }}</div>
  </div>
</template>

<style scoped>
.tooltip-container {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.tooltip-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px; /* Adjust the width as needed */
}

.tooltip-popup {
  position: absolute;
  bottom: -200%;
  left: 0;
  /* transform: translateX(-50%); */
  background-color: black;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  white-space: nowrap;
  z-index: 10;
}
</style>
