<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { IUser } from "@/types/user.type";
useSeoMeta({title: 'abz',})

interface UserListProps {
  users: IUser[];
  isLoadMore: boolean;
  isLoading: boolean;
}
const props = defineProps<UserListProps>()

const emit = defineEmits(["update"]);

</script>

<template>
  <div id="users">
    <div id="users" class="user-list">
      <h1 class="user-list--title">Working with GET request</h1>
      <div class="user-list--items">
        <div class="usr-card" v-for="user in users" :key="user.id">
          <UiUserCard class="usr-card" :user="user" />
        </div>
      </div>
      <UiLoader v-if="isLoading" />
      <UiButton v-if="isLoadMore"  @click="emit('update')"> Show more </UiButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 140px 0;
  .user-list--title {
    display: flex;
    justify-content: center;
    text-align: center;
    font-weight: 100;
    @media (max-width: 768px) {
      width: 320px;
    }
  }
  .user-list--items {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    row-gap: 20px;
    padding: 50px 0;
    @media (min-width: 1170px) {
      justify-content: space-between;
    }
    .usr-card {
      margin: 0 auto;
    }
  }
  // width: 100%;
}
</style>
