<template>
  <div class="navigation">
    <img
      src="../../assets/images/icon-left-font.webP"
      class="navigation-logo"
      alt="logo groupomania"
    />
    <nav class="navigation-nav">
      <button
        v-if="authAdmin"
        class="fixed top-0 left-0 right-0 z-10 p-4"
        @click="admin()"
      >
        administration
      </button>
      <button
        class="hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 duration-300 navigation-btn"
        @click="home()"
      >
        <span class="navigation-btn_icon">
          <font-awesome-icon icon="fa-solid fa-house" />
        </span>
        Home
      </button>
      <button
        class="hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 duration-300 navigation-btn"
        @click="profil()"
      >
        <span class="navigation-btn_icon">
          <font-awesome-icon icon="fa-solid fa-user" />
        </span>
        Profil
      </button>

      <button
        class="hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 duration-300 navigation-btn"
        @click="logOut()"
      >
        <span class="navigation-btn_icon">
          <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />
        </span>
        deconnection
      </button>
    </nav>
  </div>
</template>

<script setup>
import { useAuthStore } from "../../stores/auth";
import { useRouter } from "vue-router";

//call store data and router
const { userData, authAdmin } = useAuthStore();
const { user } = userData;
const { logout } = useAuthStore();
const router = useRouter();

// link Home component
const home = () => {
  router.push("/home");
};

// link profil component
const profil = () => {
  router.push({
    name: "ProfilView",
    params: { uuid: user.uuid },
  });
};

// link profil component
const admin = () => {
  router.push({
    name: "AdminView",
  });
};

// logout function
const logOut = () => {
  logout();
  return router.push("/");
};
</script>
