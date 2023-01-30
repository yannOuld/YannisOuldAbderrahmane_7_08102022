<template>
  <div class="root">
    <button @click="isOpen = true">Likes</button>
    <div @click="sendLike">
      <font-awesome-icon icon="fa-solid fa-heart" />
    </div>
    <teleport to="body">
      <div class="modal" v-if="isOpen">
        <div class="modal--content">
          <h2>Personnes qui ont aimés le post.</h2>
          <div v-for="like in likes.value" :key="like">
            <p>{{ like.user.firstName }}</p>
          </div>
          <button @click="isOpen = false">quitter</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref, defineProps } from "vue";
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
getLikes(props.uuid);
const { likes } = storeToRefs(useLikeStore());
console.log(likes);
const data = {
  user_id: props.user_id,
};

//sending a like
const sendLike = async () => {
  await LikePost(props.uuid, data);
};
</script>

<style scoped>
.root {
  position: relative;
}
.modal {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 200vh;
  justify-content: center;
  align-items: center;
}
.modal--content {
  background-color: #fff;
  padding: 50px;
  border-radius: 10px;
}
</style>
