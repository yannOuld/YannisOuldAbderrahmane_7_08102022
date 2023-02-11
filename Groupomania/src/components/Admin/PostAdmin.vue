<script setup>
  import { multiPartForm } from "../Forms/form.js";
  import { useAdminStore } from "../../stores/admin";

  //props uuid from parent component
  const props = defineProps({
    uuid: { type: String, required: true },
  });

  const { modifyPost } = useAdminStore();

  // composable form
  let { title, fileTarget, content, handleFileUpload, handleData, formData } =
    multiPartForm();

  const submit = async () => {
    handleData();
    try {
      await modifyPost(props.uuid, formData);
      alert("le post à été modifié !");
    } catch (error) {
      console.log(error);
      alert("une erreur est survenue");
    }
  };
</script>

<template>
  <div>
    <form
      class="post-form_modify"
      enctype="multipart/form-data"
      @submit.prevent="submit()"
    >
      <h2>Modifier le Post</h2>
      <div class="form-control">
        <div class="form-control">
          <base-input
            v-model="title"
            label="changer le titre"
            name="title"
            id="title"
          ></base-input>
        </div>

        <div class="form-control">
          <base-input
            label="image"
            type="file"
            name="img"
            id="img"
            accept="image/png, image/jpeg, image/bmp, image/gif"
            @change="handleFileUpload"
          ></base-input>
        </div>

        <div class="form-control">
          <base-input
            v-model="content"
            label="changer le message"
            name="content"
            id="content"
          ></base-input>
        </div>

        <button class="btn">modifier le post</button>
      </div>
    </form>
  </div>
</template>
