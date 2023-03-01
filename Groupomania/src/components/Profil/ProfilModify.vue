<script setup>
  import { modal } from "../Forms/modal";
  import { useMultiPartForm } from "../Forms/form";
  import { useAuthStore } from "../../stores/auth";
  import { storeToRefs } from "pinia";

  // user uuid
  const { userData } = storeToRefs(useAuthStore());
  const uuid = userData.value.user.uuid;

  // composable form
  let {
    fileTarget,
    handleFileUpload,
    src,
    firstName,
    lastName,
    biography,
    handleData,
  } = useMultiPartForm();

  // compasable modal
  let { isOpen, msgErr, msgSucces, showPopup } = modal();

  // form submit to modify user
  const { modify } = useAuthStore();

  async function submit() {
    const formData = handleData();
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
  }
</script>

<template>
  <div class="w-full">
    <form
      enctype="multipart/form-data"
      @submit.prevent="submit()"
      class="profil-form_modify w-11/12"
    >
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
        <h2>Modifier le profil</h2>
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
