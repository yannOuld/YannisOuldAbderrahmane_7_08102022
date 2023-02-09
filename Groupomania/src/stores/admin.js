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
      try {
        this.users = await fetchWrapper.get(`http://localhost:3000/api/user/`);
      } catch (error) {
        console.log(error.message);
      }
    },

    async modifyUser(uuid, formData) {
      try {
        await fetchWrapper.patchfile(
          `http://localhost:3000/api/user/${uuid}/admin`,
          formData
        );
      } catch (error) {
        console.log(error.message);
      }
    },

    async deleteUser(uuid) {
      try {
        await fetchWrapper.delete(
          `http://localhost:3000/api/user/${uuid}/admin`
        );
        this.users = this.users.filter((user) => user.uuid != uuid);
      } catch (error) {
        console.log(error.message);
      }
    },

    async fetchPosts() {
      this.posts = [];
      try {
        this.posts = await fetchWrapper
          .get(`http://localhost:3000/api/post/`)
          .then((response) => {
            return response.reverse();
          });
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },

    async modifyPost(uuid, formData) {
      try {
        await fetchWrapper.patchfile(
          `http://localhost:3000/api/post/${uuid}/admin`,
          formData
        );
      } catch (error) {
        console.log(error.message);
      }
    },

    async deletePost(uuid) {
      this.post = null;
      try {
        this.post = await fetchWrapper.delete(
          `http://localhost:3000/api/post/${uuid}/admin`
        );
        this.posts = this.posts.filter((post) => post.uuid != uuid);
      } catch (error) {
        this.error = error;
      }
    },
  },
});
