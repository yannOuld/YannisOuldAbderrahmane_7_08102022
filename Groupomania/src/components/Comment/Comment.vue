<template>
  <article class="comment">
    <div class="user">
      <img
        v-if="comment?.owner.imageUrl == null"
        src="../../assets/images/icon.webP"
        alt="image de l'auteur"
        class="user-img"
      />
      <img
        v-if="comment.owner.imageUrl != null"
        :src="comment.owner.imageUrl"
        alt="image de l'auteur"
        class="user-img"
      />
      <h2 class="owner">
        {{ comment?.owner.firstName }} {{ comment?.owner.lastName }}
      </h2>
    </div>
    <p class="content">{{ comment?.content }}</p>
    <p class="date">{{ comment?.createdAt }}</p>
    <div v-if="(comment.owner.uuid = user.uuid)">
      <button class="delete-btn" @click="suppComment()">
        <font-awesome-icon icon="fa-solid fa-circle-xmark" />
      </button>
    </div>
  </article>
</template>

<script>
import { useAuthStore } from "../../stores/auth";
import { useCommentStore } from "../../stores/comment";

export default {
  name: "CommentCard",
  props: {
    comment: Object,
  },
  setup(props) {
    const { comment } = props;
    const uuid = comment.uuid;

    const { userData } = useAuthStore();
    const { user } = userData;
    const { deleteComment } = useCommentStore();

    const suppComment = async (uuid, user) => {
      const id = user.id;
      try {
        await deleteComment(uuid, id);
      } catch (err) {
        console.log(err);
      }
    };

    return {
      user,
      suppComment,
    };
  },
};
</script>

<style scoped>
.comment {
  @apply w-3/4 mx-auto my-2 rounded-3xl relative bg-gray-700 flex flex-col p-4;
}
.user {
  @apply font-bold text-base text-left flex;
}
.user-img {
  @apply w-20 rounded-full border-solid border-black border-4 mr-1;
}
.owner {
  @apply text-lg text-white;
}
.content,
.date {
  @apply bg-white rounded-2xl p-5;
}
.delete-btn {
  @apply absolute bg-white text-red-600 py-1 px-2 rounded-full top-2 right-2 cursor-pointer hover:brightness-50;
}
.date {
  @apply w-1/3 font-bold m-0 self-end text-center;
}
</style>
