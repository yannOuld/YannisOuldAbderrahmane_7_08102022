import router from "../router/index.js";
import { defineStore } from "pinia";
import { fetchWrapper } from "../utils/fetchWrapp.js";
import { useLocalStorage } from "@vueuse/core";

// store d'authentification du user
export const useAuthStore = defineStore({
  id: "auth",

  // States pinia user du localStorage et url de retour en cas de clear du localStorage
  state: () => ({
    userData: useLocalStorage("userData", null),
    returnUrl: null,
  }),

  getters: {
    authAdmin() {
      if (this.userData.user.role != "user") return true;
    },
  },

  actions: {
    // fonction de connection
    async login(formData) {
      try {
        const userData = await fetchWrapper.post(
          `http://localhost:3000/api/user/login`,
          formData
        );
        this.userData = userData;
      } catch (error) {
        console.log(error.message);
      } finally {
        router.push("/home");
      }
    },

    // fonction pour modifier les infos users
    async modify(uuid, formData) {
      try {
        await fetchWrapper.patchfile(
          `http://localhost:3000/api/user/${uuid}`,
          formData
        );
      } catch (error) {
        console.log(error.message);
      }
    },

    //fonction de déconnection
    logout() {
      this.userData = null;
      router.push("/");
    },

    async deleteUser(uuid) {
      try {
        await fetchWrapper.delete(`http://localhost:3000/api/user/${uuid}`);
      } catch (error) {
        console.log(error.message);
      } finally {
        this.userData = null;
      }
    },
  },
});
