<script setup lang="ts">
import { scrollTo } from '@/utils/scrollTo'
const emit = defineEmits(['newUserFromBanner']);
const forNewUser = () => {
  emit('newUserFromBanner')
}
useSeoMeta({title: 'abz',})
</script>

<template>
  <div class="banner">
    <img src="@/assets/img/banner.webp" alt="" class="banner-img" />
    <div class="banner-content">
      <h1 class="banner-content--title">
        Test assignment for front-end developer
      </h1>
      <div class="banner-content--description">
        What defines a good front-end developer is one that has skilled
        knowledge of HTML, CSS, JS with a vast understanding of User design
        thinking as they'll be building web interfaces with accessibility in
        mind. They should also be excited to learn, as the world of Front-End
        Development keeps evolving.
      </div>
      <UiButton
        class="banner-button"
        :disabled="false"
        @click=" forNewUser(); scrollTo('registration')"
      >Sign up</UiButton
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.banner {
  position: relative;
  display: flex;

  &-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    z-index: 1;

    &--description,
    &--title {
      color: white;
      text-align: center;
      font-weight: 100;
      margin: 0;
    }
    
    &--description {
      margin-top: -10px;
    }
  }

  &-img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }
}


</style>
