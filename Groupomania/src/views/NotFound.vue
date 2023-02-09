<template>
  <div>
    <h1 class="nofound-title">Not Found</h1>

    <div>
      <img
        class="nofound-img"
        src="../assets/images/matrix.jpg"
        alt="photo de l'agent smith"
      />
      <p class="nofound-txt">
        Désolée Neo ! Il est trop tot pour pouvoir quitter la matrice du site !
      </p>
      <button class="nofound-btn" @click="home">Revenir à l'Accueil</button>
    </div>
  </div>
</template>

<script>
  import { useRouter } from "vue-router";
  export default {
    name: "NotFound",
    setup() {
      const router = useRouter();
      const home = () => {
        router.push("/home");
      };
      return {
        home,
      };
    },
  };
</script>
