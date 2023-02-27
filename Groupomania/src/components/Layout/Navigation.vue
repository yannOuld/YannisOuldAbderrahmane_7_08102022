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
    class="fixed flex sm:flex-row top-0 justify-between w-screen bg-white z-20 border-b-2 border-solid border-black"
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

<style scoped>
  .navigation {
    @apply p-0 md:flex-row md:px-16 md:py-24 border-solid border-b-2 border-black;
  }
  .navigation-logo {
    @apply w-64  flex h-16 object-cover lg:w-72 md:mx-0;
  }
  .navigation-nav {
    @apply flex my-0 w-10/12 sm:w-96 justify-around sm:justify-end md:justify-end md:mx-3;
  }

  .navigation-btn_icon {
    @apply w-4 mr-2;
  }
</style>
