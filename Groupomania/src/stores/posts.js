import router from "../router/index.js";
import { defineStore } from 'pinia';
import { fetchWrapper } from '../utils/fetchWrapp';


export const usePostStore = defineStore({
    id: 'post',
    state: () => ({
        posts: [],
        post: {},
        loading: false,
        error: null
    }),

    getters: {
        postsNumber() {
            return this.posts.length
        },
    },

    actions: {
        async fetchPosts() {
            this.posts = [];
            this.loading = true;
            try {
                this.posts = await fetchWrapper.get(`http://localhost:3000/api/post/`).then((response) => {
                    return response.reverse()
                })
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async fetchOnePost(uuid) {
            this.post = null;
            try {
                this.post = await fetchWrapper.get(`http://localhost:3000/api/post/${uuid}`)

            } catch (error) {
                this.error = error
            }
        },
        async sendPost(formData) {
            this.post = null;
            try {
                this.post = await fetchWrapper.postfile('http://localhost:3000/api/post/', formData)
            } catch (error) {
                this.error = error
            }
            this.posts.unshift(this.post)
        },
        async deletePost(uuid) {
            this.post = null
            try {
                this.post = await fetchWrapper.delete(`http://localhost:3000/api/post/${uuid}`)
            } catch (error) {
                this.error = error
            }
        },
        async modifyPost(uuid, formData) {
            this.post = null
            try {
                this.post = await fetchWrapper.patch(`http://localhost:3000/api/post/${uuid}`, formData)
            } catch (error) {
                console.log(error.message)
            }
        }
    }
})