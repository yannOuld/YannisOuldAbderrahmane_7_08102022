<template>
  <div>
    <header class="navigation">
      <navigation-links v-once></navigation-links>
    </header>

    <main v-if="mode.state == 'read'">
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
.navigation {
  width: 100%;
  display: flex;
  justify-content: center;
}

.infos {
  display: flex;
  flex-direction: column;
  margin: 60px auto 10px;
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

img {
  width: 250px;
  height: 250px;
  border-radius: 20px;
}
h2 {
  text-align: left;
}

.switch-btn {
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 2;
}
</style>
