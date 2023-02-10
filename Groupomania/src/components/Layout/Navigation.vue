<script setup>
  import NavigationButton from "../Utils/NavigationButton.vue";
  import { useAuthStore } from "../../stores/auth.js";

  const { userData } = useAuthStore();
  const { user } = userData;
  const profil = `/profil/${user.uuid}`;
</script>

<template>
  <div class="navigation">
    <img
      src="../../assets/images/icon-left-font.webP"
      class="navigation-logo"
      alt="logo groupomania"
    />
    <nav class="navigation-nav">
      <navigation-button to="'/'" icon="'faHouse'" name="Accueil" />
      <navigation-button
        :to="profil"
        icon="'fa-solid fa-house'"
        name="mon compte"
        class="navigation-btn"
      />
    </nav>
  </div>
</template>
