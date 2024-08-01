export {};

declare module '#app' {
  interface NuxtApp {
    $toast: (message: string, status: 'success' | 'error') => void;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $toast: (message: string, status: 'success' | 'error') => void;
  }
}
