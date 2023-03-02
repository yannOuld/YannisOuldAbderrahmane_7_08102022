import { ref } from 'vue'
import { defineStore } from "pinia";
import { fetchWrapper } from "../utils/fetchWrapp";

export const useUsersStore = defineStore('author', () => {

  const users = ref([]);
  const author = ref(null);
  const userPosts = ref([]);

  async function fetchUsers() {
    users.value = await fetchWrapper
      .get(`http://localhost:3000/api/user/`)
      .catch((err) => console.log(err.message));
  }

  async function fetchOneAuthor(uuid) {
    author.value = await fetchWrapper
      .get(`http://localhost:3000/api/user/${uuid}`)
      .catch((err) => console.log(err.message));
    userPosts.value = author.value.posts
  }

  return { users, author, userPosts, fetchUsers, fetchOneAuthor }
});
