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
