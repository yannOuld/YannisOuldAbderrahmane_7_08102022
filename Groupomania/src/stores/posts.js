import router from "../router/index.js";
import { defineStore } from "pinia";
import { fetchWrapper } from "../utils/fetchWrapp";

export const usePostStore = defineStore({
  id: "post",
  state: () => ({
    posts: [],
    post: {},
  }),

  getters: {
    postsNumber() {
      return this.posts.length;
    },
  },

  actions: {
    async fetchPosts() {
      this.posts = [];
      this.posts = await fetchWrapper
        .get(`http://localhost:3000/api/post/`)
        .then((response) => {
          return response.reverse();
        })
        .catch((err) => console.log(err.message));
    },

    async fetchOnePost(uuid) {
      this.post = null;
      this.post = await fetchWrapper
        .get(`http://localhost:3000/api/post/${uuid}`)
        .catch((err) => console.log(err.message));
    },

    async sendPost(formData) {
      this.post = null
      this.post = await fetchWrapper
        .postfile("http://localhost:3000/api/post/", formData)
        .catch((err) => console.log(err.message));
      this.posts.unshift(this.post);
    },

    async deletePost(uuid) {
      await fetchWrapper
        .delete(`http://localhost:3000/api/post/${uuid}`)
        .catch((err) => console.log(err.message));
      this.posts = this.posts.filter((p) => { return p.uuid !== uuid })
    },

    async modifyPost(uuid, formData) {
      this.post = null;
      this.post = await fetchWrapper
        .patch(`http://localhost:3000/api/post/${uuid}`, formData)
        .catch((err) => console.log(err.message));
    },
  },
});
