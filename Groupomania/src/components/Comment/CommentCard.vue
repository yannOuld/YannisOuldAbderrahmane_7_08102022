<script setup>
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
  <article class="comment">
    <div class="comment-user">
      <img
        v-if="owner.imageUrl == null"
        src="../../assets/images/icon.webP"
        alt="image de l'auteur"
        class="comment-user_img"
      />
      <img
        v-if="owner.imageUrl != null"
        :src="owner.imageUrl"
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
        <font-awesome-icon icon="fa-solid fa-circle-xmark" />
      </button>
    </div>
  </article>
</template>

<style scoped>
  .comment {
    @apply w-3/4 my-2 p-4 rounded-3xl bg-tertiarygroup relative;
  }
  .comment-user {
    @apply text-base text-left flex-row font-bold;
  }
  .comment-user_img {
    @apply w-20 rounded-full border-solid border-black border-4 mr-1;
  }
  .comment-user_name {
    @apply text-lg text-white;
  }
  .comment_date {
    @apply w-1/3  m-0 self-end text-center font-bold;
  }
  .comment-btn_delete {
    @apply bg-white  py-1 px-2 rounded-full top-2 right-2 absolute hover:brightness-50;
  }
</style>
