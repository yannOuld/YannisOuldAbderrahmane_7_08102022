<script setup>
  import { useAuthStore } from "../../stores/auth.js";
  const { logout } = useAuthStore();
  const userLogout = () => {
    logout();
  };
</script>

<template>
  <router-link to="/login">
    <button
      class="hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 duration-300 navigation-btn"
      @click="userLogout"
    >
      <span class="navigation-btn_icon">
        <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />
      </span>
      deconnection
    </button>
  </router-link>
</template>
