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
          :src="owner?.imageUrl"
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
