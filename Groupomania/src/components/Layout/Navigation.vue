<script setup>
  import NavigationButton from "../Utils/NavigationButton.vue";
  import AdminButton from "../Utils/AdminButton.vue";
  import LogoutButton from "../Utils/LogoutButton.vue";
  import { useAuthStore } from "../../stores/auth.js";

  const { userData } = useAuthStore();
  const { user } = userData;
  const profil = `/profil/${user.uuid}`;
</script>

<template>
  <div
    class="fixed flex flex-row top-0 justify-between w-screen bg-white z-10 border-b-2 border-solid border-black"
  >
    <img
      src="../../assets/images/icon-left-font.webP"
      class="navigation-logo flex-row"
      alt="logo groupomania"
    />
    <nav class="navigation-nav flex-row">
      <admin-button />
      <navigation-button to="/" icon="fa-solid fa-house" name="Accueil" />
      <navigation-button
        :to="profil"
        icon="fa-solid fa-user"
        name="compte"
        class="navigation-btn"
      />
      <logout-button />
    </nav>
  </div>
</template>
