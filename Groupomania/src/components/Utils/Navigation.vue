<template>
  <div class="bar">
    <img
      src="../../assets/images/icon-left-font.webP"
      class="logo"
      alt="logo groupomania"
    />
    <nav class="nav">
      <button class="btn" @click="home()">
        <span class="icon">
          <font-awesome-icon icon="fa-solid fa-house" />
        </span>
        Home
      </button>
      <button class="btn" @click="profil()">
        <span class="icon">
          <font-awesome-icon icon="fa-solid fa-user" />
        </span>
        Profil
      </button>

      <button class="btn" @click="logOut()">
        <span class="icon">
          <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />
        </span>
        deconnection
      </button>
    </nav>
  </div>
</template>

<script>
import { useAuthStore } from "../../stores/auth";
import { useRouter } from "vue-router";
export default {
  name: "NavigationLinks",
  setup() {
    //call store data and router
    const { userData } = useAuthStore();
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

    // logout function
    const logOut = () => {
      logout();
      return router.push("/");
    };
    return {
      logOut,
      profil,
      home,
      router,
    };
  },
};
</script>

<style scoped>
.bar {
  @apply p-0 flex flex-col items-center md:flex-row md:px-16 md:py-24 justify-between;
}
.logo {
  @apply w-64 mx-auto flex flex-row h-24 object-cover lg:w-72 md:mx-0;
}

.nav {
  @apply mx-auto flex flex-row  my-0 w-96 justify-center sm:justify-end md:justify-end md:mx-3;
}

.btn {
  @apply text-white font-bold border-0 rounded m-1 cursor-pointer contrast-125 bg-red-600 p-3 h-12 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 duration-300;
}

.icon {
  @apply w-4 mr-2;
}
</style>
