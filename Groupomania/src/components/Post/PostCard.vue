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
    commentsCounter: { type: Number },
    createdAt: { type: String },
  });

  //user uuid data
  const { userData } = useAuthStore();
  const { user } = userData;

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
  <div class="postcard-container limit">
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
      <router-link class="no-decoration w-full postcard-a" :to="postPage">
        <h2 class="postcard-title">{{ title }}</h2>
        <div>
          <p>{{ content }}</p>
        </div>
        <div class="w-full" v-if="imageUrl">
          <img :src="imageUrl" alt="image du post" class="postcard-img" />
        </div>
      </router-link>

      <div class="postcard-likes_counter flex">
        <p>
          commentaires
          <font-awesome-icon icon="fa-solid fa-comments" />
          {{ commentsCounter }}
          &nbsp; likes
          <font-awesome-icon icon="fa-solid fa-thumbs-up" />
          {{ likesCounter }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .postcard-container {
    @apply h-[420px] sm:h-[470px] md:h-[570px] lg:h-[600px]  my-2 bg-white border-black border-solid border-2 relative rounded-lg;
  }
  .postcard-a {
    @apply absolute right-0 left-0 bottom-6;
  }
  .postcard {
    @apply cursor-pointer    p-4 w-56 h-96 sm:w-11/12 sm:h-fit   my-0 sm:my-3;
  }
  .postcard-title {
    @apply my-0  sm:mt-8 mb-1;
  }
  .postcard-img {
    @apply object-fill mb-3 border-black w-full h-64 sm:h-72 md:h-[400px];
  }
  .postcard-user {
    @apply justify-start sm:mt-4  mb-2 h-14 absolute top-4 left-4 flex-row;
  }
  .postcard-user_name {
    @apply text-sm  sm:text-base;
  }
  .postcard-user_img {
    @apply w-10 h-10 sm:w-20 sm:h-20 border-solid border-4 border-red-400 rounded-full mx-2;
  }
  .postcard-date {
    @apply absolute top-1 right-4 w-72 font-bold text-right;
  }
  .postcard-date_txt {
    @apply w-32 sm:w-1/3 text-right;
  }
  .postcard-likes_counter {
    @apply flex w-60 bottom-0 right-2 text-right font-bold absolute;
  }
</style>
