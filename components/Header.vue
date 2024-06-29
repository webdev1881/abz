<script setup lang="ts">
import { scrollTo } from '@/utils/scrollTo'
useSeoMeta({title: 'abz'})
const emit = defineEmits(['newUserFromHeader'])

const forNewUser = () => {
  emit('newUserFromHeader')
}
</script>

<template>
  <div class="header-wrapper">
    <header class="header">
      <div class="header__left">
        <img src="@/assets/img/logo.svg" alt="Logo" class="header__logo" />
        <img src="@/assets/img/title.svg" alt="Logo" class="header__title" />
      </div>
      <div class="header__right">
        <UiButton
          class="header__button"
          :disabled="false"
          @click="scrollTo('users')"
          >Users</UiButton
        >
        <UiButton
          class="header__button"
          :disabled="false"
          @click="forNewUser(); scrollTo('registration')"
          >Sign up</UiButton
        >
      </div>
    </header>
  </div>
</template>

<style lang="scss" scoped>
.header-wrapper {
  background-color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  flex-direction: row;
  background-color: white;

  &__left {
    display: flex;
    align-items: center;
    width: 104px;

    &__logo {
      width: 38.11px;
      height: 26px;
      margin-right: 1px;
    }

    &__title {
      height: 11px;
      width: 64px;
    }
  }

  &__right {
    width: 210px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
