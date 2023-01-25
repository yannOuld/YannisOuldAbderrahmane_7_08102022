<template>
  <div class="container">
    <div>
      <p class="date" aria-labelledby="date">{{ createdAt }}</p>
    </div>
    <div class="post" @click="postPage()">
      <div class="author">
        <img
          v-if="owner?.imageUrl == null"
          src="../../assets/images/icon.webP"
          alt="image de l'auteur"
          class="user-img"
        />
        <img
          v-if="owner?.imageUrl != null"
          :src="owner.imageUrl"
          alt="image de l'auteur"
          class="user-img"
        />
        <p class="post-owner">{{ owner?.firstName }} {{ owner?.lastName }}</p>
      </div>
      <div class="header">
        <h1>{{ title }}</h1>
      </div>
      <div v-if="imageUrl">
        <img :src="imageUrl" alt="image du post" class="post-img" />
      </div>
      <div>
        <p>{{ content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, defineProps } from "vue";
import { useAuthStore } from "../../stores/auth";
import { usePostStore } from "../../stores/posts";

//parent props
const props = defineProps({
  uuid: { type: String, required: true },
  owner: { type: Object, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String, required: true },
  likesCounter: { type: Number, required: true },
  createdAt: { type: String, required: true },
});

//user uuid data
const { userData } = useAuthStore();
const { user } = userData;
let identification = ref(null);
identification.value = user.uuid;

// router link for Post view
const router = useRouter();
const postPage = () => {
  router.push({
    name: "PostView",
    params: { uuid: props.uuid },
  });
};

// deleting the post functionnality
const { deletePost } = usePostStore();
const deleteOnePost = async (uuid) => {
  return await deletePost(uuid);
};
</script>

<style scoped>
h1 {
  margin: 100px auto 15px;
}
.container {
  background-color: #faa1a1;
  position: relative;
  border-radius: 15px;
  padding: 10px;
  margin: 20px 0;
  width: 80vw;
}
.post {
  cursor: pointer;
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  padding: 10px;
  width: 60vw;
  margin: 10px auto;
}
.header {
  display: flex;
  justify-content: space-between;
}
.author {
  position: absolute;
  left: 15px;
  top: 10px;
  font-weight: 700;
  font-size: 18px;
  text-align: left;
  display: flex;
}
.post-owner {
  display: flex;
  align-items: center;
}
.user-img {
  width: 75px;
  border-radius: 50px;
  border: 5px solid #faa1a1;
  margin-right: 5px;
}
.post-img {
  object-fit: fill;
  border: 1px solid black;
  width: 700px;
  height: 450px;
  width: 550px;
}
.delete,
.likes {
  cursor: pointer;
  border-radius: 100px;
  padding: 3px 5px;
}
.delete {
  color: red;
  font-size: 40px;
  position: absolute;
  top: 30px;
  right: 40px;
  background-color: white;
  border: white 1px solid;
}
.likes {
  color: black;
  background: transparent;
  border: 3px solid black;
  font-size: 18px;
  margin: 0 10px;
}
.utils {
  position: absolute;
  bottom: 20px;
  right: 30px;
}
.date {
  width: 300px;
  font-weight: 900;
  background: white;
  padding: 1px 5px;
  border-radius: 10px;
}
</style>
