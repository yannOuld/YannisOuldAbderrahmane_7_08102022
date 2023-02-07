<template>
  <div>
    <navigation-links></navigation-links>
    <div class="admin">
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

<script>
import { ref, defineAsyncComponent, onMounted } from "vue";
import { useAdminStore } from "../stores/admin";

import { storeToRefs } from "pinia";
export default {
  name: "AdminView",
  components: {
    PostBoard: defineAsyncComponent({
      loader: () => import("../components/Admin/PostBoard.vue"),
      delay: 1000,
    }),
    UsersBoard: defineAsyncComponent({
      loader: () => import("../components/Admin/UsersBoard.vue"),
      delay: 1000,
    }),
  },
  setup() {
    const { fetchPosts, fetchUsers } = useAdminStore();

    onMounted(() => {
      fetchUsers();
      fetchPosts();
    });

    const { users } = storeToRefs(useAdminStore());
    const { posts } = storeToRefs(useAdminStore());

    const userSection = ref(true);

    return { users, userSection, posts };
  },
};
</script>
