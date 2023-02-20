<script setup>
  import { useRoute } from "vue-router";
  import { storeToRefs } from "pinia";
  import { useCommentStore } from "../../stores/comment.js";

  import CommentCard from "../Comment/CommentCard.vue";

  const props = defineProps({
    forceUpdate: {
      type: Number,
    },
  });

  const route = useRoute();
  const uuid = route.params.uuid;

  const { fetchComments } = useCommentStore();
  fetchComments(uuid);

  const { comments } = storeToRefs(useCommentStore());
</script>

<template>
  <div>
    <h2>Commentaires</h2>
    <div v-for="comment of comments" :key="comment">
      <comment-card :comment="comment" :owner="comment.owner" />
    </div>
  </div>
</template>
