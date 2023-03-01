<script setup>
  import { useMultiPartForm } from "../Forms/form.js";
  import { useAdminStore } from "../../stores/admin";

  const { modifyUser } = useAdminStore();

  //props uuid from parent component
  const props = defineProps({
    uuid: { type: String },
  });

  // composable form
  let {
    firstName,
    lastName,
    biography,
    fileTarget,
    handleFileUpload,
    handleData,
  } = useMultiPartForm();

  //submit modify user
  async function submit() {
    const formData = handleData();
    try {
      await modifyUser(props.uuid, formData);
      alert("l'utilisateur' à été modifié !");
    } catch (error) {
      console.log(error);
      alert("une erreur est survenue");
    }
  }
</script>

<template>
  <div class="w-full">
    <form
      class="post-form_modify w-full sm:w3/4"
      enctype="multipart/form-data"
      @submit.prevent="submit()"
    >
      <h2>Modifier l'utilisateur'</h2>
      <div>
        <div class="form-control">
          <base-input
            label="prénom"
            v-model="firstName"
            name="firstName"
            id="firstName"
            placeholder="Obiwan"
            minlength="2"
          ></base-input>
        </div>
        <div class="form-control">
          <base-input
            label="nom"
            v-model="lastName"
            name="name"
            id="name"
            placeholder="Kenobi"
          ></base-input>
        </div>
        <div class="form-control">
          <base-input
            label="image"
            type="file"
            name="profil-img"
            id="profil-img"
            accept="image/png, image/jpeg, image/bmp, image/gif"
            @change="handleFileUpload"
          ></base-input>
        </div>

        <div class="form-control">
          <base-textarea
            label="Biographie"
            v-model="biography"
            placeholder="Ecrivez quelque chose"
            rows="5"
            cols="55"
            maxlength="500"
            id="biography"
            name="biography"
          ></base-textarea>
        </div>

        <button class="btn">modifier</button>
      </div>
    </form>
  </div>
</template>
