<template>
  <div class="bar">
    <img
      src="../../assets/images/icon-left-font.webP"
      class="logo"
      alt="logo groupomania"
    />
    <nav class="nav">
      <button @click="home()">
        <span>
          <font-awesome-icon icon="fa-solid fa-house" />
        </span>
        Home
      </button>
      <button @click="profil()">
        <span>
          <font-awesome-icon icon="fa-solid fa-user" />
        </span>
        Profil
      </button>

      <button class="btn-alert" @click="logOut()">
        <span>
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
div {
  text-align: center;
  display: flex;
}
.logo {
  width: 250px;
  height: 100px;
  object-fit: cover;
}

.bar {
  width: 100%;
  height: 100px;
  margin: auto 100px;
  display: flex;
  justify-content: space-between;
}

.nav {
  margin: auto 0;
  border: 1px solid transparent;
  border-radius: 15px;
  background-color: transparent;
  z-index: 2;
}

button {
  mix-blend-mode: difference;
  font-weight: 700;
  padding: 15px 15px;
  background-color: #fd2d01;
  color: rgb(255, 255, 255);
  border: none;
  border-radius: 10px;
  margin: 10px;
  cursor: pointer;
  filter: contrast(1.2);
  font-size: 14px;
}

button:hover {
  filter: brightness(1.2);
}
span {
  width: 15px;
  margin: 0 15px 0 0;
}
</style>
