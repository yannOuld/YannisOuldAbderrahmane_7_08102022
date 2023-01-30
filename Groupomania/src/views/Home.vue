<template>
  <div>
    <navigation-links></navigation-links>
    <h1>Bienvenue chez Groupomania.</h1>
    <img
      src="../assets/images/icon.webP"
      class="img"
      alt="logo groupomania"
      rel="preload"
    />
    <div>
      <post-form />
    </div>
    <main class="post-container">
      <h1 v-once>Les derniers Posts</h1>
      <pagination-bar
        :currentPage="currentPage"
        :maxVisibleButtons="3"
        :posts="posts"
        :perPage="7"
        :totalPages="Math.ceil(postsNumber / 7)"
        @pagechanged="onPageChange"
      />
    </main>
  </div>
</template>

<script>
import PostForm from "../components/Post/PostForm.vue";
import PaginationBar from "../components/Utils/PaginationBar.vue";
import { usePostStore } from "../stores/posts";
import { mapState } from "pinia";

export default {
  name: "HomeView",
  components: {
    PostForm,
    PaginationBar,
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

<style scoped>
.img {
  @apply hidden sm:flex mx-auto my-3 w-96;
}
h1 {
  text-align: center;
}
</style>
