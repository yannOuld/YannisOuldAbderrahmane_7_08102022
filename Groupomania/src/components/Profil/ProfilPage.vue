<template>
  <div class="profil">
    <div class="profil-user">
      <p class="profil-name">{{ author.firstName }} {{ author.lastName }}</p>

      <img
        v-if="!author.imageUrl"
        src="../../assets/images/icon.webP"
        class="profil-img"
        alt="image de profil"
      />

      <img
        class="profil-img"
        v-if="author.imageUrl"
        :src="author.imageUrl"
        alt="image de profil"
      />

      <div>
        <h2 v-once>email:</h2>
        <p>{{ author.email }}</p>
      </div>

      <div>
        <h2 v-once>Bio:</h2>
        <p class="description">{{ author.biography }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useUsersStore } from "../../stores/users";
import { storeToRefs } from "pinia";

export default {
  name: "ProfilPage",
  setup() {
    const { author } = storeToRefs(useUsersStore());
    return {
      author,
    };
  },
};
</script>

<style scoped>
.profil {
  @apply flex flex-col;
}
.profil-user {
  @apply py-10;
}
.profil-name {
  @apply uppercase font-extrabold;
}
.profil-img {
  @apply w-64 h-64;
}
</style>
