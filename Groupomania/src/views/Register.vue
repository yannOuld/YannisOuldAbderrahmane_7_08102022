<script setup>
  import SignIn from "../components/Sign/Register.vue";
</script>

<template>
  <div class="sign">
    <img
      class="sign-logo"
      alt="Groupamania logo"
      src="../assets/images/icon.webp"
    />
    <sign-in />
    <div>
      <p class="sign-btn_switch">
        Déja inscrit ?
        <span class="text-red-600">
          <router-link :to="'/login'"> Se connecter. </router-link>
        </span>
      </p>
    </div>
  </div>
</template>

<style scoped></style>
