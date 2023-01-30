<template>
  <div>
    <navigation-links v-once></navigation-links>

    <main class="infos" v-if="mode.state == 'read'">
      <button class="switch-btn" @click="switchModify()">
        modifier <font-awesome-icon icon="fa-solid fa-gear" />
      </button>
      <profil-page :author="author" />
    </main>

    <div class="infos" v-if="mode.state == 'modify'">
      <button class="switch-btn" @click="switchRead()">
        Retour<font-awesome-icon icon="fa-solid fa-gear" />
      </button>
      <div class="infos">
        <profil-modify :uuid="uuid" />
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { useUsersStore } from "../stores/users";
import { storeToRefs } from "pinia";
import { reactive, defineAsyncComponent } from "vue";
import ProfilModify from "../components/Profil/ProfilModify.vue";

export default {
  name: "ProfilView",
  components: {
    ProfilPage: defineAsyncComponent(() =>
      import("../components/Profil/ProfilPage.vue")
    ),
    ProfilModify,
  },
  setup() {
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

    return { route, author, mode, uuid, switchRead, switchModify };
  },
};
</script>

<style scoped>
.infos {
  @apply flex flex-col mt-10 mb-16 mx-auto items-center text-base w-10/12 bg-orange-100 rounded-2xl relative;
}

h2 {
  @apply text-left;
}

.switch-btn {
  @apply absolute right-3 top-3 z-20;
}
</style>
