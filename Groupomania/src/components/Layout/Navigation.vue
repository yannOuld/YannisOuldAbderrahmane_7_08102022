<script setup>
  import NavigationButton from "../Utils/NavigationButton.vue";
  import LogOut from "../Utils/LogOut.vue";
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
      <navigation-button to="/" icon="fa-solid fa-house" name="Accueil" />
      <navigation-button
        :to="profil"
        icon="fa-solid fa-user"
        name="compte"
        class="navigation-btn"
      />
      <log-out />
    </nav>
  </div>
</template>
