<template>
  <div>
    <form enctype="multipart/form-data" class="form" @submit.prevent="submit">
      <h2>Modifier le Post</h2>
      <base-input
        v-model="title"
        label="changer le titre"
        name="title"
        id="title"
      ></base-input>

      <base-input
        v-model="content"
        label="changer le message"
        name="content"
        id="content"
      ></base-input>

      <div class="form-control form-file">
        <label for="image"> changer l'image</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/png, image/jpeg, image/bmp, image/gif"
          @change="handleFileUpload"
        />
      </div>
      <button class="form-btn">modifier le post</button>
    </form>
  </div>
</template>

<script>
import { ref, defineProps } from "vue";
import { usePostStore } from "../../stores/posts";

export default {
  name: "PostView",

  setup() {
    //props uuid from parent component
    defineProps({
      uuid: String,
    });

    // form inputs refs
    const fileTarget = ref(null);
    const title = ref(null);
    const content = ref(null);

    // file input handling
    const handleFileUpload = (event) => {
      fileTarget.value = event.target.files[0];
      console.log(fileTarget.value);
    };

    // submit post modification
    const { modifyPost } = usePostStore();
    const submit = async () => {
      try {
        const formData = new FormData();
        if (title.value != null) {
          formData.append("title", title.value);
        }
        if (fileTarget.value != null) {
          formData.append("image", fileTarget.value, fileTarget.value.name);
        }
        if (content.value != null) {
          formData.append("content", content.value);
        }
        await modifyPost(uuid, formData);
      } catch (error) {
        console.log(error);
      }
    };

    return {
      handleFileUpload,
      title,
      content,
      submit,
    };
  },
};
</script>

<style scoped>
.navigation {
  width: 100%;
  display: flex;
  justify-content: center;
}
.container {
  background-color: #faa1a1;
  position: relative;
  border-radius: 15px;
  padding: 10px;
  margin: 20px 0;
}
.post {
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70vw;
  border-radius: 15px;
  padding: 10px;
  margin: 10px auto;
}
.likes {
  cursor: pointer;
  background: #310e96;
  color: white;
  font-size: 15px;
}
.delete,
.modify {
  cursor: pointer;
  position: absolute;
  font-size: 25px;
  right: 20px;
  background-color: white;
}
.delete {
  border: white 1px solid;
  color: red;
  top: 20px;
}
.modify {
  border: transparent;
  color: #4e5166;
  top: 80px;
}
.image {
  width: 300px;
}
.form {
  color: white;
  background-color: #4e5166;
  display: flex;
  flex-direction: column;
  border-radius: 25px;
  padding: 20px;
}
.form-control {
  margin: 10px;
}
.form-control > input {
  margin-left: 15px;
}
.form-content {
  flex-direction: column;
}
.form-btn {
  width: 150px;
  margin: auto;
}
</style>
