<template>
  <div class="relative">
    <div class="likes">
      <button class="likes--show" @click="isOpen = true">
        Likes utilisateurs
      </button>
      <div class="likes--btn" @click="sendLike">
        <p>
          cliquez ici pour liker !
          <font-awesome-icon icon="fa-solid fa-heart" />
        </p>
      </div>
    </div>
    <teleport to="body">
      <div class="modal" v-if="isOpen">
        <div class="modal--content">
          <h2>Personnes qui ont aimés le post.</h2>
          <div v-for="like in likes" :key="like">
            <p>{{ like.user.firstName }} {{ like.user.lastName }}</p>
          </div>
          <button class="modal--btn" @click="isOpen = false">quitter</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref, defineProps, onMounted } from "vue";
import { useLikeStore } from "../../stores/like";

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

console.log(props.user_id);

// ref for the modal open and quit
const isOpen = ref(false);

// like store
const { getLikes, LikePost } = useLikeStore();

// getting users who liked the post
onMounted(() => {
  getLikes(props.uuid);
});

const { likes } = storeToRefs(useLikeStore());
console.log(likes.value);

const data = {
  user_id: props.user_id,
};

//sending a like
const sendLike = async () => {
  await LikePost(props.uuid, data);
};
</script>

<style scoped>
.modal {
  @apply absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-screen h-screen bg-slate-400 bg-opacity-50;
}
.modal--content {
  @apply flex flex-col justify-center items-center mx-auto bg-white p-12 rounded-xl blur-0;
}
.modal--btn {
  @apply w-36;
}
.likes {
  @apply flex justify-evenly items-center mx-auto w-2/4;
}
.likes--show {
  @apply flex justify-center items-center  cursor-pointer hover:-translate-y-1 hover:scale-90 hover:bg-gray-300 duration-300;
}
.likes--btn {
  @apply cursor-pointer hover:-translate-y-1 hover:scale-125 hover:text-red-600 duration-300;
}
</style>
