<template>
  <div class="pagination">
    <ul class="pagination-posts">
      <li class="pagination-posts_card">
        <post-card
          v-for="post in paginatedPosts"
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
    <ul class="pagination-bar">
      <li class="pagination-item">
        <button
          class="pagination-btn"
          type="button"
          @click="onClickFirstPage"
          :disabled="isInFirstPage"
        >
          First
        </button>
      </li>

      <li class="pagination-item">
        <button
          class="pagination-btn"
          type="button"
          @click="onClickPreviousPage"
          :disabled="isInFirstPage"
        >
          Previous
        </button>
      </li>

      <!-- Visible Buttons Start  -->

      <li v-for="page in pages" :key="page.number" class="pagination-item">
        <button
          class="pagination-btn"
          type="button"
          @click="onClickPage(page.number)"
          :disabled="page.isDisabled"
          :class="{ active: isPageActive(page.number) }"
        >
          {{ page.number }}
        </button>
      </li>

      <!-- Visible Buttons End -->

      <li class="pagination-item">
        <button
          class="pagination-btn"
          type="button"
          @click="onClickNextPage"
          :disabled="isInLastPage"
        >
          Next
        </button>
      </li>

      <li class="pagination-item">
        <button
          class="pagination-btn"
          type="button"
          @click="onClickLastPage"
          :disabled="isInLastPage"
        >
          Last
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import PostCard from "../Post/PostCard.vue";

export default {
  name: "PaginationBar",
  components: {
    PostCard,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },
    totalPages: {
      type: Number,
      required: true,
      default: 7,
    },
    perPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    // calculating the starting button value
    startPage() {
      if (this.currentPage === 1) return 1;

      if (this.currentPage === this.totalPages) {
        return (
          this.totalPages -
          this.maxVisibleButtons +
          (this.maxVisibleButtons - 1)
        );
      }

      return this.currentPage - 1;
    },
    // calculatin the last button value
    endPage() {
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.totalPages
      );
    },
    // calcultating the pages number
    pages() {
      const range = [];
      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          number: i,
          isDisabled: i === this.currentPage,
        });
      }
      return range;
    },

    // Posts array slice for pagination
    paginatedPosts() {
      let start = (this.currentPage - 1) * this.perPage;
      let end = start + this.perPage;

      return this.posts.slice(start, end);
    },

    // BOUNDING FIRST AND LAST PAGE
    isInFirstPage() {
      return this.currentPage === 1;
    },

    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    // BUTTONS EVENTS EMITS
    onClickFirstPage() {
      this.$emit("pagechanged", 1);
    },

    onClickPreviousPage() {
      this.$emit("pagechanged", this.currentPage - 1);
    },

    onClickPage(page) {
      this.$emit("pagechanged", page);
    },

    onClickNextPage() {
      this.$emit("pagechanged", this.currentPage + 1);
    },

    onClickLastPage() {
      this.$emit("pagechanged", this.totalPages);
    },

    isPageActive(page) {
      return this.currentPage === page;
    },

    onPageChange(page) {
      this.currentPage = page;
    },
  },
};
</script>

