<template>
  <div class="container">
    <div>
      <p class="date" aria-labelledby="date">{{ createdAt }}</p>
    </div>
    <div class="post" @click="postPage()">
      <div class="user">
        <img
          v-if="owner?.imageUrl == null"
          src="../../assets/images/icon.webP"
          alt="image de l'auteur"
          class="user-img"
        />
        <img
          v-if="owner?.imageUrl != null"
          :src="owner.imageUrl"
          alt="image de l'auteur"
          class="user-img"
        />
        <p class="post-owner">{{ owner?.firstName }} {{ owner?.lastName }}</p>
      </div>
      <h2 class="post-title">{{ title }}</h2>
      <div v-if="imageUrl">
        <img :src="imageUrl" alt="image du post" class="post-img" />
      </div>
      <div>
        <p>{{ content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, defineProps } from "vue";
import { useAuthStore } from "../../stores/auth";
import { usePostStore } from "../../stores/posts";

//parent props
const props = defineProps({
  uuid: { type: String, required: true },
  owner: { type: Object, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String, required: true },
  likesCounter: { type: Number, required: true },
  createdAt: { type: String, required: true },
});

//user uuid data
const { userData } = useAuthStore();
const { user } = userData;
let identification = ref(null);
identification.value = user.uuid;

// call router
const router = useRouter();

// router link
const postPage = () => {
  router.push({
    name: "PostView",
    params: { uuid: props.uuid },
  });
};

// call post store
const { deletePost } = usePostStore();

// delete post function
const deleteOnePost = async (uuid) => {
  return await deletePost(uuid);
};
</script>

<style scoped>
.container {
  @apply bg-red-300 relative rounded-lg p-4 my-8 w-9/12 shadow-lg shadow-red-900;
}
.post {
  @apply cursor-pointer bg-white relative flex flex-col items-center rounded p-4 w-10/12 mx-auto my-3;
}
.post-title {
  @apply mx-auto mt-8 mb-5 sm:mt-20;
}
.post-img {
  @apply object-fill border-black w-40 h-40 sm:w-72 sm:h-72 md:w-96 md:h-72;
}
.user {
  @apply flex absolute left-5 top-2 sm:top-8 h-14 items-center;
}
.post-owner {
  @apply text-sm flex items-center sm:text-base;
}
.user-img {
  @apply w-8 h-8 sm:w-20 sm:h-20 border-solid border-4 border-red-400 rounded-full mr-2;
}
.delete,
.likes {
  @apply cursor-pointer rounded-full py-1 px-2;
}
.delete {
  @apply text-red-600 absolute top-7 right-9 bg-white border-solid border-white;
}

.likes {
  @apply text-black bg-transparent border-solid border-black text-lg my-0 mx-3;
}
.utils {
  @apply absolute bottom-5 right-7;
}
.date {
  @apply w-1/3 font-bold py-0 px-1 rounded bg-white;
}
</style>
