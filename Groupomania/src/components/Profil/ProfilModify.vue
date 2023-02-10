<template>
  <div class="profil">
    <form
      enctype="multipart/form-data"
      @submit.prevent="submit()"
      class="profil-form_modify"
    >
      <div class="form-control">
        <h2>Modifier le profil</h2>
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

        <button
          class="btn hover:bg-gray-300 duration-300"
          aria-label="bouton Enregistrer"
        >
          Enregistrer
        </button>
      </div>

      <div class="modal" v-if="isOpen">
        <p class="error">{{ msgErr }}</p>
        <p class="succes">{{ msgSucces }}</p>
      </div>
    </form>
  </div>
</template>

<script setup>
  import { modal } from "../Forms/modal";
  import { multiPartForm } from "../Forms/form";
  import { useAuthStore } from "../../stores/auth";
  import { storeToRefs } from "pinia";

  // user uuid
  const { userData } = storeToRefs(useAuthStore());
  const uuid = userData.value.user.uuid;

  // composable form
  let { fileTarget, handleFileUpload, biography, handleData, formData } =
    multiPartForm();

  // compasable modal
  let { isOpen, msgErr, msgSucces, showPopup } = modal();

  // form submit to modify user
  const { modify } = useAuthStore();

  const submit = async () => {
    handleData();
    try {
      await modify(uuid, formData);
      msgSucces.value = "Votre profil à été mis à jour !";
      return showPopup();
    } catch (error) {
      console.log(error);
      msgErr.value =
        "Ouups une erreur c'est produite ! essayez plus tard... :(";
      return showPopup();
    }
  };
</script>
