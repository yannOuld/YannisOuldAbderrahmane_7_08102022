<template>
  <div class="postcard-container">
    <div class="postcard-date">
      <p class="postcard-date_txt" aria-labelledby="date">{{ createdAt }}</p>
    </div>
    <div class="postcard" @click="postPage()">
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
          {{ owner?.firstName }} {{ owner?.lastName }}
        </p>
      </div>
      <h2 class="postcard-title">{{ title }}</h2>
      <div v-if="imageUrl">
        <img :src="imageUrl" alt="image du post" class="postcard-img" />
      </div>
      <div>
        <p>{{ content }}</p>
      </div>
      <p class="postcard-likes_counter">likes: {{ likesCounter }}</p>
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
  update: { type: Number },
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
