<template>
  <div>
    <navigation-links v-once></navigation-links>
    <h1 v-once>Bienvenue chez Groupomania.</h1>
    <img
      v-once
      src="../assets/images/icon.webP"
      class="home-img"
      alt="logo groupomania"
      rel="preload"
    />

    <post-form v-once />

    <div class="home-container">
      <h1 v-once>Les derniers Posts</h1>
      <pagination-bar
        :currentPage="currentPage"
        :maxVisibleButtons="3"
        :posts="posts"
        :perPage="7"
        :totalPages="Math.ceil(postsNumber / 7)"
        @pagechanged="onPageChange"
      />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import PostForm from "../components/Post/PostForm.vue";
import { usePostStore } from "../stores/posts";
import { mapState } from "pinia";

export default {
  name: "HomeView",
  components: {
    PostForm,
    PaginationBar: defineAsyncComponent({
      loader: () => import("../components/Utils/PaginationBar.vue"),
      delay: 1000,
    }),
  },

  data() {
    return {
      currentPage: 1,
    };
  },
  methods: {
    // changing the current page with the child component emits
    onPageChange(page) {
      this.currentPage = page;
    },
  },
  computed: {
    // retrieving store data
    ...mapState(usePostStore, ["posts"]),
    ...mapState(usePostStore, ["postsNumber"]),
  },
  setup() {
    // fetching all post from API
    const { fetchPosts } = usePostStore();
    fetchPosts();
  },
};
</script>
