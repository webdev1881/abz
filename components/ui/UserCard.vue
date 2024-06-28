<template>
  <div class="user-card">
    <NuxtImg :src="user.photo" format="webp" quality="40" alt="" class="user-avatar"/>
    <!-- {{ user }} -->
    <div class="user-info">
      <UiToolTip class="user-name" :text="user.name" >{{ truncatedName }}</UiToolTip>
      <UiToolTip class="" :text="user.position" >{{ truncated(user.position) }}</UiToolTip>
      <UiToolTip class="" :text="user.email" >{{ truncatedEmail }}</UiToolTip>
      <UiToolTip class="" :text="user.phone" >{{ user.phone }}</UiToolTip>
      <!-- <h2 class="user-name" v-tooltip="user.name">{{ truncatedName }}</h2>
      <p class="user-job-title">{{ user.jobTitle }}</p>
      <p class="user-email" v-tooltip="user.email">{{ truncatedEmail }}</p>
      <p class="user-phone">{{ user.phone }}</p> -->
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  user: {
    type: Object,
    required: true,
    default: () => ({
      name: "",
      position: "",
      email: "",
      phone: "",
      photo: "",
    }),
  },
});

const truncatedName = computed(() => {
  if (props.user.name.length > 30) {
    return props.user.name.slice(0, 30) + "...";
  }
  return props.user.name;
});

const truncatedEmail = computed(() => {
  if (props.user.email?.length > 25) {
    return props.user.email.slice(0, 25) + "...";
  }
  return props.user.email;
});

const truncated = (text) => {
  if (text > 25) {
    return text.slice(0, 25) + "...";
  }
  return text;
}

</script>

<style lang="scss" scoped>
.user-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  transition: box-shadow 0.2s;
}

.user-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.user-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 20px;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.user-name {
  font-family: "Nunito", sans-serif;
  font-size: 16px;
  font-weight: 100;
  margin: 0 0 20px;
}

.user-job-title {
  font-family: "Nunito", sans-serif;
  font-size: 16px;
  color: #666;
  margin: 0 0 20px;
}

.user-email,
.user-phone {
  font-family: "Nunito", sans-serif;
  font-size: 16px;
  /* color: #666; */
  margin: 0 0 20px;
}
</style>
