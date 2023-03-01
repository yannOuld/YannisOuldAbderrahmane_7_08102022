<script setup>
  import NavigationButton from "../Utils/NavigationButton.vue";
  import imgUrl from "../..//assets/images/icon.webp";
  import AdminButton from "../Utils/AdminButton.vue";
  import LogoutButton from "../Utils/LogoutButton.vue";
  import { useAuthStore } from "../../stores/auth.js";

  const { userData } = useAuthStore();
  const { user } = userData;
  const profil = `/profil/${user.uuid}`;
</script>

<template>
  <div class="navigation">
    <router-link to="/">
      <img
        src="../../assets/images/icon-left-font.webp"
        class="navigation-logo flex-row"
        alt="logo groupomania"
      />
    </router-link>
    <admin-button />

    <div class="navigation-nav">
      <img :src="user.imageUrl" alt="user" class="navigation-nav-img" />
      <p class="font-bold pointer-events-none">
        {{ user.firstName }} {{ user.lastName }}
      </p>
      <div class="flex-row">
        <navigation-button
          to="/"
          icon="fa-solid fa-house"
          name="Accueil"
          class="navigation-btn sm:hidden"
        />
        <navigation-button
          :to="profil"
          icon="fa-solid fa-user"
          name="Profil"
          class="navigation-btn"
        />
        <logout-button />
      </div>
    </div>
  </div>
</template>
