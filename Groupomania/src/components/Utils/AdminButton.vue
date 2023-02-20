<script setup>
  import { storeToRefs } from "pinia";
  import { useAuthStore } from "../../stores/auth.js";
  const { authAdmin } = storeToRefs(useAuthStore());
</script>

<template>
  <div v-if="authAdmin">
    <router-link to="/admin">
      <button>administration</button>
    </router-link>
  </div>
</template>
