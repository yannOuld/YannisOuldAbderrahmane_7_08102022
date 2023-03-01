<script setup>
  import { ref, onMounted, onBeforeMount } from "vue";

  const scrollTopButton = ref(null);
  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
  });

  onBeforeMount(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  function handleScroll() {
    const scrollBtn = scrollTopButton.value;

    if (window.scrollY > 0) {
      scrollBtn?.classList.remove("invisible");
    } else {
      scrollBtn?.classList.add("invisible");
    }
  }
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
</script>
<template>
  <div ref="scrollTopButton" class="fixed w-40 bottom-10 right-10 z-40">
    <div class="text-gray-400 hover:text-blue-400 transition">
      <button @click="scrollToTop" class="navigation-btn rounded-none">
        <font-awesome-icon icon="fa-solid fa-arrow-up" /> &nbsp; Up
      </button>
    </div>
  </div>
</template>
