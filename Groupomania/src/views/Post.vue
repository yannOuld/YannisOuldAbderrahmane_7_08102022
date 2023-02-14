<script>
  import { useRoute } from "vue-router";
  import { ref, defineAsyncComponent } from "vue";
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

      PostUtils: defineAsyncComponent({
        loader: () => import("../components/Post/PostUtils.vue"),
        delay: 1000,
      }),
      Comments: defineAsyncComponent({
        loader: () => import("../components/Layout/Comments.vue"),
        delay: 1000,
      }),
    },

    setup() {
      const update = ref(0);
      const forceUpdate = ref(0);

      // post uuid from the params
      const route = useRoute();
      const uuid = route.params.uuid;

      // fetch and find post data from the store
      const { fetchOnePost } = usePostStore();
      fetchOnePost(uuid);
      const { post } = storeToRefs(usePostStore());

      // finding user data
      const { userData } = useAuthStore();
      const { user } = userData;

      const updateComments = () => {
        forceUpdate.value += 1;
      };

      const updatePost = () => {
        update.value += 1;
      };
      return {
        user,
        uuid,
        post,
        update,
        forceUpdate,
        updatePost,
        updateComments,
      };
    },
  };
</script>
<template>
  <div class="post w-full">
    <navigation-links></navigation-links>
    <div>
      <!-- Post component -->
      <post-card
        :key="update"
        :uuid="post?.uuid"
        :content="post?.content"
        :title="post?.title"
        :owner="post?.owner"
        :imageUrl="post?.imageUrl"
        :createdAt="post?.createdAt"
        :likesCounter="post?.likesCounter"
      />
      <!-- like component -->
      <like-modal
        @onLiked="updatePost"
        :uuid="post?.uuid"
        :user_id="user?.id"
      />
      <post-utils v-if="user?.uuid == post?.owner.uuid" />
    </div>
    <comment-form @onCommentSubmit="updateComments" />
    <comments :key="forceUpdate" />
  </div>
</template>
