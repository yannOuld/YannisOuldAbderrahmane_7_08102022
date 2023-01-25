<template>
  <div>
    <label :for="name">{{ label }}</label>
    <textarea
      :rows="rows"
      :cols="cols"
      :maxlength="maxlength"
      :name="name"
      :value="modelValue"
      :id="id"
      v-bind="$attrs"
      @textarea="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: "",
  },
  maxlength: {
    type: String,
    default: "500",
  },
  rows: {
    type: String,
    default: "5",
  },
  cols: {
    type: String,
    default: "60",
  },
  name: {
    type: String,
    default: "",
  },
  id: {
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
  display: flex;
  flex-direction: column;
}
textarea {
  resize: none;
}
</style>
