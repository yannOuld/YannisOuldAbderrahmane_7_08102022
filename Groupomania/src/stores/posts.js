import { ref } from "vue";
import { defineStore } from "pinia";
import { fetchWrapper } from "../utils/fetchWrapp";


export const usePostStore = defineStore("post", () => {
  const posts = ref([]);
  const post = ref(null);
  const likes = ref([]);
  const like = ref(null);
  const liked = ref(false)

  function postsNumber() {
    return posts.length;
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
  async function fetchOnePost(uuid) {
    post.value = null;
    post.value = await fetchWrapper
      .get(`http://localhost:3000/api/post/${uuid}`)
      .catch((err) => console.log(err.message));
  }
  async function sendPost(formData) {
    post.value = null;
    post.value = await fetchWrapper
      .postfile("http://localhost:3000/api/post/", formData)
      .catch((err) => console.log(err.message));
    posts.value.unshift(post.value);
  }
  async function deletePost(uuid) {
    await fetchWrapper
      .delete(`http://localhost:3000/api/post/${uuid}`)
      .catch((err) => console.log(err.message));
    posts.value = posts.value.filter((p) => {
      return p.uuid !== uuid;
    });
  }
  async function modifyPost(uuid, formData) {
    post.value = await fetchWrapper
      .patch(`http://localhost:3000/api/post/${uuid}`, formData)
      .catch((err) => console.log(err.message));
  }
  async function likePost(uuid, user_id) {
    like.value = await fetchWrapper
      .post(`http://localhost:3000/api/post/${uuid}/likes`, user_id)
      .catch((err) => console.log(err.message));
    post.value.likesCounter = post.value.likesCounter + like.value;
  }

  async function likeState(uuid) {
    liked.value = await fetchWrapper
      .get(`http://localhost:3000/api/post/${uuid}/like`)
      .catch((err) => console.log(err.message));
  }

  async function getLikes(uuid) {
    likes.value = await fetchWrapper
      .get(`http://localhost:3000/api/post/${uuid}/likes`)
      .catch((err) => console.log(err.message));
  }

  return {
    posts,
    post,
    postsNumber,
    sendPost,
    deletePost,
    modifyPost,
    fetchOnePost,
    fetchPosts,
    likePost,
    getLikes,
    likeState,
    like,
    liked,
    likes,
  };
});
