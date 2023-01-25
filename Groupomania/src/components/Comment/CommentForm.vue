<template>
  <form class="form" @submit.prevent="submit()">
    <base-textarea
      label="Commenter le post:"
      v-model="formData.content"
      rows="6"
      cols="80"
      maxlength="500"
      id="comment"
      name="comment"
    ></base-textarea>
    <button>Envoyer</button>
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
form {
  text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000,
    -1px -1px 0 #000;
  color: white;
  border: 1px solid transparent;
  background-color: #fd2d01;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px auto 0;
  border-radius: 15px;
  padding: 10px auto;
}

button {
  margin: 20px auto;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: white;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
}
</style>
