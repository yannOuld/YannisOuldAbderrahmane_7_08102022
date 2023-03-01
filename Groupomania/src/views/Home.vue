<script setup>
  import PaginationBar from "../components/Layout/PaginationBar.vue";
  import ScrollTop from "../components/Utils/ScrollTopButton.vue";
  import PostForm from "../components/Post/PostForm.vue";
  import PostCard from "../components/Post/PostCard.vue";
  import { usePostStore } from "../stores/posts";
  import { useAuthStore } from "../stores/auth";
  import { computed, ref, watchEffect } from "vue";
  import { storeToRefs } from "pinia";

  const { fetchPosts } = usePostStore();
  const { userData } = useAuthStore();
  const { user } = userData;
  fetchPosts();
  const { posts } = storeToRefs(usePostStore());

  const mapPosts = () => {
    const store = usePostStore();
    return Object.fromEntries(
      Object.keys(store).map((key) => [key, computed(() => store[key])])
    );
  };

  let store = mapPosts();
  const arr = store.posts;

  watchEffect(() => {
    if (posts.value != arr) {
      store = mapPosts();
    }
  });

  const currentPage = ref(1);
  const perPage = ref(7);

  function onPageChange(page) {
    currentPage.value = page;
  }

  const range = computed(() => {
    let start = (currentPage.value - 1) * perPage.value;
    let end = start + perPage.value;
    return [start, end];
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

<style scoped>
  .home {
    @apply lg:flex-row-reverse;
  }
  .home-aside {
    @apply sm:w-3/4 lg:w-3/4 flex self-start;
  }
  .home-aside_info {
    @apply w-full my-4 border-solid border-2 border-black;
  }
</style>
