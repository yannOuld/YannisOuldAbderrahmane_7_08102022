<script setup>
  import PaginationBar from "../components/Layout/PaginationBar.vue";
  import ScrollTop from "../components/Utils/ScrollTopButton.vue";
  import PostForm from "../components/Post/PostForm.vue";
  import PostCard from "../components/Post/PostCard.vue";
  import { usePostStore } from "../stores/posts";
  import { useAuthStore } from "../stores/auth";
  import { mapState } from "pinia";
  import { computed, ref } from "vue";

  const { fetchPosts } = usePostStore();
  const { userData } = useAuthStore();
  const { user } = userData;
  fetchPosts();

  const mapPosts = () => {
    const store = usePostStore();
    return Object.fromEntries(
      Object.keys(store).map((key) => [key, computed(() => store[key])])
    );
  };

  const store = mapPosts();
  const posts = store.posts;

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
  <div class="lg:flex-row-reverse">
    <navigation-links v-once></navigation-links>
    <div class="sm:w-3/4 lg:3/4 flex self-start">
      <div class="w-full my-4 border-solid border-2 border-black">
        <h1>Vous etes sur la page d'accueil</h1>
        <p>Ici, vous pouvez partager des publications avec vos collègues</p>
      </div>
      <post-form v-once />
      <scroll-top />
    </div>

    <div class="w-full">
      <div class="flex-row">
        <span
          class="bg-green-600 rounded-full w-4 h-4 items-center align-middle content-center"
        >
          &nbsp;</span
        >
        <p>
          &nbsp; <strong> Connecté en tant que :</strong> {{ user.firstName }}
          {{ user.lastName }}
        </p>
      </div>
      <ul class="pagination-posts w-full">
        <li class="pagination-posts_card w-full">
          <post-card
            v-for="post in posts.slice(...range)"
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
        :total="posts.length"
        :pageLength="7"
        @change="onPageChange"
      />
    </div>
  </div>
</template>

<style scoped></style>
