<script setup>
  import { useAuthStore } from "../../stores/auth.js";
  const { authAdmin } = useAuthStore();
</script>

<template>
  <router-link v-if="authAdmin" to="/admin">
    <button class="fixed top-0 flex">administration</button>
  </router-link>
</template>
