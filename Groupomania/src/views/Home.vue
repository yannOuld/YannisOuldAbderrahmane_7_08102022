<script setup>
  import { pagination } from "../components/Layout/pagination.js";
  import PaginationBar from "../components/Layout/PaginationBar.vue";
  import ScrollTop from "../components/Utils/ScrollTopButton.vue";
  import PostForm from "../components/Post/PostForm.vue";
  import PostCard from "../components/Post/PostCard.vue";
  import { usePostStore } from "../stores/posts";
  import { useAuthStore } from "../stores/auth";
  import { computed, ref, watchEffect } from "vue";
  import { storeToRefs } from "pinia";

  const { currentPage, perPage, mapPosts, range, onPageChange } = pagination();
  const { fetchPosts } = usePostStore();
  const { userData } = useAuthStore();
  const { user } = userData;
  fetchPosts();
  const { posts } = storeToRefs(usePostStore());

  let store = mapPosts();
  const arr = store.posts;

  watchEffect(() => {
    if (posts.value != arr) {
      store = mapPosts();
    }
  });
</script>

<template>
  <div class="container">
    <navigation-links v-once />

    <div class="w-full">
      <post-form v-once />
      <scroll-top />
      <ul class="pagination-posts">
        <li class="pagination-posts_card">
          <post-card
            v-for="post in arr.slice(...range)"
            :key="post.uuid"
            :uuid="post.uuid"
            :content="post.content"
            :title="post.title"
            :owner="post.owner"
            :imageUrl="post.imageUrl"
            :createdAt="post.createdAt"
            :likesCounter="post.likesCounter"
            :commentsCounter="post.commentsCounter"
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
  </div>
</template>
