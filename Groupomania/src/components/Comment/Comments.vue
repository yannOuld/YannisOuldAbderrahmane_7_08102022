<template>
  <section>
    <h2 class="text-center">Commentaires</h2>
    <div v-for="comment in comments" :key="comment">
      <CommentCard :comment="comment" />
    </div>
  </section>
</template>

<script setup>
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useCommentStore } from "../../stores/comment.js";
import { onMounted } from "vue";
import CommentCard from "./Comment.vue";

// finding uuid of the post
const route = useRoute();
const uuid = route.params.uuid;

// fetch API corresponding comments to the store
const { fetchComments } = useCommentStore();
onMounted(() => {
  fetchComments(uuid);
});

// retrieving comments data from the store
const { comments } = storeToRefs(useCommentStore());
</script>
