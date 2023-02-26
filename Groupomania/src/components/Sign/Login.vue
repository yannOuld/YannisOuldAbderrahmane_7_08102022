<script setup>
  import { modal } from "../Forms/modal";
  import { reactive, computed, ref } from "vue";
  import { useRouter } from "vue-router";
  import useVuelidate from "@vuelidate/core";
  import { required, email } from "@vuelidate/validators";
  import { useAuthStore } from "../../stores/auth";

  let { isOpen, msgErr, showPopup } = modal();

  // auth store
  const { login } = useAuthStore();

  // reactive inputs
  const formData = reactive({
    email: "",
    password: "",
  });

  // vuelidate rules
  const rules = computed(() => {
    return {
      email: { required, email },
      password: { required },
    };
  });

  // router
  const router = useRouter();

  // vuelidate variable
  const v$ = useVuelidate(rules, formData);

  //form submit function
  async function submit() {
    const validation = await v$._value.$validate();

    if (!validation) {
      msgErr.value = "Tout les champs doivent être remplis";
      return showPopup();
    }

    const response = await login(formData)
      .then(() => {
        router.push("/");
      })
      .catch((err) => console.log(err));

    if (!response) {
      msgErr.value = "les identifiants ne correspondent à aucun compte";
      showPopup();
    }
  }
</script>

<template>
  <div class="sign_layout">
    <h1>Connexion</h1>
    <form @submit.prevent="submit()" autocomplete="on" class="sign-form">
      <div class="sign-form_display justify-between">
        <!-- Email -->
        <base-input
          v-model="formData.email"
          label="email"
          placeholder="email@groupomania.com"
          name="email"
          id="email"
          type="email"
        ></base-input>
        <p class="error" v-if="v$.email.$error">
          une adresse email valide est requise
        </p>

        <!-- Password -->
        <base-input
          label="mot de passe"
          type="password"
          v-model="formData.password"
          name="password"
          id="password"
          placeholder="votre mot de passe"
          class="form-control"
          autocomplete="on"
        ></base-input>
        <p class="error" v-if="v$.password.$error">
          le mot de passe est requis
        </p>

        <!-- Form Submit Button -->
        <button class="sign-form--btn font-bold rounded-lg">
          Se connecter
        </button>
      </div>
    </form>
    <!-- Pop Up -->
    <div class="modal" v-if="isOpen">
      <p class="error">{{ msgErr }}</p>
    </div>
  </div>
</template>
