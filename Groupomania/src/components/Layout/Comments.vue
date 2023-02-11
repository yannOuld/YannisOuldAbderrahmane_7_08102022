<template>
  <div>
    <h2>Commentaires</h2>
    <div v-for="(comment, update) in comments" :key="update">
      <CommentCard
        @onDelete="onCommentDelete()"
        :comment="comment"
        :owner="comment.owner"
      />
    </div>
  </div>
</template>

<script setup>
  import { useRoute } from "vue-router";
  import { storeToRefs } from "pinia";
  import { useCommentStore } from "../../stores/comment.js";
  import { ref } from "vue";
  import CommentCard from "../Comment/CommentCard.vue";

  let update = ref(0);

  const props = defineProps({
    forceUpdate: {
      type: Number,
    },
  });

  // finding uuid of the post
  const route = useRoute();
  const uuid = route.params.uuid;

  // fetch API corresponding comments to the store
  const { fetchComments } = useCommentStore();
  fetchComments(uuid);

  // retrieving comments data from the store
  const { comments } = storeToRefs(useCommentStore());

  const onCommentDelete = () => {
    update += 1;
  };
</script>
