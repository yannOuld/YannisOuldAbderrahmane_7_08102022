import Navigation from '../components/Utils/Navigation.vue'
import BaseInput from '../components/Utils/BaseInput.vue'
import BaseTextArea from '../components/Utils/BaseTextArea.vue'
import PostForm from '../components/Post/PostForm.vue'
import Comments from '../components/Comment/Comments.vue'
import CommentForm from '../components/Comment/CommentForm.vue'

export default {
    install: (app, options) => {
        app.component('navigation-links', Navigation);
        app.component('base-input', BaseInput);
        app.component('base-textarea', BaseTextArea);
        app.component('comments-wrapper', Comments);
        app.component('comment-form', CommentForm);
        app.component('post-form', PostForm);
    }
}