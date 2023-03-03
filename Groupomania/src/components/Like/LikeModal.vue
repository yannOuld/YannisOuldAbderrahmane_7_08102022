<script setup>
  import { storeToRefs } from "pinia";
  import { ref, watchEffect } from "vue";
  import { usePostStore } from "../../stores/posts.js";

  const emit = defineEmits(["onLiked"]);

  const props = defineProps({
    uuid: {
      type: String,
    },
    user_id: {
      type: Number,
    },
  });

  const isOpen = ref(false);

  const { getLikes, likePost, likeState } = usePostStore();
  getLikes(props.uuid, props.user_id);
  likeState(props.uuid);

  const { likes, like, liked } = storeToRefs(usePostStore());

  const data = {
    user_id: props.user_id,
  };

  async function sendLike() {
    await likePost(props.uuid, data);
    if (liked.value == false) {
      return (liked.value = true);
    } else if (liked.value == true) {
      return (liked.value = false);
    }
  }

  watchEffect(() => {
    liked;
  });
</script>

<template>
  <div class="limit relative">
    <div class="likes">
      <button class="likes-btn_show" @click="isOpen = true">
        Likes utilisateurs
      </button>
      <div class="likes_heart" @click="sendLike().then($emit('onLiked'))">
        <span :class="{ liked: !!liked }">
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
