<script setup>
  import imgUrl from "../../assets/images/icon.webp";
  import { useAuthStore } from "../../stores/auth";
  import { useCommentStore } from "../../stores/comment";
  import { storeToRefs } from "pinia";

  const props = defineProps({
    comment: { type: Object },
    owner: { type: Object },
  });

  const comment = props.comment;
  const owner = props.owner;
  const uuid = comment.uuid;
  const id = comment.id;

  const { userData, authAdmin } = useAuthStore();
  const { user } = userData;

  const { deleteComment } = useCommentStore();

  async function suppComment(uuid, user) {
    await deleteComment(uuid, id).catch((err) => console.log(err));
  }
</script>

<template>
  <div class="comment limit">
    <div class="comment-user">
      <img
        :src="owner.imageUrl ? owner.imageUrl : imgUrl"
        alt="image de l'auteur"
        class="comment-user_img"
      />
      <h2 class="comment-user_name">
        {{ owner.firstName }} {{ owner.lastName }}
      </h2>
    </div>
    <p class="comment_content">{{ comment.content }}</p>
    <p class="comment_date">{{ comment.createdAt }}</p>
    <div v-if="(owner.uuid = user.uuid || authAdmin == true)">
      <button class="comment-btn_delete" @click="suppComment()">
        supprimer &nbsp; <font-awesome-icon icon="fa-solid fa-circle-xmark" />
      </button>
    </div>
  </div>
</template>

<style scoped>
  .comment {
    @apply my-2 p-4 rounded-3xl bg-tertiarygroup  relative;
  }
  .comment-user {
    @apply mb-1 justify-start text-base text-left flex-row font-bold;
  }
  .comment-user_img {
    @apply m-0 block w-20 rounded-full border-solid border-black border-4;
  }
  .comment-user_name {
    @apply ml-2 text-lg text-white;
  }
  .comment_date {
    @apply w-1/3 m-2 p-1 self-end text-center font-bold;
  }
  .comment-btn_delete {
    @apply bg-white text-red-600 py-1 px-2 rounded-full top-2 right-2 absolute hover:brightness-50;
  }
  .comment_content {
    @apply w-full;
  }
</style>
