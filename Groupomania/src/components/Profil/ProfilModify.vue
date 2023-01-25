<template>
  <form
    enctype="multipart/form-data"
    @submit.prevent="submit()"
    class="paper flex column"
  >
    <h1 v-once>Modifier le profil</h1>

    <div class="form-group profil-pic">
      <label for="img"> choisir une image de profil</label>
      <input
        type="file"
        name="profil-pic"
        id="profil-pic"
        accept="image/png, image/jpeg, image/bmp, image/gif, image/jpg"
        @change="handleFileUpload"
      />
    </div>

    <div class="form-group biography">
      <label for="biography">Bio</label>
      <textarea
        v-model="biography"
        placeholder="Ecrivez quelque chose"
        rows="5"
        cols="55"
        maxlength="500"
        id="biography"
        name="biography"
      ></textarea>
    </div>

    <button class="btn" aria-label="bouton Enregistrer">Enregistrer</button>

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
.flex {
  display: flex;
}
textarea {
  width: 300px;
  resize: none;
}
.column {
  flex-direction: column;
}

form {
  width: 400px;
}
.paper {
  background-color: antiquewhite;
  align-items: center;
  border-radius: 15px;
  font-size: 20px;
  width: 80vw;
  height: 80vh;
  position: relative;
  padding: auto;
  margin: auto;
}
.profil-pic {
  width: 250px;
  border-radius: 100%;
}

input {
  margin: 5px 0;
}
.form-group {
  display: flex;
  margin: 5px auto;
  flex-direction: column;
}

img {
  width: 250px;
  height: 250px;
}
</style>
