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
input {
  margin: 5px 10px;
}
input[type="file"] {
  font-size: 14px;
  width: 150px;
  background: white;
  border-radius: 50px;
  outline: none;
  position: absolute;
  right: -200px;
  height: 15px;
  color: black;
  padding: 10px;
  align-items: center;
}
::-webkit-file-upload-button {
  display: none;
}
</style>
