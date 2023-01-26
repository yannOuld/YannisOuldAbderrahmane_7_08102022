<template>
  <div>
    <header class="navigation">
      <navigation-links></navigation-links>
    </header>

    <main class="container">
      <div v-if="user?.uuid == post?.owner.uuid">
        <button class="delete" aria-label="supprimer">
          <font-awesome-icon icon="fa-solid fa-circle-xmark" />
        </button>
        <button
          v-if="mode.state == 'read'"
          @click="switchModify()"
          class="modify"
          aria-label="modifier"
        >
          <font-awesome-icon icon="fa-solid fa-pen-to-square" />
        </button>
        <button
          v-if="mode.state == 'modify'"
          @click="switchRead()"
          class="modify"
          aria-label="retour modifications"
        >
          <font-awesome-icon icon="fa-solid fa-pen-to-square" />
        </button>
      </div>
      <post-card
        :uuid="post?.uuid"
        :content="post?.content"
        :title="post?.title"
        :owner="post?.owner"
        :imageUrl="post?.imageUrl"
        :createdAt="post?.createdAt"
        :likesCounter="post?.likesCounter"
      />
      <like-modal :uuid="post?.uuid" :user_id="user?.id" />

      <div v-if="mode.state == 'modify'">
        <post-modify :uuid="uuid" />
      </div>
      <comment-form />
    </main>
    <comments />
  </div>
</template>

<script>
import Comments from "../components/Comment/Comments.vue";
import CommentForm from "../components/Comment/CommentForm.vue";
import PostModify from "../components/Post/PostModify.vue";
import { useRoute } from "vue-router";
import { reactive, defineAsyncComponent } from "vue";
import { storeToRefs } from "pinia";
import { usePostStore } from "../stores/posts";
import { useAuthStore } from "../stores/auth";

export default {
  name: "PostView",
  components: {
    PostCard: defineAsyncComponent({
      loader: () => import("../components/Post/PostCard.vue"),
      delay: 1000,
    }),
    LikeModal: defineAsyncComponent({
      loader: () => import("../components/Like/LikeModal.vue"),
      delay: 1000,
    }),
    Comments,
    CommentForm,
    PostModify,
  },

  setup() {
    // post uuid from the params
    const route = useRoute();
    const uuid = route.params.uuid;

    // fetch and find post data from the store
    const { fetchOnePost } = usePostStore();
    fetchOnePost(uuid);
    const { post } = storeToRefs(usePostStore());
    console.log(post);

    // finding user data
    const { userData } = useAuthStore();
    const { user } = userData;

    // reactive mode
    const mode = reactive({
      state: "read" || "modify",
    });

    // function for mode read
    const switchRead = () => {
      mode.state = "read";
    };

    // function for mode modify
    const switchModify = () => {
      mode.state = "modify";
    };

    return {
      user,
      uuid,
      post,
      switchModify,
      switchRead,
      mode,
    };
  },
};
</script>

<style scoped>
.navigation {
  width: 100%;
  display: flex;
  justify-content: center;
}
.container {
  background-color: #faa1a1;
  position: relative;
  border-radius: 15px;
  padding: 10px;
  margin: 20px 0;
}
.post {
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70vw;
  border-radius: 15px;
  padding: 10px;
  margin: 10px auto;
}
.likes {
  cursor: pointer;
  background: #310e96;
  color: white;
  font-size: 15px;
}
.delete,
.modify {
  cursor: pointer;
  position: absolute;
  font-size: 25px;
  right: 20px;
  background-color: white;
}
.delete {
  border: white 1px solid;
  color: red;
  top: 20px;
}
.modify {
  border: transparent;
  color: #4e5166;
  top: 80px;
}
.image {
  width: 300px;
}
.form {
  color: white;
  background-color: #4e5166;
  display: flex;
  flex-direction: column;
  border-radius: 25px;
  padding: 20px;
}
.form-control {
  margin: 10px;
}
.form-control > input {
  margin-left: 15px;
}
.form-content {
  flex-direction: column;
}
.form-btn {
  width: 150px;
  margin: auto;
}
</style>
