<script setup lang="ts">
import { scrollTo } from '@/utils/scrollTo'
useSeoMeta({title: 'abz'})
const emit = defineEmits(['newUserFromHeader']);
const forNewUser = () => {
  emit('newUserFromHeader')
}
</script>

<template>
  <div class="heder-wrapper">
    <header class="header">
      <div class="header-left">
        <img src="@/assets/img/logo.svg" alt="Logo" class="logo" />
        <span class="title">TESTTASK</span>
      </div>
      <div class="header-right">
        <UiButton
          class="header-button"
          :disabled="false"
          @click="scrollTo('users')"
          >Users</UiButton
        >
        <UiButton
          class="header-button"
          :disabled="false"
          @click=" forNewUser(); scrollTo('registration')"
          >Sign up</UiButton
        >
      </div>
    </header>
  </div>
</template>

<style scoped>
.heder-wrapper {
  background-color: #fff;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 15px 0;
  flex-direction: row;
  background-color: white;
}

.header-left {
  display: flex;
  /* padding-left: 32px; */
}

.logo {
  width: 38.11px;
  height: 26px;
  margin-right: 2px;
}

.title {
  font-family: "Nunito", sans-serif;
  font-size: 14px;
}

.header-right {
  width: 210px;
  display: flex;
  justify-content: space-between;
  /* padding-right: 32px; */
}

/* @media (min-width: 1024px) {
  .header {
    max-width: 1024px;
  }
  .header-right {
    padding-right: 60px;
  }
  .header-left {
    padding-left: 60px;
  }
}
@media (min-width: 768px) and (max-width: 1023px) {
  .header {
    max-width: 768px;
  }
}
@media (max-width: 767px) {
  .header {
    max-width: 360px;
  }
  .header-right {
    padding-right: 16px;
  }
  .header-left {
    padding-left: 16px;
  }
} */
</style>
