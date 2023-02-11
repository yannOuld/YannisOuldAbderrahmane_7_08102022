<script setup>
  import { ref } from "vue";
  import { usePostStore } from "../../stores/posts";

  //props uuid from parent component
  const props = defineProps({
    uuid: { type: String, required: true },
  });

  // form inputs refs
  const title = ref(null);
  const content = ref(null);

  // submit post modification
  const { modifyPost } = usePostStore();

  const submit = async () => {
    const uuid = props.uuid;
    let formData;
    if (title.value === null) {
      formData = { content: content.value };
    } else if (content.value === null) {
      formData = { title: title.value };
    } else {
      formData = { title: title.value, content: content.value };
    }
    try {
      await modifyPost(uuid, formData);
    } catch (error) {
      console.log(error);
    }
  };
</script>

<template>
  <div>
    <form
      class="post-form_modify"
      enctype="multipart/form-data"
      @submit.prevent="submit()"
    >
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
