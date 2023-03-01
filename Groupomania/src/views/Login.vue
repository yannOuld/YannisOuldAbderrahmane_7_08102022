<script setup>
  import LoggIn from "../components/Sign/Login.vue";
</script>

<template>
  <div class="container">
    <logg-in />
    <p class="sign-btn_switch">Vous n'avez pas de compte ?</p>
    <router-link to="/register">
      <span class="sign-btn_blue">S'inscrire.</span>
    </router-link>
  </div>
</template>
