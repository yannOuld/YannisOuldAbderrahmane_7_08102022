<template>
  <div class="bloc">
    <h1>Connexion</h1>
    <form @submit.prevent="submit()" autocomplete="on">
      <div class="form-row">
        <!-- Email -->
        <div class="form-group">
          <base-input
            v-model="formData.email"
            label="email"
            placeholder="email@groupomania.com"
            name="email"
            id="email"
            type="email"
          ></base-input>
          <p v-if="v$.email.$error">une adresse email valide est requise</p>
        </div>
        <!-- Password -->
        <div class="form-group">
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
          <p v-if="v$.password.$error">le mot de passe est requis</p>
        </div>
        <!-- Form Submit Button -->
        <div class="text-center">
          <button class="btn">Se connecter</button>
        </div>
      </div>
    </form>
    <!-- Pop Up -->
    <div class="modal" v-if="isOpen">
      <p class="error">{{ msgErr }}</p>
      <p class="succes">{{ msgSucces }}</p>
    </div>
  </div>
</template>

<script>
import { reactive, computed, ref } from "vue";
import { useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { useAuthStore } from "../../stores/auth";

export default {
  name: "LoggIn",
  setup() {
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

    // modal variables
    let isOpen = ref(false);
    let msgErr = ref("");
    let closePopup;

    //modal display
    const showPopup = () => {
      {
        isOpen.value = true;
        clearTimeout(closePopup);

        closePopup = setTimeout(() => {
          msgErr.value = "";
          isOpen.value = false;
        }, 2000);
      }
    };

    // router
    const router = useRouter();

    // vuelidate variable
    const v$ = useVuelidate(rules, formData);

    //form submit function
    const submit = async () => {
      // inputs validation
      const validation = await v$._value.$validate();
      if (!validation) {
        msgErr.value = "Tout les champs doivent être remplis";
        return showPopup();
      }

      // fetch with the store
      try {
        const response = await login(formData);
        if (!response) {
          msgErr.value = "les identifiants ne correspondent à aucun compte";
          showPopup();
        }
        return response;
      } catch (error) {
        return;
      }
    };

    return {
      v$,
      formData,
      submit,
      router,
      isOpen,
      msgErr,
    };
  },
};
</script>

<style scoped>
h1 {
  font-weight: 700;
}

p {
  color: red;
  padding: 0;
  margin: 0;
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.form-row {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 400px;
}
.bloc {
  text-align: center;
  margin: auto;
  border: solid 2px;
  border-radius: 15px;
  padding: 10px;
  width: 500px;
  font-size: 16px;
  background-color: white;
}

.form-control {
  width: 200px;
}

input {
  margin: 10px;
}

.link {
  color: cornflowerblue;
  cursor: pointer;
  font-weight: 700;
}

.logo {
  width: 300px;
  background-color: transparent;
  color: brown;
  margin: 0 20px;
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

.alert {
  color: red;
  font-weight: 900;
}
</style>
