<template>
  <div class="sign">
    <img
      class="sign-logo"
      alt="Groupamania logo"
      src="../assets/images/icon-left-font-monochrome-black.png"
    />

    <div class="sign" v-if="mode.state == 'login'">
      <logg-in />
      <button class="sign-btn_switch" @click="switchRegister()">
        Vous n'avez pas de compte ?
        <span class="sign-btn_blue">S'inscrire.</span>
      </button>
    </div>

    <div class="sign" v-if="mode.state == 'register'">
      <sign-in />
      <button class="sign-btn_switch" @click="switchLogin()">
        Déja inscrit ? <span class="sign-btn_blue"> Se connecter.</span>
      </button>
    </div>
  </div>
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
