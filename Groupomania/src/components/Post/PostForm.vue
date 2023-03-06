<script setup>
  import imageUrl from "../../assets/images/icon.webp";
  import { ref } from "vue";
  import { useMultiPartForm } from "../Forms/form.js";
  import { usePostStore } from "../../stores/posts";

  const clear = ref(null);
  const { sendPost } = usePostStore();

  let {
    title,
    fileTarget,
    handleFileUpload,
    defaultSrc,
    src,
    content,
    handleData,
  } = useMultiPartForm();

  async function submit() {
    const formData = handleData();
    try {
      await sendPost(formData);
    } catch (error) {
      console.log(error);
    }
    clear.value.reset();
    src.value = null;
  }
</script>

<template>
  <form
    ref="clear"
    class="post-form_create"
    enctype="multipart/form-data"
    @submit.prevent="submit()"
  >
    <base-input
      label="titre"
      v-model="title"
      placeholder="titre"
      name="title"
      id="title"
    ></base-input>

    <base-textarea
      label="message"
      v-model="content"
      placeholder="message"
      maxlength="500"
      cols="50"
      rows="5"
      name="content"
      id="content"
    ></base-textarea>
    <div class="preview">
      <img
        v-if="src !== null"
        class="preview-img"
        :src="src"
        alt="image entrée dans le formulaire"
      />
      <div class="preview-input">
        <base-input
          label="image"
          type="file"
          name="image"
          placeholder="image"
          id="image"
          accept="image/png, image/jpeg, image/bmp, image/gif"
          @change="handleFileUpload"
        ></base-input>
      </div>
    </div>

    <button class="btn" aria-label="bouton Envoyer">
      Créer une publication
    </button>
  </form>
</template>
