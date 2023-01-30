<template>
  <div v-if="posts">
    <ul v-for="post in posts" :key="post.uuid">
      <li>
        <span> uuid: {{ post.uuid }} </span>
        <div v-if="post.imageUrl">
          <img :src="post.imageUrl" alt="image post" />
        </div>
        <div>
          <p>{{ post.owner.firstName }} {{ post.owner.lastName }}</p>
        </div>
        <div>
          <h2>{{ post.title }}</h2>
          <p>{{ post.content }}</p>
        </div>
        <button @click="postSupp(post.uuid)">delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { usePostStore } from "../../stores/posts";

defineProps({
  posts: {
    type: Array,
  },
});

const { deletePost } = usePostStore();

const postSupp = async (uuid) => {
  await deletePost(uuid);
};
</script>

<style scoped>
img {
  width: 200px;
}
li {
  position: relative;
  width: 80vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
  background: rgba(211, 209, 209, 0.342);
  padding: 30px 20px 20px;
}
span {
  position: absolute;
  top: 5px;
}
</style>
