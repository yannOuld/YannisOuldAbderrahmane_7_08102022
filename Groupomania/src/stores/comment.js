import { defineStore } from "pinia";
import { fetchWrapper } from "../utils/fetchWrapp.js";

export const useCommentStore = defineStore({
  id: "comment",
  state: () => ({
    comments: [],
    commentData: null,
    error: null,
  }),
  actions: {
    async fetchComments(uuid) {
      this.comments = [];

      this.comments = await fetchWrapper
        .get(`http://localhost:3000/api/post/${uuid}/comments/`)
        .then((response) => {
          return response.reverse();
        })
        .catch(err => console.log(err));

    },

    async sendComment(uuid, formData) {
      this.commentData = null;
      this.commentData = await fetchWrapper.post(
        `http://localhost:3000/api/post/${uuid}/comments`,
        formData
      ).catch(err => console.log(err, 'here'))
    },

    async deleteComment(uuid, id) {
      console.log(this.comments.filter((c) => { return c.id !== id }))
      await fetchWrapper.delete(
        `http://localhost:3000/api/post/${uuid}/comments/${id}`
      );
      this.comments = this.comments.filter((c) => { return c.id !== id })

    },
  },
});
