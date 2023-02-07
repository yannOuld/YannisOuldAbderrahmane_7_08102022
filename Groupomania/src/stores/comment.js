import { defineStore } from "pinia";
import { fetchWrapper } from "../utils/fetchWrapp.js";


export const useCommentStore = defineStore({
    id: 'comment',
    state: () => ({
        comments: [],
        commentData: null,
        error: null
    }),
    actions: {
        async fetchComments(uuid) {
            this.comments = []
            try {
                this.comments = await fetchWrapper.get(`http://localhost:3000/api/post/${uuid}/comments/`).then((response) => {
                    return response.reverse()
                })
            } catch (error) {
                this.error = error
            }
        },

        async sendComment(uuid, formData) {
            this.commentData = null
            try {
                this.commentData = await fetchWrapper.post(`http://localhost:3000/api/post/${uuid}/comments`, formData)
            } catch (error) {
                this.error = error
            }
        },

        async deleteComment(uuid, id) {
            try {
                await fetchWrapper.delete(`http://localhost:3000/api/post/${uuid}/comments/${id}`)

                console.log(this.comments)
            } catch (error) {
                this.error = error
            }
            this.comments = this.comments.filter(comment => comment.id != id)
        }
    }
})