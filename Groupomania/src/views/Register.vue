<script setup>
  import SignIn from "../components/Sign/Register.vue";
</script>

<template>
  <div class="container">
    <navigation-sign />
    <sign-in />
    <div>
      <p class="sign-btn_switch">
        Déja inscrit ?
        <router-link :to="'/login'">
          <span class="sign-btn_blue"> Se connecter. </span>
        </router-link>
      </p>
    </div>
  </div>
</template>
