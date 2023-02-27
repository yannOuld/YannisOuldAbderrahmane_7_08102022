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
  <div class="home">
    <navigation-links v-once />
    <div class="home-aside">
      <div class="home-aside_info">
        <h1>Vous etes sur la page d'accueil</h1>
        <p>Ici, vous pouvez partager des publications avec vos collègues</p>
      </div>
      <post-form v-once />
      <div class="flex-row" v-if="user">
        <p>
          &nbsp; <strong> Connecté en tant que :</strong>
          {{ user.firstName }}
          {{ user.lastName }}
        </p>
      </div>
      <scroll-top />
    </div>

    <div class="w-full">
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
