<template>
  <div class="banner">
    <img src="@/assets/img/banner.png" alt="" class="banner-img" />

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
        @click="scrollTo('registration')"
        >Sign up</UiButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { scrollTo } from '@/utils/scrollTo'
</script>

<style lang="scss" scoped>
.banner {
  position: relative;
  display: flex;
  align-items: center;
//   border: 1px solid;
  height: 650px;
}
.banner-content {
  width: 380px;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  z-index: 1;
  .banner-content--description,
  .banner-content--title {
    color: white;
    text-align: center;
    font-weight: 100;
    margin-bottom: 32px;
  }
}
.banner-img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 650px;
}
</style>
