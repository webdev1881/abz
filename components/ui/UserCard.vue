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

const truncated = (text) => {
  if (text?.length > 25) {
    return text.slice(0, 25) + "...";
  }
  return text;
}

</script>

<template>
  <div class="user-card">
    <NuxtImg :src="user.photo" format="webp" quality="40" alt="" class="user-card--avatar"/><!-- Image of the user -->
    <div class="user-card--info">
      <UiToolTip class="user-card--info_name" :text="user.name" >{{ truncated(user.name) }}</UiToolTip><!-- Name of the user -->
      <UiToolTip :text="user.position" >{{ truncated(user.position) }}</UiToolTip><!-- Position of the user -->
      <UiToolTip :text="user.email" >{{ truncated(user.email) }}</UiToolTip><!-- Email of the user -->
      <UiToolTip :text="user.phone" >{{ truncated(user.phone) }}</UiToolTip><!-- Phone number of the user -->
    </div>
  </div>
</template>

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

.user-card--avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}

.user-card--info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.user-card--info_name {
  margin: 20px 0;
}
</style>