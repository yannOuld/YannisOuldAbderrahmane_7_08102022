import { ref } from 'vue'
import { defineStore } from "pinia";
import { fetchWrapper } from "../utils/fetchWrapp.js";
import { useLocalStorage } from "@vueuse/core";

// store d'authentification du user
export const useAuthStore = defineStore('auth', () => {
  const userData = useLocalStorage("userData", null, {
    serializer: {
      read: (v) => (v ? JSON.parse(v) : null),
      write: (v) => JSON.stringify(v),
    }
  })
  const returnUrl = ref(null)

  function authAdmin() {
    if (userData.user.role !== "user") return true;
  }

  async function login(formData) {
    userData.value = await fetchWrapper
      .post(`http://localhost:3000/api/auth/login`, formData)
      .catch((err) => console.log(err.message));
  }

  async function modify(uuid, formData) {
    await fetchWrapper
      .patchfile(`http://localhost:3000/api/user/${uuid}`, formData)
      .catch((err) => console.log(err.message));
  }

  function logout() {
    userData = null;
  }

  async function deleteUser(uuid) {
    await fetchWrapper
      .delete(`http://localhost:3000/api/user/${uuid}`)
      .catch((err) => console.log(err.message));

    userData = null;
  }
  return { userData, returnUrl, authAdmin, login, modify, logout, deleteUser }
});
