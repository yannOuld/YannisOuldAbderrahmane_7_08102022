<script setup>
  import PostBoard from "../components/Admin/PostBoard.vue";
  import UsersBoard from "../components/Admin/UsersBoard.vue";
  import { ref, onMounted } from "vue";
  import { useAdminStore } from "../stores/admin";
  import { storeToRefs } from "pinia";

  const { fetchPosts, fetchUsers } = useAdminStore();

  onMounted(() => {
    fetchUsers();
    fetchPosts();
  });

  const { users } = storeToRefs(useAdminStore());
  const { posts } = storeToRefs(useAdminStore());

  const userSection = ref(true);
</script>

<template>
  <div class="container">
    <navigation-links></navigation-links>
    <div class="w-full">
      <h1>DashBoard Administration</h1>
      <nav>
        <button @click="userSection = false">Posts</button>
        <button @click="userSection = true">Users</button>
      </nav>
      <div v-if="userSection == true">
        <users-board :users="users" />
      </div>
      <div v-if="userSection == false">
        <post-board :posts="posts" />
      </div>
    </div>
  </div>
</template>
