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
        supprimer &nbsp; <font-awesome-icon icon="fa-solid fa-circle-xmark" />
      </button>
    </div>
  </div>
</template>
