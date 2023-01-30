<template>
  <form enctype="multipart/form-data" @submit.prevent="submit()" class=".form">
    <div class="form-group">
      <h2 v-once>Modifier le profil</h2>
      <div class="form-group">
        <base-input
          label="image"
          type="file"
          name="profil-img"
          id="profil-img"
          accept="image/png, image/jpeg, image/bmp, image/gif"
          @change="handleFileUpload"
        ></base-input>
      </div>

      <div class="form-group">
        <base-textarea
          label="votre biographie"
          v-model="biography"
          placeholder="Ecrivez quelque chose"
          rows="5"
          cols="55"
          maxlength="500"
          id="biography"
          name="biography"
        ></base-textarea>
      </div>

      <button class="btn" aria-label="bouton Enregistrer">Enregistrer</button>
    </div>

    <div class="modal" v-if="isOpen">
      <p class="error">{{ msgErr }}</p>
      <p class="succes">{{ msgSucces }}</p>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { useAuthStore } from "../../stores/auth";
import { storeToRefs } from "pinia";

export default {
  name: "ProfilModify",
  setup() {
    // user uuid
    const { userData } = storeToRefs(useAuthStore());
    const uuid = userData.value.user.uuid;

    // form input refs
    const fileTarget = ref(null);
    const biography = ref(null);

    // file input handling
    const handleFileUpload = (event) => {
      fileTarget.value = event.target.files[0];
      console.log(fileTarget.value);
    };

    // modal variables
    let closePopup;
    let isOpen = ref(false);
    let msgErr = ref("");
    let msgSucces = ref("");

    // modal display
    const showPopup = () => {
      {
        isOpen.value = true;
        clearTimeout(closePopup);

        closePopup = setTimeout(() => {
          msgErr.value = "";
          msgSucces.value = "";
          isOpen.value = false;
        }, 2000);
      }
    };

    // form submit to modify user
    const { modify } = useAuthStore();
    const submit = async () => {
      try {
        const formData = new FormData();

        if (fileTarget.value != null) {
          formData.append("image", fileTarget.value, fileTarget.value.name);
        }

        if (biography.value != null) {
          formData.append("biography", biography.value);
        }
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

    return {
      isOpen,
      biography,
      msgSucces,
      handleFileUpload,
      msgErr,
      submit,
      userData,
    };
  },
};
</script>

<style scoped>
.form {
  @apply flex  border-none flex-col justify-center items-center mx-auto text-white w-11/12 hover:shadow-2xl hover:shadow-red-900;
}

.form-group {
  @apply flex flex-col mt-2 mx-auto;
}

.btn {
  @apply mx-auto my-5 py-1 px-2 rounded-md bg-white font-bold text-base cursor-pointer hover:-translate-y-1 hover:scale-90 hover:bg-gray-300 duration-300;
}
</style>
