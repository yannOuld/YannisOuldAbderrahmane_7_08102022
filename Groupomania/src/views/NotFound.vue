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
      <router-link to="/" class="no-underline text-white">
        <button class="nofound-btn">Revenir à l'Accueil</button>
      </router-link>
    </div>
  </div>
</template>
