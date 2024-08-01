import { defineNuxtPlugin } from '#app';
import { createApp, h } from 'vue';
import Toast from '~/components/ui/Toast.vue';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('toast', (message: string, status: 'success' | 'error') => {
    const mountElement = document.createElement('div');
    document.body.appendChild(mountElement);

    const toastApp = createApp({
      render() {
        return h(Toast, { message, status });
      },
    });

    const toastInstance = toastApp.mount(mountElement);

    const topOffset = document.querySelectorAll('.toast').length * 60; // Adjust the offset based on the number of toasts
    toastInstance.$el.style.top = `${-50 + topOffset}px`;

    setTimeout(() => {
      toastApp.unmount();
      document.body.removeChild(mountElement);
    }, 3500); // 3 seconds + transition time
  });
});
