<script setup>
  import { useRouter } from "vue-router";
  import { ref } from "vue";
  import { useAuthStore } from "../../stores/auth";
  import { usePostStore } from "../../stores/posts";

  //parent props
  const props = defineProps({
    update: { type: Number },
    uuid: { type: String },
    owner: { type: Object },
    title: { type: String },
    content: { type: String },
    imageUrl: { type: String },
    likesCounter: { type: Number },
    createdAt: { type: String },
  });

  //user uuid data
  const { userData } = useAuthStore();
  const { user } = userData;
  let identification = ref(null);
  identification.value = user.uuid;

  // call router
  const router = useRouter();

  // router link

  const postPage = `/post/${props.uuid}`;

  // call post store
  const { deletePost } = usePostStore();

  // delete post function
  async function deleteOnePost(uuid) {
    return await deletePost(uuid);
  }
</script>

<template>
  <div class="postcard-container">
    <p class="postcard-date">
      {{ createdAt }}
    </p>
    <div>
      <div class="postcard-user">
        <img
          v-if="owner?.imageUrl == null"
          src="../../assets/images/icon.webP"
          alt="image de l'auteur"
          class="postcard-user_img"
        />
        <img
          v-if="owner?.imageUrl != null"
          :src="owner.imageUrl"
          alt="image de l'auteur"
          class="postcard-user_img"
        />
        <p class="postcard-user_name">
          <router-link :to="`/profil/${owner?.uuid}`">
            {{ owner?.firstName }} {{ owner?.lastName }}
          </router-link>
        </p>
      </div>
      <router-link class="no-decoration mt-12 w-full" :to="postPage">
        <h2 class="postcard-title">{{ title }}</h2>
        <div>
          <p>{{ content }}</p>
        </div>
        <div v-if="imageUrl">
          <img :src="imageUrl" alt="image du post" class="postcard-img" />
        </div>
        <p class="postcard-likes_counter">likes: {{ likesCounter }}</p>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
  .postcard-container {
    @apply sm:w-3/4 my-10 p-4 mb-8 bg-white border-black border-solid border-2 relative rounded-lg;
  }
  .postcard {
    @apply cursor-pointer    p-4 w-56 h-96 sm:w-11/12 sm:h-fit   my-0 sm:my-3;
  }
  .postcard-title {
    @apply my-0  sm:mt-8 mb-5;
  }
  .postcard-img {
    @apply object-fill mb-3 border-black w-full h-64 sm:w-full sm:h-72 md:w-[400px] md:h-[400px];
  }
  .postcard-user {
    @apply justify-start sm:mt-4  mb-2 h-14 absolute top-4 left-4 flex-row;
  }
  .postcard-user_name {
    @apply text-sm  sm:text-base;
  }
  .postcard-user_img {
    @apply w-8 h-8 sm:w-20 sm:h-20 border-solid border-4 border-red-400 rounded-full mx-2;
  }
  .postcard-date {
    @apply absolute -top-6 right-4 w-72 font-bold text-right;
  }
  .postcard-date_txt {
    @apply w-32 sm:w-1/3 text-right;
  }
  .postcard-likes_counter {
    @apply w-20  bottom-0 right-3 text-right font-bold absolute;
  }
</style>
