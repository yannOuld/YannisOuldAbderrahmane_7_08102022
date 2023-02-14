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
  const deleteOnePost = async (uuid) => {
    return await deletePost(uuid);
  };
</script>

<template>
  <div class="postcard-container relative rounded-lg">
    <div class="postcard-date">
      <p class="postcard-date_txt font-bold" aria-labelledby="date">
        {{ createdAt }}
      </p>
    </div>
    <div class="postcard relative">
      <div class="postcard-user flex-row">
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
          {{ owner?.firstName }} {{ owner?.lastName }}
        </p>
      </div>
      <router-link class="no-decoration" :to="postPage">
        <h2 class="postcard-title">{{ title }}</h2>
        <div v-if="imageUrl">
          <img :src="imageUrl" alt="image du post" class="postcard-img" />
        </div>
        <div>
          <p>{{ content }}</p>
        </div>
        <p class="postcard-likes_counter font-bold absolute">
          likes: {{ likesCounter }}
        </p>
      </router-link>
    </div>
  </div>
</template>
