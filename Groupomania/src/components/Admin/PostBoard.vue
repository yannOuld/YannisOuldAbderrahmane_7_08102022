<template>
  <div v-if="posts">
    <ul v-for="post in posts" :key="post.uuid">
      <li>
        <span> uuid: {{ post.uuid }} </span>
        <div v-if="post.imageUrl">
          <img :src="post.imageUrl" alt="image post" />
        </div>
        <div>
          <p>{{ post.owner.firstName }} {{ post.owner.lastName }}</p>
        </div>
        <div>
          <h2>{{ post.title }}</h2>
          <p>{{ post.content }}</p>
        </div>
        <div>
          <button @click="postSupp(post.uuid)">delete</button>
          <button @click="isOpen = true">modifier</button>
        </div>
        <teleport to="body">
          <div class="likes-modal_bg" v-if="isOpen">
            <button @click="isOpen = false">quitter</button>
          </div>
        </teleport>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { useAdminStore } from "../../stores/admin";

defineProps({
  posts: {
    type: Array,
  },
});

const isOpen = ref(false);

const title = ref(null);
const content = ref(null);
const fileTarget = ref(null);

const handleFileUpload = (event) => {
  fileTarget.value = event.target.files[0];
  console.log(fileTarget.value);
};

const { deletePost, modifyPost } = useAdminStore();

const submit = async (uuid) => {
  const formData = new FormData();
  if (fileTarget.value != null) {
    formData.append("image", fileTarget.value, fileTarget.value.name);
  }
  if (content.value != null) {
    formData.append("content", content.value);
  }
  if (title.value != null) {
    formData.append("title", title.value);
  }
  try {
    await modifyPost(uuid, formData);
    alert("le post à été modifié !");
  } catch (error) {
    console.log(error);
    alert("une erreur est survenue");
  }
};

const postSupp = async (uuid) => {
  try {
    await deletePost(uuid);
    alert("post supprimé !");
  } catch (error) {
    console.log(error);
    alert("un probleme est survenu !");
  }
};
</script>

<style scoped>
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
