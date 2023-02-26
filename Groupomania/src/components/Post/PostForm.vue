<script setup>
  import { useMultiPartForm } from "../Forms/form.js";
  import { usePostStore } from "../../stores/posts";

  const { sendPost } = usePostStore();

  let { title, fileTarget, handleFileUpload, content, handleData } =
    useMultiPartForm();

  async function submit() {
    const formData = handleData();
    try {
      await sendPost(formData);
    } catch (error) {
      console.log(error);
    }
  }
</script>

<template>
  <form
    class="post-form_create"
    enctype="multipart/form-data"
    @submit.prevent="submit()"
  >
    <div class="border-b-2 my-2">
      <h2>Créer une publication</h2>
    </div>

    <base-input
      v-model="title"
      label="Titre"
      name="title"
      id="title"
    ></base-input>

    <base-input
      label="image"
      type="file"
      name="image"
      id="image"
      accept="image/png, image/jpeg, image/bmp, image/gif"
      @change="handleFileUpload"
    ></base-input>

    <base-textarea
      v-model="content"
      label="message"
      maxlength="500"
      cols="50"
      rows="5"
      name="content"
      id="content"
    ></base-textarea>

    <button class="btn" aria-label="bouton Envoyer">Envoyer</button>
  </form>
</template>
