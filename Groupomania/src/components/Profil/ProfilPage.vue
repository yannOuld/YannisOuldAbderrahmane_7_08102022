<script setup>
  defineProps({
    author: { type: Object },
  });
</script>

<template>
  <div>
    <div class="profil-user">
      <p class="profil-user_name">
        {{ author?.firstName }} {{ author?.lastName }}
      </p>

      <img
        class="profil-user_img"
        v-if="author?.imageUrl"
        :src="author?.imageUrl"
        alt="image de profil"
      />

      <div>
        <h2 v-once>email:</h2>
        <p>{{ author?.email }}</p>
      </div>

      <div>
        <h2 v-once>Bio:</h2>
        <p class="profil-user_description">{{ author?.biography }}</p>
      </div>
    </div>
  </div>
</template>
