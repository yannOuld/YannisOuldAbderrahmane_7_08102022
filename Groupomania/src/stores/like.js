import { defineStore } from "pinia";
import { fetchWrapper } from "../utils/fetchWrapp";

export const useLikeStore = defineStore({
  id: "like",
  state: () => ({
    likes: [],
  }),
  getters: {
    mapLikes() {
      this.likes.map((like) => like + "hello");
    },
  },

  actions: {
    async LikePost(uuid, user_uuid) {
      try {
        await fetchWrapper.post(
          `http://localhost:3000/api/post/${uuid}/likes`,
          user_uuid
        );
      } catch (error) {
        console.log(error);
      }
    },
    async getLikes(uuid) {
      this.likes = [];
      try {
        this.likes = await fetchWrapper.get(
          `http://localhost:3000/api/post/${uuid}/likes`
        );
      } catch (error) {
        console.log(error.message);
      }
    },
  },
});
