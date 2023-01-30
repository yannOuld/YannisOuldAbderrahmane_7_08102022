<template>
  <div>
    <label :for="name">{{ label }}</label>
    <input
      type="text"
      :placeholder="placeholder"
      :name="name"
      :value="modelValue"
      :id="id"
      v-bind="$attrs"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
div {
  @apply flex flex-col;
}
input {
  @apply w-3/4 my-1 mx-auto file:rounded-full file:bg-white file:py-2 file:px-6 file:cursor-pointer file:font-bold;
}
label {
  @apply mx-auto;
}
</style>
