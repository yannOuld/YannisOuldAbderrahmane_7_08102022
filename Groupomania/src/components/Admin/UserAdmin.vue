<template>
  <div>
    <form
      class="post-form_modify"
      enctype="multipart/form-data"
      @submit.prevent="submit()"
    >
      <h2>Modifier l'utilisateur'</h2>
      <div class="form-control">
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

<script setup>
  import { multiPartForm } from "../../utils/form.js";
  import { useAdminStore } from "../../stores/admin";

  const { modifyUser } = useAdminStore();

  //props uuid from parent component
  const props = defineProps({
    uuid: { type: String },
  });

  // composable form
  let { biography, fileTarget, handleFileUpload, handleData, formData } =
    multiPartForm();

  //submit modify user
  const submit = async () => {
    handleData();
    try {
      await modifyUser(props.uuid, formData);
      alert("l'utilisateur' à été modifié !");
    } catch (error) {
      console.log(error);
      alert("une erreur est survenue");
    }
  };
</script>
