<template>
  <div class="infos">
    <h1>Profil</h1>
    <p>{{ author.firstName }} {{ author.lastName }}</p>

    <img
      v-if="!author.imageUrl"
      src="../../assets/images/icon.webP"
      alt="image de profil"
    />

    <img v-if="author.imageUrl" :src="author.imageUrl" alt="image de profil" />

    <div>
      <h2 v-once>email:</h2>
      <p>{{ author.email }}</p>
    </div>

    <div>
      <h2 v-once>Bio:</h2>
      <p class="description">{{ author.biography }}</p>
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
.flex {
  display: flex;
}
textarea {
  width: 300px;
  resize: none;
}
.column {
  flex-direction: column;
}

form {
  width: 400px;
}
.paper {
  background-color: antiquewhite;
  align-items: center;
  border-radius: 15px;
  font-size: 20px;
  width: 80vw;
  height: 80vh;
  position: relative;
  padding: auto;
  margin: auto;
}
.profil-pic {
  width: 250px;
  border-radius: 100%;
}

input {
  margin: 5px 0;
}
.form-group {
  display: flex;
  margin: 5px auto;
  flex-direction: column;
}

img {
  width: 250px;
  height: 250px;
}
</style>
