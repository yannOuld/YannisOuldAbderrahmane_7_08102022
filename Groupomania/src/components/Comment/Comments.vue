<template>
  <section>
    <h2>Commentaires</h2>
    <div v-for="comment in comments" v-bind:key="comment">
      <CommentCard :comment="comment" />
    </div>
  </section>
</template>

<script setup>
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useCommentStore } from "../../stores/comment.js";
import CommentCard from "./Comment.vue";

// finding uuid of the post 
const route = useRoute();
const uuid = route.params.uuid;

// fetch API corresponding comments to the store
const { fetchComments } = useCommentStore();
fetchComments(uuid);

// retrieving comments data from the store
const { comments } = storeToRefs(useCommentStore());
</script>

<style scoped>
h2 {
  text-align: center;
}
</style>
