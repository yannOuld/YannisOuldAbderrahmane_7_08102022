<script setup>
  import { useAuthStore } from "../../stores/auth.js";
  const { logout } = useAuthStore();
  function userLogout() {
    logout();
  }
</script>

<template>
  <router-link to="/login">
    <button
      class="hover:bg-orange-500 duration-300 navigation-btn"
      @click="userLogout()"
    >
      <span class="navigation-btn_icon">
        <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />
      </span>
      Se deconnecter
    </button>
  </router-link>
</template>
