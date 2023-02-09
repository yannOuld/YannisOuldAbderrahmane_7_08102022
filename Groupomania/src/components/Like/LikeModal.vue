<template>
  <div class="relative">
    <div class="likes flex-row">
      <button
        class="likes-btn_show hover:-translate-y-1 hover:scale-90 hover:bg-gray-300 duration-300"
        @click="isOpen = true"
      >
        Likes utilisateurs
      </button>
      <div
        class="text-xl hover:-translate-y-1 hover:scale-125 duration-300"
        @click="sendLike().then($emit('onLiked'))"
      >
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

<script setup>
  import { storeToRefs } from "pinia";
  import { ref, defineProps, onMounted, watchEffect } from "vue";
  import { useLikeStore } from "../../stores/like";

  const emit = defineEmits(["onLiked"]);

  // props from parent component
  const props = defineProps({
    uuid: {
      type: String,
      required: true,
    },
    user_id: {
      type: Number,
      required: true,
    },
  });

  // ref for the modal open and quit
  const isOpen = ref(false);

  // like store
  const { getLikes, LikePost, findLike } = useLikeStore();

  // getting users who liked the post
  onMounted(() => {
    getLikes(props.uuid);
  });

  const { likes } = storeToRefs(useLikeStore());

  const data = {
    user_id: props.user_id,
  };

  //sending a like
  const sendLike = async () => {
    await LikePost(props.uuid, data);
  };
  const userLiked = () => {
    const liked = likes.value.find((like) => like.user_id == props.user_id);
    if (liked != undefined) return true;
  };
  watchEffect(() => {
    userLiked;
  });
</script>
