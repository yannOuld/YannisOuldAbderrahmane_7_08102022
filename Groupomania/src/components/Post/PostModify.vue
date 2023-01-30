<template>
  <div>
    <form enctype="multipart/form-data" class="form" @submit.prevent="submit()">
      <h2>Modifier le Post</h2>
      <div class="form-control">
        <div class="form-control">
          <base-input
            v-model="title"
            label="changer le titre"
            name="title"
            id="title"
          ></base-input>
        </div>

        <div class="form-control">
          <base-input
            type="file"
            name="img"
            id="img"
            accept="image/png, image/jpeg, image/bmp, image/gif, image/jpg"
            @change="handleFileUpload"
          ></base-input>
        </div>
        <div class="form-control">
          <base-input
            v-model="content"
            label="changer le message"
            name="content"
            id="content"
          ></base-input>
        </div>

        <button class="btn">modifier le post</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import { usePostStore } from "../../stores/posts";

//props uuid from parent component
const props = defineProps({
  uuid: { type: String, required: true },
});

// form inputs refs
const fileTarget = ref(null);
const title = ref(null);
const content = ref(null);

// file input handling
const handleFileUpload = (event) => {
  fileTarget.value = event.target.files[0];
  console.log(fileTarget.value);
};

// submit post modification
const { modifyPost } = usePostStore();
const submit = async () => {
  const uuid = props.uuid;

  try {
    const formData = new FormData();
    if (title.value != null) {
      formData.append("title", title.value);
    }
    if (fileTarget.value != null) {
      formData.append("image", fileTarget.value, fileTarget.value.name);
    }
    if (content.value != null) {
      formData.append("content", content.value);
    }

    await modifyPost(uuid, formData);
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped>
.form {
  @apply flex bg-gray-600 border-none flex-col justify-center items-center mx-auto text-white w-11/12;
}
.form-control {
  @apply flex flex-col justify-center mt-2 mx-auto;
}

.btn {
  @apply mx-auto my-5 py-1 px-2 rounded-md bg-white font-bold text-base cursor-pointer hover:-translate-y-1 hover:scale-90 hover:bg-gray-300 duration-300;
}
</style>
