<template>
  <div class="container">
    <h1 class="nofound-title">Not Found</h1>

    <div>
      <img
        class="nofound-img"
        src="../assets/images/icon.webp"
        alt="photo de l'agent smith"
      />
      <p class="nofound-txt font-bold">
        Désolée Neo ! Il est trop tot pour pouvoir quitter la matrice du site !
      </p>
      <router-link to="/" class="no-underline text-white">
        <button class="nofound-btn">Revenir à l'Accueil</button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
  .nofound-title {
    @apply text-2xl font-extrabold;
  }
  .nofound-img {
    @apply w-8/12;
  }
  .nofound-btn {
    @apply text-white bg-green-600 text-lg;
  }
  .nofound-txt {
    @apply text-xl;
  }
</style>
