<script setup>
  import { computed } from "vue";
  import PostCard from "../Post/PostCard.vue";

  const emit = defineEmits(["change"]);
  const props = defineProps({
    total: {
      type: Number,
      required: true,
    },
    pageLength: {
      type: Number,
      required: true,
    },
    current: {
      type: Number,
      required: true,
    },
  });

  const numPage = computed(() => Math.ceil(props.total / props.pageLength));

  const pagination = computed(() => {
    const arr = [];
    const current = props.current;
    const num_page = numPage.value;

    if (current > 2) arr.push(1);
    if (current > 3) arr.push("...");
    if (current > 1) arr.push(current - 1);
    arr.push(current);
    if (current < num_page) arr.push(current + 1);
    if (current < num_page - 2) arr.push("...");
    if (current < num_page - 1) arr.push(num_page);
    console.log(num_page, current);
    return arr;
  });
</script>

<template>
  <div class="pagination">
    <ul class="pagination-bar">
      <template v-for="(page, index) in pagination">
        <li :key="index + 'd'" v-if="page === '...'" class="pagination-item">
          <button class="pagination-btn" type="button">
            {{ page }}
          </button>
        </li>
        <li :key="index" v-else class="pagination-item">
          <button
            class="pagination-btn"
            type="button"
            @click="$emit('change', page)"
          >
            {{ page }}
          </button>
        </li>
      </template>
    </ul>
  </div>
</template>

<style scoped>
  .pagination {
    @apply mt-3 mb-8;
  }
  .pagination-item {
    @apply inline-block mb-10  rounded;
  }
  .pagination-bar {
    @apply text-center rounded content-center w-full flex-row;
  }
  .pagination-btn {
    @apply mx-2 flex font-extrabold w-fit p-1 sm:p-2 sm:mx-1 rounded border-gray-500;
  }
</style>
