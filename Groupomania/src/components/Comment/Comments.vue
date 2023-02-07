<template>
  <div>
    <h2>Commentaires</h2>
    <div v-for="(comment, update) in comments" :key="update">
      <CommentCard @onDelete="onCommentDelete(id)" :comment="comment" />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useCommentStore } from "../../stores/comment.js";
import { onMounted, defineProps, ref } from "vue";
import CommentCard from "./CommentCard.vue";

const update = ref(0);

const props = defineProps({
  forceUpdate: {
    type: Number,
    required: true,
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
  //comments.value.filter((comment) => (comment.id = id));
  props.forceUpdate += 1;
};
</script>
