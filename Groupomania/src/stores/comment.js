import { ref } from 'vue'
import { defineStore } from "pinia";
import { fetchWrapper } from "../utils/fetchWrapp.js";

export const useCommentStore = defineStore('comment', () => {
  const comments = ref([])
  const commentData = ref(null)

  async function fetchComments(uuid) {
    comments.value = [];
    comments.value = await fetchWrapper
      .get(`http://localhost:3000/api/post/${uuid}/comments/`)
      .then((response) => {
        return response.reverse();
      })
      .catch((err) => console.log(err.message));

  }

  async function sendComment(uuid, formData) {
    commentData.value = null;
    commentData.value = await fetchWrapper
      .post(`http://localhost:3000/api/post/${uuid}/comments`, formData)
      .catch((err) => console.log(err.message))
  }

  async function deleteComment(uuid, id) {
    await fetchWrapper
      .delete(`http://localhost:3000/api/post/${uuid}/comments/${id}`)
      .catch((err) => console.log(err.message));
    comments.value = comments.value.filter((c) => { return c.id !== id })
  }

  return { comments, commentData, fetchComments, sendComment, deleteComment }
});
