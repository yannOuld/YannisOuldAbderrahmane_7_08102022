<template>
  <article class="comment">
    <div class="comment-user">
      <img
        v-if="comment?.owner.imageUrl == null"
        src="../../assets/images/icon.webP"
        alt="image de l'auteur"
        class="comment-user_img"
      />
      <img
        v-if="comment.owner.imageUrl != null"
        :src="comment.owner.imageUrl"
        alt="image de l'auteur"
        class="comment-user_img"
      />
      <h2 class="comment-user_name">
        {{ comment?.owner.firstName }} {{ comment?.owner.lastName }}
      </h2>
    </div>
    <p class="comment_content">{{ comment?.content }}</p>
    <p class="comment_date">{{ comment?.createdAt }}</p>
    <div v-if="(comment.owner.uuid = user.uuid || user.role != 'user')">
      <button
        class="comment-btn_delete hover:brightness-50"
        @click="suppComment().then(emitCommentId(comment.id))"
      >
        <font-awesome-icon icon="fa-solid fa-circle-xmark" />
      </button>
    </div>
  </article>
</template>

<script setup>
import { useAuthStore } from "../../stores/auth";
import { useCommentStore } from "../../stores/comment";
import { defineEmits, defineProps } from "vue";

const props = defineProps({
  comment: { type: Object },
});

const emit = defineEmits(["onDelete"]);

const comment = props.comment;
const uuid = comment.uuid;
const id = comment.id;

const { userData } = useAuthStore();
const { user } = userData;

const { deleteComment } = useCommentStore();

const suppComment = async (uuid, user) => {
  try {
    await deleteComment(uuid, id);
  } catch (err) {
    console.log(err);
  }
};

const emitCommentId = () => {
  emit("onDelete", comment.id);
};
</script>
