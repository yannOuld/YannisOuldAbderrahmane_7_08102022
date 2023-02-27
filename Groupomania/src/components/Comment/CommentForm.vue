<script setup>
  import { useAuthStore } from "../../stores/auth";
  import { useRoute } from "vue-router";
  import { useCommentStore } from "../../stores/comment";
  import { reactive, defineEmits } from "vue";

  const emit = defineEmits(["onCommentSubmit"]);

  // post uuid from the params
  const route = useRoute();
  const uuid = route.params.uuid;

  //user data from the store
  const { userData } = useAuthStore();
  const { user } = userData;

  // reactive form input and user id
  const formData = reactive({
    content: "",
    owner_id: user.id,
  });

  // sending a comment
  const { sendComment } = useCommentStore();

  async function submit() {
    await sendComment(uuid, formData);
  }
</script>

<template>
  <form
    class="comment-form"
    @submit.prevent="submit().then($emit('onCommentSubmit'))"
  >
    <base-textarea
      label="Commenter le post:"
      v-model="formData.content"
      maxlength="500"
      id="comment"
      name="comment"
    ></base-textarea>
    <button class="comment-form_btn">Envoyer</button>
  </form>
</template>

<style scoped>
  .comment-form {
    @apply w-3/4 my-3 py-3 rounded-2xl font-extrabold;
  }
  .comment-form_btn {
    @apply hover:-translate-y-1 hover:scale-90 hover:bg-gray-300 duration-300;
  }
</style>
