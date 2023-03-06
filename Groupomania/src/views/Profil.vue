<script setup>
  import PostCard from "../components/Post/PostCard.vue";
  import PaginationBar from "../components/Layout/PaginationBar.vue";
  import { pagination } from "../components/Layout/pagination.js";
  import ScrollTop from "../components/Utils/ScrollTopButton.vue";
  import { useRoute } from "vue-router";
  import { useUsersStore } from "../stores/users";
  import { storeToRefs } from "pinia";
  import { reactive } from "vue";
  import ProfilModify from "../components/Profil/ProfilModify.vue";
  import ProfilPage from "../components/Profil/ProfilPage.vue";

  const { currentPage, perPage, mapUser, range, onPageChange } = pagination();

  let store = mapUser();
  const arr = store.userPosts;

  // mode for components display
  const mode = reactive({
    state: "read" || "modify",
  });
  // method for mode read
  const switchRead = () => {
    mode.state = "read";
  };
  // method for mode modify
  const switchModify = () => {
    mode.state = "modify";
  };
  // retrieving user uuid from the params
  const route = useRoute();
  const uuid = route.params.uuid;

  // fetching page user with the store
  const { fetchOneAuthor } = useUsersStore();
  fetchOneAuthor(uuid);
  const { author } = storeToRefs(useUsersStore());
</script>

<template>


  <div class="w-full">
    <navigation-links v-once></navigation-links>
    <h1>Profil</h1>
    <div class="self-start profil limit relative" v-if="mode.state == 'read'">
      <button class="profil-btn_switch absolute" @click="switchModify()">
        modifier &nbsp;<font-awesome-icon icon="fa-solid fa-gear" />
      </button>
      <profil-page :author="author" />
    </div>

    <div class="self-start profil limit relative" v-if="mode.state == 'modify'">
      <button class="profil-btn_switch absolute" @click="switchRead()">
        Retour &nbsp;<font-awesome-icon icon="fa-solid fa-gear" />
      </button>
      <div class="">
        <profil-modify />
      </div>
    </div>

    <div v-if="author?.posts">
      <post-card
        v-for="post in arr.slice(...range)"
        :key="post.uuid"
        :uuid="post.uuid"
        :content="post.content"
        :title="post.title"
        :owner="author"
        :imageUrl="post.imageUrl"
        :createdAt="post.createdAt"
        :likesCounter="post.likesCounter"
        :commentsCounter="post.commentsCounter"
      />
      <pagination-bar
        :current="currentPage"
        :total="arr.length"
        :pageLength="7"
        @change="onPageChange"
      />
    </div>

    <scroll-top />
  </div>
</template>
