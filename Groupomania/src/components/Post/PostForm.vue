<template>
  <div class="paper">
    <form enctype="multipart/form-data" @submit="submit()">
      <h1>Partagez un Post.</h1>

      <div class="form-control title">
        <base-input
          v-model="title"
          label="Titre"
          name="title"
          id="title"
        ></base-input>
      </div>

      <div class="form-control file">
        <base-input
          label="image"
          type="file"
          name="image"
          id="image"
          accept="image/png, image/jpeg, image/bmp, image/gif"
          @change="handleFileUpload"
          ><font-awesome-icon
            icon="fa-solid fa-camera"
            style="margin-left: 10px"
        /></base-input>
      </div>

      <div class="form-control content">
        <base-input
          v-model="content"
          label="message"
          name="content"
          id="content"
        ></base-input>
      </div>

      <button class="btn" aria-label="bouton Envoyer">Envoyer</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { usePostStore } from "../../stores/posts";
import { useAuthStore } from "../../stores/auth";


export default {
  name: "PostForm",
  setup() {
    // stores data and functions
    const { userData } = useAuthStore();
    const { user } = userData;
    const { sendPost } = usePostStore();
    
    // input refs
    const fileTarget = ref(null);
    const title = ref(null);
    const content = ref(null);
    const owner_id = ref(null);

    // input file handling
    const handleFileUpload = (event) => {
      fileTarget.value = event.target.files[0];
      console.log(fileTarget.value);
    };

    // form submit 
    const submit = async () => {
      owner_id.value = user.id;

      const formData = new FormData();
      if (fileTarget.value != null) {
        formData.append("image", fileTarget.value, fileTarget.value.name);
      }
      if (title.value != null) {
        formData.append("title", title.value);
      }
      if (content.value != null) {
        formData.append("content", content.value);
      }
      if (owner_id.value != null) {
        formData.append("owner_id", owner_id.value);
      }

      try {
        await sendPost(formData);
      } catch (error) {
        console.log(error);
      }
    };
    return {
      handleFileUpload,
      title,
      content,
      fileTarget,
      submit,
    };
  },
};
</script>

<style scoped>
form {
  text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000,
    -1px -1px 0 #000;
  color: white;
  border: 1px solid transparent;
  background-color: #fd2d01;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
}
.form-control {
  margin: 5px auto 0;
}
.paper {
  width: 100%;
}
input {
  margin: 5px auto;
}
input[type="file"] {
  font-size: 14px;
  width: 150px;
  background: white;
  border-radius: 50px;
  outline: none;
  position: absolute;
  right: -200px;
  height: 15px;
  color: black;
  padding: 10px;
  align-items: center;
}
::-webkit-file-upload-button {
  display: none;
}
.file {
  position: relative;
  width: 250px;
  padding: 0;
  height: 40px;
  background-color: white;
}
.file-label {
  cursor: pointer;
  padding: 5px;
  text-shadow: none;
  color: #000;
  height: 40px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 20px;
  display: flex;
  justify-content: center;
  width: 250px;
  margin: auto;
  align-items: center;
  text-align: center;
}
.file-label:hover {
  font-weight: 700;
  color: #ffd7d7;
}
.content {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.btn {
  margin: 20px auto;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: white;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
}
</style>
