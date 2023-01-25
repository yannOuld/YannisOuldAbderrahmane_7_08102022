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
      <h2 class="author">
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
  width: 50vw;
  border-radius: 25px;
  margin: 10px auto;
  background: #4e5166;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 15px;
}
.user {
  font-weight: 700;
  font-size: 15px;
  text-align: left;
  display: flex;
}
.user-img {
  width: 75px;
  width: 75px;
  border-radius: 50px;
  border: 5px solid black;
  margin-right: 5px;
}
.author {
  font-size: 18px;
  color: white;
}
.content,
.date {
  background: white;
  border-radius: 15px;
  padding: 20px;
}
.delete-btn {
  position: absolute;
  background: white;
  color: red;
  padding: 5px 6px;
  border-radius: 50px;
  top: 10px;
  right: 10px;
  text-shadow: black;
  cursor: pointer;
}
.delete-btn:hover {
  filter: brightness(0.5);
}
.date {
  width: 200px;
  margin: 0;
  padding: 10px 7px;
  height: 10px;
  align-self: flex-end;
  font-weight: 600;
  text-align: center;
}
</style>
