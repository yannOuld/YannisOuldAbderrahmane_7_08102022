<template>
  <form class="comment-form" @submit.prevent="submit()">
    <base-textarea
      label="Commenter le post:"
      v-model="formData.content"
      maxlength="500"
      id="comment"
      name="comment"
    ></base-textarea>
    <button class="btn">Envoyer</button>
  </form>
</template>

<script>
import { useAuthStore } from "../../stores/auth";
import { useRoute } from "vue-router";
import { useCommentStore } from "../../stores/comment";
import { reactive } from "vue";

export default {
  name: "CommentForm",
  setup() {
    // post uuid from the params
    const route = useRoute();
    const uuid = route.params.uuid;

    //user data from the store
    const { userData } = useAuthStore();
    const { user } = userData;

    // reactive form input and user id
    const formData = reactive({
      content: "",
      owner_id: null,
    });

    // sending a comment
    const { sendComment } = useCommentStore();
    const submit = async () => {
      formData.owner_id = user.id;
      try {
        await sendComment(uuid, formData);
        console.log(formData);
      } catch (error) {
        console.log("un probleme est survenu");
      }
    };

    return {
      submit,
      user,
      formData,
    };
  },
};
</script>

<style scoped>
.comment-form {
  @apply bg-red-600 font-extrabold text-white border-transparent flex flex-col justify-center items-center my-3 mx-auto rounded-2xl py-3 w-3/4 shadow-black shadow-lg;
}
.btn {
  @apply mx-auto my-5 py-1 px-2 rounded-md bg-white font-bold text-base cursor-pointer hover:-translate-y-1 hover:scale-90 hover:bg-gray-300 duration-300;
}
</style>
