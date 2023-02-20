import router from "../router/index.js";
import { defineStore } from "pinia";
import { fetchWrapper } from "../utils/fetchWrapp.js";
import { useLocalStorage } from "@vueuse/core";

// store d'authentification du user
export const useAuthStore = defineStore({
  id: "auth",

  // States pinia user du localStorage et url de retour en cas de clear du localStorage
  state: () => ({
    userData: useLocalStorage("userData", null, {
      serializer: {
        read: (v) => (v ? JSON.parse(v) : null),
        write: (v) => JSON.stringify(v),
      },
    }),
    returnUrl: null,
  }),

  getters: {
    authAdmin() {
      if (this.userData.user.role !== "user") return true;
    },
  },

  actions: {
    // fonction de connection
    async login(formData) {
      const userData = await fetchWrapper
        .post(`http://localhost:3000/api/auth/login`, formData)
        .catch((err) => console.log(err.message));
      this.userData = userData;
    },

    // fonction pour modifier les infos users
    async modify(uuid, formData) {
      await fetchWrapper
        .patchfile(`http://localhost:3000/api/user/${uuid}`, formData)
        .catch((err) => console.log(err.message));
    },

    //fonction de déconnection
    logout() {
      this.userData == null;
    },

    async deleteUser(uuid) {
      await fetchWrapper
        .delete(`http://localhost:3000/api/user/${uuid}`)
        .catch((err) => console.log(err.message));

      this.userData = null;
    },
  },
});
