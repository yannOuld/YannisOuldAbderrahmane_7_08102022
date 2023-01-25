<template>
  <main class="view">
    <img
      class="logo"
      alt="Groupamania logo"
      src="../assets/images/icon-left-font-monochrome-black.png"
    />

    <div v-if="mode.state == 'login'">
      <logg-in />
      <button @click="switchRegister()">
        Vous n'avez pas de compte ? <span>S'inscrire.</span>
      </button>
    </div>

    <div v-if="mode.state == 'register'">
      <sign-in />
      <button @click="switchLogin()">
        Déja inscrit ? <span> Se connecter.</span>
      </button>
    </div>
  </main>
</template>

<script>
import SignIn from "../components/Sign/Signup.vue";
import LoggIn from "../components/Sign/Login.vue";
import { reactive } from "vue";

export default {
  name: "SignView",
  components: {
    SignIn,
    LoggIn,
  },

  setup() {
    // mode for components display
    const mode = reactive({
      state: "login" || "register",
    });
    // method for mode login
    const switchLogin = () => {
      mode.state = "login";
    };
    // method for mode register
    const switchRegister = () => {
      mode.state = "register";
    };

    return {
      mode,
      switchLogin,
      switchRegister,
    };
  },
};
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
}
.logo {
  width: 300px;
  text-align: none;
  margin: 10px 40px;
}
button {
  border: none;
  background-color: transparent;
  font-size: 15px;
  margin: 10px 0;
  text-align: center;
  cursor: pointer;
}
span {
  color: blue;
  font-weight: 900;
}
</style>
