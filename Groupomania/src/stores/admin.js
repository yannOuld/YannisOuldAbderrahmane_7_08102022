import { ref } from 'vue'
import { defineStore } from "pinia";
import { fetchWrapper } from "../utils/fetchWrapp.js";


// store d'authentification du user
export const useAdminStore = defineStore('admin', () => {
  const posts = ref([]);
  const post = ref(null);
  const users = ref([]);
  const user = ref(null);

  async function fetchUsers() {
    users.value = [];
    users.value = await fetchWrapper
      .get(`http://localhost:3000/api/user/`)
      .catch((err) => console.log(err.message));
  }

  async function modifyUser(uuid, formData) {
    await fetchWrapper
      .patchfile(`http://localhost:3000/api/user/${uuid}`, formData)
      .catch((err) => console.log(err.message));
  }

  async function deleteUser(uuid) {
    await fetchWrapper
      .delete(`http://localhost:3000/api/user/${uuid}`)
      .catch((err) => console.log(err.message));
    users.value = users.value.filter((user) => user.uuid != uuid);
  }

  async function fetchPosts() {
    posts.value = [];
    posts.value = await fetchWrapper
      .get(`http://localhost:3000/api/post/`)
      .then((response) => {
        return response.reverse();
      })
      .catch((err) => console.log(err.message));
  }

  async function modifyPost(uuid, formData) {
    await fetchWrapper
      .patchfile(`http://localhost:3000/api/post/${uuid}`, formData)
      .catch((err) => console.log(err.message));
  }

  async function deletePost(uuid) {
    await fetchWrapper
      .delete(`http://localhost:3000/api/post/${uuid}`)
      .catch((err) => console.log(err.message));
    posts.value = posts.value.filter((post) => post.uuid != uuid);
  }

  return { posts, post, users, user, fetchUsers, modifyUser, deleteUser, modifyPost, deletePost, fetchPosts }
});
