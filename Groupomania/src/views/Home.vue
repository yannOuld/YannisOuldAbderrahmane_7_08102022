<script>
  import PaginationBar from "../components/Layout/PaginationBar.vue";
  import PostForm from "../components/Post/PostForm.vue";
  import PostCard from "../components/Post/PostCard.vue";
  import { usePostStore } from "../stores/posts";
  import { mapState } from "pinia";

  export default {
    name: "HomeView",
    components: {
      PostForm,
      PostCard,
      PaginationBar,
    },

    data() {
      return {
        currentPage: 1,
        perPage: 7,
      };
    },
    methods: {
      // changing the current page with the child component emits
      onPageChange(page) {
        this.currentPage = page;
      },
    },
    computed: {
      // Posts array slice for pagination
      range() {
        let start = (this.currentPage - 1) * this.perPage;
        let end = start + this.perPage;

        return [start, end];
      },
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

<template>
  <div class="lg:flex-row-reverse">
    <navigation-links v-once></navigation-links>
    <div class="w-1/2 flex self-start">
      <div class="w-full my-4 border-solid border-2 border-black">
        <h1>Vous etes sur la page d'accueil</h1>
        <p>Ici, vous pouvez partager des publications avec vous collègues</p>
      </div>
      <post-form v-once />
    </div>

    <div class="w-full">
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
