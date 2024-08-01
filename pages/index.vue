<script setup lang="ts">
import { ref, onMounted } from 'vue'
const { $api, $toast } = useNuxtApp()
import type { IUser, IUsersResponse } from "@/types/user.type"
const { public: { apiUrl }} = useRuntimeConfig()
const users = ref<IUser[]>();
const page = ref(1);
const count = ref(6);
const isLoadMore = ref(true)
const newUser = ref(false)

const { data, pending, error, refresh, clear } = await useFetch<IUsersResponse>( ()=> apiUrl+`/users?page=${page.value}&count=${count.value}`)

users.value = data.value?.users as IUser[]

const showMore = async () => {
  page.value++
  if (data.value?.total_pages === page.value) {
    isLoadMore.value = false
  }
  await refresh()
  users.value?.push(...data.value?.users as IUser[] )
}

const updateUsers = ()=> {
  page.value = 1
  users.value = []
  refresh()
}

const addNewUserFromHeader = () => {
  newUser.value = true
}
const addNewUserFromBanner = () => {
  newUser.value = true
}
</script>

<template>
  <div>
    <div v-if="error" class="api-error"> {{ error }} </div>
    <Header @newUserFromHeader="addNewUserFromHeader" />
    <main class="container">
      <Banner @newUserFromBanner="addNewUserFromBanner" />
      <UserList :users="users" :isLoadMore="isLoadMore" :isLoading="pending" @update="showMore()" />
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
.api-error {
  display: flex;
  justify-content: center;
  width: 100vw;
  background-color: red;
  color: white;
  padding: 20px;
}
</style>
