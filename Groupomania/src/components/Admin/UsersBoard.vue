<template>
  <div>
    <ul v-for="user in users" :key="user.uuid">
      <li>
        <span>
          <strong> uuid:</strong> {{ user.uuid }} <strong> id:</strong>
          {{ user.id }}</span
        >
        <div v-if="user.imageUrl">
          <img :src="user.imageUrl" alt="image utilisateur" />
        </div>
        <div class="user--infos">
          <p>Nom: {{ user.firstName }} {{ user.lastName }}</p>
          <p>Biographie: {{ user.biography }}</p>
        </div>
        <div>
          <button @click="suppUser(user.uuid)">delete</button>
          <button @click="isOpen = true">modifier</button>
        </div>
      </li>
      <teleport to="body">
        <div class="likes-modal_bg" v-if="isOpen">
          <button @click="isOpen = false">quitter</button>
          <profil-modify :uuid="user.uuid" />
        </div>
      </teleport>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { useAdminStore } from "../../stores/admin";
import ProfilModify from "../../components/Profil/ProfilModify.vue";

const isOpen = ref(false);

defineProps({
  users: {
    type: Array,
    required: true,
  },
});

const { deleteUser, modifyUser } = useAdminStore();

const suppUser = async (uuid) => {
  await deleteUser(uuid);
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
