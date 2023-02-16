<script setup>
  import { useAuthStore } from "../../stores/auth.js";
  const { authAdmin } = useAuthStore();
</script>

<template>
  <div v-if="authAdmin">
    <router-link to="/admin">
      <button class="fixed top-0 flex">administration</button>
    </router-link>
  </div>
</template>
