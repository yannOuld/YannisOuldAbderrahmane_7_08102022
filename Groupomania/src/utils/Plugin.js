import Navigation from "../components/Navigation/Navigation.vue";
import SignNavigation from '../components/Navigation/SignNavigation.vue';
import BaseInput from "../components/Forms/BaseInput.vue";
import BaseTextArea from "../components/Forms/BaseTextArea.vue";
import CommentForm from "../components/Comment/CommentForm.vue";

export default {
  install: (app, options) => {
    app.component("navigation-links", Navigation);
    app.component("navigation-sign", SignNavigation);
    app.component("base-input", BaseInput);
    app.component("base-textarea", BaseTextArea);
    app.component("comment-form", CommentForm);

  },
};
