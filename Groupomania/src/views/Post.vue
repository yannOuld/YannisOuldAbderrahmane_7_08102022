<template>
  <div>
    <navigation-links></navigation-links>

    <main class="container">
      <!-- Post component -->
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

      <div class="post-utils" v-if="user?.uuid == post?.owner.uuid">
        <!--show modifyPost form button -->
        <button
          v-if="mode.state == 'read'"
          @click="switchModify()"
          class="modify"
          aria-label="modifier"
        >
          <span class="btn-txt"> modifier le post </span>
          <font-awesome-icon icon="fa-solid fa-pen-to-square" />
        </button>

        <!-- Hide modifyPost form button -->
        <button
          v-if="mode.state == 'modify'"
          @click="switchRead()"
          class="modify"
          aria-label="retour modifications"
        >
          fermer
        </button>

        <!-- delete post button -->
        <button @click="suppPost()" class="delete" aria-label="supprimer">
          <span class="btn-txt"> supprimer le post </span>
          <font-awesome-icon icon="fa-solid fa-circle-xmark" />
        </button>
      </div>
      <!-- like component -->

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
  @apply rounded-lg mx-auto my-5 w-3/4 p-4 flex flex-row justify-evenly items-center bg-slate-600 bg-opacity-80 shadow-md shadow-black;
}

.delete,
.modify {
  @apply flex cursor-pointer border-transparent justify-center  bg-white w-6 sm:w-60 h-4 text-base items-center;
}

.btn-txt {
  @apply hidden sm:flex sm:flex-row sm:mr-2;
}
.delete {
  @apply text-red-600;
}
</style>
