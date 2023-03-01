<script setup>
  import { onMounted } from "vue";
  import { storeToRefs } from "pinia";
  import { useAuthStore } from "../../stores/auth.js";
  const { authAdmin } = useAuthStore();

  const admin = authAdmin();
</script>

<template>
  <div v-if="admin == true">
    <router-link to="/admin">
      <button>administration</button>
    </router-link>
  </div>
</template>
