import { defineStore } from "pinia";
import { fetchWrapper } from "../utils/fetchWrapp";

export const useLikeStore = defineStore({
  id: "like",
  state: () => ({
    likes: [],
  }),



  actions: {
    async LikePost(uuid, user_uuid) {
      await fetchWrapper
        .post(`http://localhost:3000/api/post/${uuid}/likes`, user_uuid)
        .catch((err) => console.log(err.message));

    },
    async getLikes(uuid) {
      this.likes = [];
      this.likes = await fetchWrapper
        .get(`http://localhost:3000/api/post/${uuid}/likes`)
        .catch((err) => console.log(err.message));

    },
  },
});
