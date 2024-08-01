<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const visible = ref(true);

onMounted(() => {
  setTimeout(() => {
    visible.value = false;
  }, 3000);
});
</script>

<template>
  <transition name="fade">
    <div v-if="visible" :class="['toast', status]">
      <span>{{ message }}</span>
    </div>
  </transition>
</template>

<style scoped>
.toast {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  padding: 1em 2em;
  border-radius: 4px;
  color: #fff;
  font-size: 1rem;
  z-index: 1000;
  transition: opacity 0.5s, top 0.5s;
}

.toast.success {
  background-color: #28a745;
}

.toast.error {
  background-color: #dc3545;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
