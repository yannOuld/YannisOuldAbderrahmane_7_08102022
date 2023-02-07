<template>
  <div>
    <navigation-links v-once></navigation-links>

    <div class="profil" v-if="mode.state == 'read'">
      <button class="profil-btn_switch" @click="switchModify()">
        modifier <font-awesome-icon icon="fa-solid fa-gear" />
      </button>
      <profil-page :author="author" />
    </div>

    <div class="profil" v-if="mode.state == 'modify'">
      <button class="profil-btn_switch" @click="switchRead()">
        Retour<font-awesome-icon icon="fa-solid fa-gear" />
      </button>
      <div class="profil">
        <profil-modify />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useUsersStore } from "../stores/users";
import { storeToRefs } from "pinia";
import { reactive, defineAsyncComponent } from "vue";
import ProfilModify from "../components/Profil/ProfilModify.vue";
import ProfilPage from "../components/Profil/ProfilPage.vue";

// mode for components display
const mode = reactive({
  state: "read" || "modify",
});
// method for mode read
const switchRead = () => {
  mode.state = "read";
};
// method for mode modify
const switchModify = () => {
  mode.state = "modify";
};
// retrieving user uuid from the params
const route = useRoute();
const uuid = route.params.uuid;

// fetching page user with the store
const { fetchOneAuthor } = useUsersStore();
fetchOneAuthor(uuid);
const { author } = storeToRefs(useUsersStore());
</script>
