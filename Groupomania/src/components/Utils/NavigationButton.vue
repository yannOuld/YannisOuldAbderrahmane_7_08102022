<script setup>
  const props = defineProps({
    to: { type: String },
    class: { type: String },
    asActive: { type: String },
    asInactive: { type: String },
    icon: { type: String },
    name: { type: String },
  });

  const defaultClass =
    "hover:-translate-y-1  hover:bg-orange-500 duration-300 navigation-btn";
</script>

<template>
  <router-link custom :to="props.to" v-slot="{ isActive, href, navigate }">
    <button
      v-bind="props"
      :href="href"
      @click="navigate"
      :class="(isActive ? asActive : asInactive) + props.class + defaultClass"
    >
      <span class="navigation-btn_icon">
        <font-awesome-icon :icon="props.icon" />
      </span>
      {{ props.name }}
    </button>
  </router-link>
</template>
