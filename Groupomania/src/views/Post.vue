<template>
  <div>
    <header class="navigation">
      <navigation-links></navigation-links>
    </header>
    <main class="container">
      <post-card
        :uuid="post?.uuid"
        :content="post?.content"
        :title="post?.title"
        :owner="post?.owner"
        :imageUrl="post?.imageUrl"
        :createdAt="post?.createdAt"
        :likesCounter="post?.likesCounter"
      />
      <div class="post-utils" v-if="user?.uuid == post?.owner.uuid">
        <button
          v-if="mode.state == 'read'"
          @click="switchModify()"
          class="modify"
          aria-label="modifier"
        >
          <span class="btn-txt"> modifier le post </span>
          <font-awesome-icon icon="fa-solid fa-pen-to-square" />
        </button>
        <button @click="suppPost()" class="delete" aria-label="supprimer">
          <span class="btn-txt"> supprimer le post </span>
          <font-awesome-icon icon="fa-solid fa-circle-xmark" />
        </button>

        <button
          v-if="mode.state == 'modify'"
          @click="switchRead()"
          class="modify"
          aria-label="retour modifications"
        >
          <font-awesome-icon icon="fa-solid fa-pen-to-square" />
        </button>
        <like-modal :uuid="post?.uuid" :user_id="user?.id" />
      </div>

      <div v-if="mode.state == 'modify'">
        <post-modify :uuid="uuid" />
      </div>
    </main>
    <comment-form />
    <comments-wrapper />
  </div>
</template>

<script>
import router from "../router/index.js";
import PostCard from "../components/Post/PostCard.vue";
import PostModify from "../components/Post/PostModify.vue";
import { useRoute } from "vue-router";
import { reactive, defineAsyncComponent } from "vue";
import { storeToRefs } from "pinia";
import { usePostStore } from "../stores/posts";
import { useAuthStore } from "../stores/auth";

export default {
  name: "PostView",
  components: {
    PostCard,
    LikeModal: defineAsyncComponent({
      loader: () => import("../components/Like/LikeModal.vue"),
      delay: 1000,
    }),
    PostModify,
  },

  setup() {
    // post uuid from the params
    const route = useRoute();
    const uuid = route.params.uuid;

    console.log(uuid);

    // fetch and find post data from the store
    const { fetchOnePost, deletePost } = usePostStore();
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

    const suppPost = async () => {
      await deletePost(uuid).then(router.replace("/home"));
    };

    return {
      mode,
      user,
      uuid,
      post,
      switchModify,
      switchRead,
      suppPost,
    };
  },
};
</script>

<style scoped>
.post-utils {
  @apply bg-red-600 rounded-lg mx-auto my-5 w-3/4 flex flex-row justify-evenly items-center;
}

.delete,
.modify {
  @apply cursor-pointer border-transparent text-lg bg-white;
}

.btn-txt {
  @apply hidden sm:flex sm:flex-row;
}
.delete {
  @apply text-red-600;
}
</style>
