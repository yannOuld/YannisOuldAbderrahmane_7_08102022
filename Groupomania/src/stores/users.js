import { defineStore } from "pinia";
import { fetchWrapper } from "../utils/fetchWrapp";

export const useUsersStore = defineStore({
  id: "author",
  state: () => ({
    users: [],
    author: null,
  }),

  actions: {
    async fetchUsers() {
      this.users = await fetchWrapper
        .get(`http://localhost:3000/api/user/`)
        .catch((err) => console.log(err.message));
    },

    async fetchOneAuthor(uuid) {
      this.author = await fetchWrapper
        .get(`http://localhost:3000/api/user/${uuid}`)
        .catch((err) => console.log(err.message));
    },
  },
});
