<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script></script>

<style>
html,
body {
  @apply w-screen p-0 m-0 box-border font-lato;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.app {
  padding: 0;
  margin: auto;
  width: 100vw;
}
</style>
