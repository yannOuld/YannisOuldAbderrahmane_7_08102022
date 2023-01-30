<template>
  <form class="form" enctype="multipart/form-data" @submit.prevent="submit()">
    <h2>Partagez un Post.</h2>
    <div class="form-control">
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
        ></base-input>
      </div>

      <div class="form-control content">
        <base-textarea
          v-model="content"
          label="message"
          maxlength="500"
          cols="50"
          rows="5"
          name="content"
          id="content"
        ></base-textarea>
      </div>
    </div>

    <button class="btn" aria-label="bouton Envoyer">Envoyer</button>
  </form>
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
.form {
  @apply flex bg-red-600 border-none flex-col justify-center items-center mx-auto text-white w-11/12 hover:shadow-2xl hover:shadow-red-900;
}
.form-control {
  @apply mt-2 mx-auto;
}

.btn {
  @apply mx-auto my-5 py-1 px-2 rounded-md bg-white font-bold text-base cursor-pointer hover:-translate-y-1 hover:scale-90 hover:bg-gray-300 duration-300;
}
</style>
