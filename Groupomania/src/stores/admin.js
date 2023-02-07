import router from "../router/index.js";
import { defineStore } from "pinia";
import { fetchWrapper } from "../utils/fetchWrapp.js";
import { useLocalStorage } from "@vueuse/core";


// store d'authentification du user
export const useAdminStore = defineStore({
    id: 'admin',

    // States pinia user du localStorage et url de retour en cas de clear du localStorage 
    state: () => ({
        posts: [],
        post: null,
        users: [],
        user: null
    }),


    actions: {

        async fetchUsers() {

            this.users = await fetchWrapper.get(`http://localhost:3000/api/user/`)
        },
        // fonction pour modifier les infos users
        async modifyUser(uuid, formData) {

            try {
                await fetchWrapper.patchfile(`http://localhost:3000/api/user/${uuid}/admin`, formData);

            } catch (error) {
                console.log(error.message);

            } finally {
                router.push(`/home`)
            }
        },

        async deleteUser(uuid) {
            try {
                await fetchWrapper.delete(`http://localhost:3000/api/user/${uuid}/admin`)
            } catch (error) {
                console.log(error.message);
            } finally {
                this.userData = null
            }
        },

        async fetchPosts() {
            this.posts = []
            this.loading = true
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

        async modifyPost(uuid, formData) {
            try {
                await fetchWrapper.patch(`http://localhost:3000/api/post/${uuid}/admin`, formData)
            } catch (error) {
                console.log(error.message)
            }
        },

        async deletePost(uuid) {
            this.post = null
            try {
                this.post = await fetchWrapper.delete(`http://localhost:3000/api/post/${uuid}/admin`)
            } catch (error) {
                this.error = error
            }
        },

    },

})