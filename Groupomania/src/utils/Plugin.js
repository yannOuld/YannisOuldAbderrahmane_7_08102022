import Navigation from '../components/Utils/Navigation.vue'
import BaseInput from '../components/Utils/BaseInput.vue'
import BaseTextArea from '../components/Utils/BaseTextArea.vue'
export default {
    install: (app, options) => {
        app.component('navigation-links', Navigation);
        app.component('base-input', BaseInput);
        app.component('base-textarea', BaseTextArea);
    }
}