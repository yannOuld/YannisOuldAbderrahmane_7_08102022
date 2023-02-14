<script setup>
  import router from "../../router/index";
  import { reactive } from "vue";
  import { useRoute } from "vue-router";
  import PostModify from "./PostModify.vue";
  import { usePostStore } from "../../stores/posts";
  import { useAuthStore } from "../../stores/auth";

  // reactive mode
  const mode = reactive({
    state: "read" || "modify",
  });

  // post uuid from the params
  const route = useRoute();
  const uuid = route.params.uuid;

  // finding user data
  const { userData } = useAuthStore();
  const { user } = userData;

  const { post, deletePost } = usePostStore();

  // function for mode read
  const switchRead = () => {
    mode.state = "read";
  };

  // function for mode modify
  const switchModify = () => {
    mode.state = "modify";
  };
  // delete post and move to home component
  const suppPost = async () => {
    await deletePost(uuid).then(router.replace("/"));
  };
</script>

<template>
  <div>
    <div v-if="mode.state == 'modify'">
      <post-modify :uuid="uuid" />
    </div>
    <div class="post-utils">
      <!--show modifyPost form button -->
      <button
        v-if="mode.state == 'read'"
        @click="switchModify()"
        class="post-btn_modify"
        aria-label="modifier"
      >
        modifier
        <span class="post-btn_icon">
          <font-awesome-icon icon="fa-solid fa-pen-to-square" />
        </span>
      </button>

      <!-- Hide modifyPost form button -->
      <button
        v-if="mode.state == 'modify'"
        @click="switchRead()"
        class="post-btn_modify"
        aria-label="retour modifications"
      >
        fermer
      </button>

      <!-- delete post button -->
      <button
        @click="suppPost()"
        class="post-btn_delete"
        aria-label="supprimer"
      >
        supprimer
        <span class="post-btn_icon">
          <font-awesome-icon icon="fa-solid fa-circle-xmark" />
        </span>
      </button>
    </div>
  </div>
</template>
