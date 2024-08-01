<template>
  <div class="not-found">
    <h1 class="not-found__title">404</h1>
    <p class="not-found__message">Page not found</p>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style lang="scss">
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  color: #333;

  &__title {
    font-size: 6rem;
    margin: 0;
    margin-bottom: 15px;
  }

  &__message {
    font-size: 1.5rem;
    margin: 1rem 0;
  }
}

</style>
