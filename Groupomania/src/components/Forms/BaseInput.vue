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
