import { defineStore } from 'pinia'
import { fetchWrapper } from '../utils/fetchWrapp';

export const useUsersStore = defineStore({
    id: 'author',
    state: () => ({
        authors: [],
        author: null,
        error: null
    }),

    actions: {
        async fetchAuthors() {

            this.authors = await fetchWrapper.get(`http://localhost:3000/api/user/`)
        },

        async fetchOneAuthor(uuid) {
            this.author = await fetchWrapper.get(`http://localhost:3000/api/user/${uuid}`)
        },

    }
})