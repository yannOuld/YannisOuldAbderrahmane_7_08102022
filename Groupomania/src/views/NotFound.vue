<template>
  <main>
    <h1>Not Found</h1>

    <div>
      <img src="../assets/images/matrix.jpg" alt="photo de l'agent smith" />
      <p>
        Désolée Neo ! Il est trop tot pour pouvoir quitter la matrice du site !
      </p>
      <button @click="home">Revenir à l'Accueil</button>
    </div>
  </main>
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

<style scoped>
h1 {
  font-size: 25px;
  font-weight: 900;
  justify-content: center;
}
img {
  width: 500px;
  justify-content: center;
  border-radius: 10px;
}
button {
  color: white;
  background-color: green;
  font-size: 18px;
}
div {
  display: flex;
  flex-direction: column;
  align-items: center;
}
p {
  font-size: 18px;
  font-weight: 700;
}
</style>
