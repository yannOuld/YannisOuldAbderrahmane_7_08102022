<template>
  <div>
    <navigation-links></navigation-links>
    <main>
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
    </main>
  </div>
</template>

<script>
import { ref, defineAsyncComponent } from "vue";
import { useUsersStore } from "../stores/users";
import { usePostStore } from "../stores/posts";
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
    const { fetchPosts } = usePostStore();
    const { fetchUsers } = useUsersStore();

    fetchUsers();
    fetchPosts();

    const { users } = storeToRefs(useUsersStore());
    const { posts } = storeToRefs(usePostStore());

    const userSection = ref(true);

    return { users, userSection, posts };
  },
};
</script>

<style scoped>
main {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
}
img {
  width: 200px;
}
li {
  position: relative;
  width: 80vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
  background: rgba(211, 209, 209, 0.342);
  padding: 30px 20px 20px;
}
span {
  position: absolute;
  top: 5px;
}
</style>
