import router from "../router/index.js";
import { defineStore } from "pinia";
import { fetchWrapper } from "../utils/fetchWrapp.js";
import { useLocalStorage } from "@vueuse/core";

// store d'authentification du user
export const useAdminStore = defineStore({
  id: "admin",

  // States pinia user du localStorage et url de retour en cas de clear du localStorage
  state: () => ({
    posts: [],
    post: null,
    users: [],
    user: null,
  }),

  actions: {
    async fetchUsers() {
      this.users = [];
      this.users = await fetchWrapper.get(`http://localhost:3000/api/user/`);

    },

    async modifyUser(uuid, formData) {

      await fetchWrapper.patchfile(
        `http://localhost:3000/api/user/${uuid}/admin`,
        formData
      );

    },

    async deleteUser(uuid) {

      await fetchWrapper
        .delete(`http://localhost:3000/api/user/${uuid}/admin`)
        .catch((err) => console.log(err.message));
      this.users = this.users.filter((user) => user.uuid != uuid);
    },

    async fetchPosts() {
      this.posts = [];
      this.posts = await fetchWrapper
        .get(`http://localhost:3000/api/post/`)
        .then((response) => {
          return response.reverse();
        })
        .catch((err) => console.log(err.message));
    },

    async modifyPost(uuid, formData) {
      await fetchWrapper
        .patchfile(
          `http://localhost:3000/api/post/${uuid}/admin`,
          formData
        )
        .catch((err) => console.log(err.message));
    },

    async deletePost(uuid) {
      this.post = null;
      this.post = await fetchWrapper
        .delete(
          `http://localhost:3000/api/post/${uuid}/admin`
        )
        .catch((err) => console.log(err.message));
      this.posts = this.posts.filter((post) => post.uuid != uuid);
    },
  },
});
