<script setup>
  import SignIn from "../components/Sign/Register.vue";
</script>

<template>
  <div class="sign">
    <img
      class="sign-logo"
      alt="Groupamania logo"
      src="../assets/images/icon-left-font-monochrome-black.png"
    />
    <sign-in />
    <div>
      <p class="sign-btn_switch">Déja inscrit ?</p>
      <router-link :to="'/login'">
        <button class="sign-btn_blue font-bold">Se connecter.</button>
      </router-link>
    </div>
  </div>
</template>
