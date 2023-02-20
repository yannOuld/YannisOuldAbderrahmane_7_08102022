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
  <article class="comment relative">
    <div class="comment-user font-bold">
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
    <p class="comment_date font-bold">{{ comment.createdAt }}</p>
    <div v-if="(owner.uuid = user.uuid || authAdmin == true)">
      <button
        class="comment-btn_delete absolute hover:brightness-50"
        @click="suppComment()"
      >
        <font-awesome-icon icon="fa-solid fa-circle-xmark" />
      </button>
    </div>
  </article>
</template>
