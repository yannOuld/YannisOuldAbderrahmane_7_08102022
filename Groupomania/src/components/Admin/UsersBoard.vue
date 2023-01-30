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
        <h2>{{ user.firstName }} {{ user.lastName }}</h2>
        <p>{{ user.email }}</p>
        <p>{{ user.biography }}</p>
        <div>
          <button>delete</button>
          <button>give admin rights</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  users: {
    type: Array,
    required: true,
  },
});
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
