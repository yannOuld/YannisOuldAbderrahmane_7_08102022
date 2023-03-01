<script setup>
  import { storeToRefs } from "pinia";
  import { ref, watchEffect } from "vue";
  import { usePostStore } from "../../stores/posts.js";

  const emit = defineEmits(["onLiked"]);

  // props from parent component
  const props = defineProps({
    uuid: {
      type: String,
    },
    user_id: {
      type: Number,
    },
  });

  // ref for the modal open and quit
  const isOpen = ref(false);

  // like store
  const { getLikes, likePost } = usePostStore();

  // getting users who liked the post
  getLikes(props.uuid);

  const { likes, like } = storeToRefs(usePostStore());

  const data = {
    user_id: props.user_id,
  };

  //sending a like
  async function sendLike() {
    await likePost(props.uuid, data);
  }
  function userLiked() {
    if (like.value == 1) return true;
  }
  watchEffect(() => {
    userLiked;
  });
</script>

<template>
  <div class="limit relative">
    <div class="likes">
      <button class="likes-btn_show" @click="isOpen = true">
        Likes utilisateurs
      </button>
      <div class="likes_heart" @click="sendLike().then($emit('onLiked'))">
        <span :class="{ liked: userLiked() }">
          <font-awesome-icon icon="fa-solid fa-heart" />
        </span>
      </div>
    </div>
    <teleport to="body">
      <div class="likes-modal_bg" v-if="isOpen">
        <div class="likes-modal_content">
          <h2>Personnes qui ont aimés le post.</h2>
          <div v-for="like in likes" :key="like">
            <p>{{ like.user.firstName }} {{ like.user.lastName }}</p>
          </div>
          <button class="likes-modal--link" @click="isOpen = false">
            quitter
          </button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<style scoped>
  .liked {
    @apply text-red-600;
  }
  .likes_heart {
    @apply text-gray-400 w-5 text-xl hover:-translate-y-1 hover:scale-125 duration-300;
  }
  .likes-modal_bg {
    @apply top-0 left-0 right-0 bottom-0 w-screen fixed h-screen bg-slate-400 bg-opacity-50;
  }
  .likes-modal_content {
    @apply bg-white p-12 rounded-xl blur-0 w-1/2;
  }
  .likes-modal_link {
    @apply w-36;
  }
  .likes {
    @apply flex-row w-full justify-between;
  }
  .likes-btn_show {
    @apply w-[250px] flex justify-center items-center hover:-translate-y-1 hover:scale-90 hover:bg-gray-300 duration-300;
  }
</style>
