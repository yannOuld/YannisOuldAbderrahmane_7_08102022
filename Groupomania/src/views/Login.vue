<script setup>
  import LoggIn from "../components/Sign/Login.vue";
</script>

<template>
  <div class="sign">
    <img
      class="sign-logo"
      alt="Groupamania logo"
      src="../assets/images/icon-left-font-monochrome-black.png"
    />
    <logg-in />
    <p class="sign-btn_switch">Vous n'avez pas de compte ?</p>
    <router-link to="/register">
      <button class="sign-btn_blue font-bold">S'inscrire.</button>
    </router-link>
  </div>
</template>
