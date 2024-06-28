<script setup lang="ts">
import { ref, onMounted } from 'vue';
const { $api, $toast } = useNuxtApp();
import type { IUser } from "@/types/user.type";

const users = ref<IUser[]>([]);
const page = ref(1);
let count = ref(6);
let isLoadMore = ref(false)
let isLoading = ref(true)
const newUser = ref(false)

const fetchUsers = async () => {
  try {
    const { data } = await $api(`/users?page=${page.value}&count=${count.value}`)
    if(data.success) {
      isLoadMore.value = true
      users.value.push(...data.users)
      if (data.total_pages === page.value) {
        isLoadMore.value = false
      }
      page.value++;
      isLoading.value = false
    } 
  } catch (error) {
    $toast((error as Error).message, "error")
  }  
};

const updateUsers = async ()=> {
  isLoading.value = true
  page.value = 1
  users.value = []
  await fetchUsers()
}

const addNewUser = () => {
  newUser.value = true
}

onMounted(() => { fetchUsers() })
</script>

<template>
  <div>
    <Header @newUserFromHeader="addNewUser" />
    <main class="container">
      <Banner @newUserFromBanner="addNewUser" />
      <UserList :users="users" :isLoadMore="isLoadMore" :isLoading="isLoading" @update="fetchUsers" />
      <RegistrationForm :newUser="newUser" @user-registered="updateUsers" />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
}
</style>
