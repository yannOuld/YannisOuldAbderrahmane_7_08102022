<script setup>
  import { modal } from "../Forms/modal";
  import { myfetch } from "../../utils/fetchWrapp";
  import { reactive } from "vue";
  import { computed } from "vue";
  import useVuelidate from "@vuelidate/core";
  import {
    required,
    email,
    sameAs,
    minLength,
    helpers,
  } from "@vuelidate/validators";

  // compasable modal
  let { isOpen, msgErr, msgSucces, showPopup } = modal();

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

  // vuelidate
  const v$ = useVuelidate(rules, formData);

  //form submit
  async function submit() {
    const validation = await v$._value.$validate();

    if (!validation) {
      msgErr.value = "Veuillez verifier les champs.";
      return showPopup();
    }

    const response = await myfetch("POST", "/auth/register", formData).catch(
      (err) => console.log(err)
    );

    if (response.uuid) {
      msgSucces.value = "compte créée avec succes.";
      return showPopup();
    } else {
      msgErr.value = "Echec de l'inscription.";
      return showPopup();
    }
  }
</script>

<template>
  <div class="sign_layout">
    <h1>Inscription</h1>
    <form class="sign-form" @submit.prevent="submit()" autocomplete="on">
      <div class="sign-form_display justify-between">
        <!-- Prénom -->
        <base-input
          label="prénom"
          v-model="formData.firstName"
          name="firstName"
          id="firstName"
          placeholder="Obiwan"
          minlength="2"
        ></base-input>
        <!-- message d'erreur -->
        <p class="error" v-if="v$.firstName.$error">
          le prénom est requis ! 2 caractères min
        </p>

        <!--nom -->
        <base-input
          label="nom"
          v-model="formData.lastName"
          name="name"
          id="name"
          placeholder="Kenobi"
        ></base-input>
        <!-- message d'erreur -->
        <p class="error" v-if="v$.lastName.$error">
          le nom est requis ! 2 caractères min
        </p>

        <!-- Email -->
        <base-input
          label="email"
          type="email"
          v-model="formData.email"
          name="email"
          id="email"
          placeholder="Ben@groupomania.com"
        ></base-input>
        <!-- message d'erreur -->
        <p class="error" v-if="v$.email.$error">
          votre adresse email est invalide
        </p>

        <!-- Password -->
        <base-input
          label="password"
          type="password"
          v-model="formData.password"
          name="password"
          placeholder="1 Maj, 1 chiffre, 1symbole min"
          autocomplete="off"
        ></base-input>
        <!-- message d'erreur -->
        <p class="error" v-if="v$.password.$error">
          le mot de passe doit contenir au moins 8 caractères dont une
          majuscule, un chiffre et un symbole.
        </p>

        <!-- Confirm Password -->
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
        <p class="error" v-if="v$.confirmPassword.$error">
          Les mots de passes doivent correspondre
        </p>

        <!-- Form Submit Button -->
        <button class="sign-form--btn font-bold rounded-lg">s'inscrire</button>
      </div>
    </form>
    <!-- Pop up-->
    <div class="modal" v-if="isOpen">
      <p class="error">{{ msgErr }}</p>
      <p class="succes">{{ msgSucces }}</p>
    </div>
  </div>
</template>
