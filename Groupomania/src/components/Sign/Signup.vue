<template>
  <div class="bloc">
    <h1>Inscription</h1>
    <form @submit.prevent="submit()" autocomplete="on">
      <div class="center">
        <!-- Prénom -->
        <div class="form-group">
          <base-input
            label="prénom"
            v-model="formData.firstName"
            name="firstName"
            id="firstName"
            placeholder="Obiwan"
            minlength="2"
          ></base-input>
          <!-- message d'erreur -->
          <p v-if="v$.firstName.$error">
            le prénom est requis ! 2 caractères min
          </p>
        </div>

        <!--nom -->
        <div class="form-group">
          <base-input
            label="nom"
            v-model="formData.lastName"
            name="name"
            id="name"
            placeholder="Kenobi"
          ></base-input>
          <!-- message d'erreur -->
          <p v-if="v$.lastName.$error">le nom est requis ! 2 caractères min</p>
        </div>

        <!-- Email -->
        <div class="form-group">
          <base-input
            label="email"
            type="email"
            v-model="formData.email"
            name="email"
            id="email"
            placeholder="Ben@groupomania.com"
          ></base-input>
          <!-- message d'erreur -->
          <p v-if="v$.email.$error">votre adresse email est invalide</p>
        </div>

        <!-- Password -->
        <div class="form-group">
          <base-input
            label="password"
            type="password"
            v-model="formData.password"
            name="password"
            placeholder="1 Maj, 1 chiffre, 1symbole min"
            autocomplete="off"
          ></base-input>
          <!-- message d'erreur -->
          <p v-if="v$.password.$error">
            le mot de passe doit contenir au moins 8 caractères dont une
            majuscule, un chiffre et un symbole.
          </p>
        </div>

        <!-- Confirm Password -->
        <div class="form-group">
          <base-input
            label="confirm password "
            id="confirm"
            type="password"
            v-model="formData.confirmPassword"
            name="confirm"
            placeholder="Confirmez mot de passe"
            autocomplete="off"
          ></base-input>
          <!-- message d'erreur -->
          <p v-if="v$.confirmPassword.$error">
            Les mots de passes doivent correspondre
          </p>
        </div>

        <!-- Form Submit Button -->
        <div class="text-center">
          <button class="btn">s'inscrire</button>
        </div>
      </div>
    </form>
    <!-- Pop up-->
    <div class="modal" v-if="isOpen">
      <p class="error">{{ msgErr }}</p>
      <p class="succes">{{ msgSucces }}</p>
    </div>
  </div>
</template>

<script>
import { myfetch } from "../../utils/fetchWrapp";
import { reactive } from "vue";
import { ref, computed } from "vue";

import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "@vuelidate/validators";

export default {
  name: "SignIn",
  setup() {
    // reactive form inputs
    const formData = reactive({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    // vuelidate rules and regex helper
    const regex = helpers.regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
    );
    const rules = computed(() => {
      return {
        firstName: { required, minLength: minLength(2) },
        lastName: { required, minLength: minLength(2) },
        email: { required, email },
        password: { required, helpers: regex },
        confirmPassword: { required, sameAs: sameAs(formData.password) },
      };
    });

    // modal variables
    let isOpen = ref(false);
    let msgErr = ref("");
    let msgSucces = ref("");
    let closePopup;

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

    // vuelidate
    const v$ = useVuelidate(rules, formData);

    //form submit
    const submit = async () => {
      // vuelidate inputs validation
      const validation = await v$._value.$validate();

      if (!validation) {
        msgErr.value = "Veuillez verifier les champs.";
        return showPopup();
      }

      // fetch
      const response = await myfetch("POST", "/user/signup", formData);

      // modal handling
      if (response.uuid) {
        msgSucces.value = "compte créée avec succes.";
        return showPopup();
      } else {
        msgErr.value = "Adresse mail déja utilisée.";
        return showPopup();
      }
    };

    return {
      v$,
      isOpen,
      formData,
      msgSucces,
      msgErr,
      submit,
    };
  },
};
</script>

<style scoped>
h1 {
  font-weight: 700;
}
.bloc {
  position: relative;
  margin: auto;
  border: solid 2px;
  border-radius: 15px;
  padding: 10px;
  width: 500px;
  font-size: 16px;
  background-color: white;
  text-align: center;
}
.center {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.link {
  color: cornflowerblue;
  cursor: pointer;
  font-weight: 700;
}
.logo {
  width: 300px;
  background-color: transparent;
  margin: 0 20px;
}
.form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 400px;
}
.form-control {
  width: 200px;
  margin: 10px;
}
p {
  margin: 0;
  padding: 0;
}
.modal {
  display: flex;
  margin: auto;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 5px;
  font-weight: 700;
  width: 100%;
  background-color: white;
}
.succes {
  color: #03c03c;
}
.error {
  color: red;
}
.btn {
  background-color: #0787f7;
  color: aliceblue;
  font-weight: 700;
  padding: 10px;
  font-size: 14px;
  border-style: hidden;
  border-radius: 10px;
  margin: 10px;
  cursor: pointer;
}
.disabled {
  background-color: grey;
  cursor: not-allowed;
}
</style>
