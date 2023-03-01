<script setup>
  import PostAdmin from "./PostAdmin.vue";
  import { ref } from "vue";
  import { useAdminStore } from "../../stores/admin";

  defineProps({
    posts: {
      type: Array,
    },
  });

  const isOpen = ref(false);
  const targetUuid = ref(null);

  const OpenTarget = (uuid) => {
    isOpen.value = true;
    targetUuid.value = uuid;
  };

  const { deletePost } = useAdminStore();

  async function postSupp(uuid) {
    try {
      await deletePost(uuid);
      alert("le post à été supprimé !");
    } catch (error) {
      alert("un probleme est survenu !");
    }
  }
</script>

<template>
  <div v-if="posts">
    <ul
      class="admin-list relative justify-between"
      v-for="post in posts"
      :key="post.uuid"
    >
      <li class="admin-list_item">
        <span class="admin-list_id absolute"> uuid: {{ post.uuid }} </span>
        <div class="admin-list_data justify-between">
          <div v-if="post.imageUrl">
            <img class="admin-list_img" :src="post.imageUrl" alt="image post" />
          </div>
          <div>
            <h2 class="text-base">
              {{ post.owner.firstName }} {{ post.owner.lastName }}
            </h2>
          </div>
          <div>
            <h3>{{ post.title }}</h3>
            <p>{{ post.content }}</p>
          </div>
        </div>
        <div class="flex-row">
          <button class="btn" @click="postSupp(post.uuid)">supprimer</button>
          <button class="btn" @click="OpenTarget(post.uuid)">modifier</button>
        </div>
      </li>
    </ul>
    <teleport to="body">
      <div class="likes-modal_bg fixed" v-if="isOpen">
        <button @click="isOpen = false">quitter</button>
        <post-admin :uuid="targetUuid" />
      </div>
    </teleport>
  </div>
</template>
