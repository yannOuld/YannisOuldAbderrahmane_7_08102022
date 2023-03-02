<script setup>
  import PaginationBar from "./PaginationBar.vue";
  import { pagination } from "./pagination.js";
  import { useRoute } from "vue-router";
  import { storeToRefs } from "pinia";
  import { useCommentStore } from "../../stores/comment.js";
  import CommentCard from "../Comment/CommentCard.vue";

  const { currentPage, perPage, mapComments, range, onPageChange } =
    pagination();
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

  let store = mapComments();
  const arr = store.comments;
</script>

<template>
  <div>
    <h2>Commentaires</h2>
    <ul>
      <li>
        <comment-card
          v-for="comment in arr.slice(...range)"
          :key="comment.id"
          :comment="comment"
          :owner="comment.owner"
        />
      </li>
    </ul>
    <pagination-bar
      :current="currentPage"
      :total="arr.length"
      :pageLength="7"
      @change="onPageChange"
    />
  </div>
</template>
