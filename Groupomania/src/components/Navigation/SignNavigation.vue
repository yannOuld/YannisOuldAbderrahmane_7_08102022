<script setup>
  import NavigationButton from "../Utils/NavigationButton.vue";
  import imgUrl from "../../assets/images/icon.webp";
</script>

<template>
  <div class="navigation justify-between">
    <img
      src="../../assets/images/icon-left-font.webp"
      class="navigation-logo flex-row"
      alt="logo groupomania"
    />

    <div class="flex-row pr-7 justify-end">
      <navigation-button
        to="/login"
        icon="fa-solid fa-house"
        name="Se connecter"
        class="navigation-btn"
      />
      <navigation-button
        to="/register"
        icon="fa-solid fa-user"
        name="S'inscrire"
        class="navigation-btn"
      />
    </div>
  </div>
</template>
