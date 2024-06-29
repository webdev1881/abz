<script setup lang="ts">
import { ref, onMounted } from 'vue'
const { $api, $toast } = useNuxtApp()
import type { IUser } from "@/types/user.type"

// const users = ref<IUser[]>([]);
const page = ref(1);
const count = ref(6);
const isLoadMore = ref(false)
const isLoading = ref(true)
const newUser = ref(false)

// Fetch users from API
// const fetchUsers = async () => {
//   try {
//     const { data } = await $api(`/users?page=${page.value}&count=${count.value}`)
//     if(data.success) {
//       isLoadMore.value = true
//       users.value.push(...data.users)
//       if (data.total_pages === page.value) {
//         isLoadMore.value = false
//       }
//       page.value++
//       isLoading.value = false
//     } 
//   } catch (error) {
//     $toast((error as Error).message, "error")
//   }  
// }

const { data, error, refresh, pending, status } = await useFetch<IUser[]>(() => `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page.value}&count=${count.value}`)

isLoading.value = !data
isLoadMore.value = !!data

// Update users for Show More 
const updateUsers = async ()=> {
  // isLoading.value = true
  page.value = 1
  data.value = []
  page.value++
  refresh()
  // await fetchUsers()
}

// Add new user from header
const addNewUserFromHeader = () => {
  newUser.value = true
}

// Add new user from banner
const addNewUserFromBanner = () => {
  newUser.value = true
}

// Initialize fetchUsers on mount
// onMounted(() => { fetchUsers() })
</script>

<template>
  <div>
    {{ status }}
    <!-- {{ data }} -->
    <Header @newUserFromHeader="addNewUserFromHeader" />
    <main class="container">
      <Banner @newUserFromBanner="addNewUserFromBanner" />
      <UserList :users="data.users" :isLoadMore="isLoadMore" :isLoading="isLoading" @update="fetchUsers" />
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
