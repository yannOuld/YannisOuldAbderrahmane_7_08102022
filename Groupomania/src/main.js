import { createApp } from 'vue';
import './style.css'
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import Plugin from './utils/Plugin';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPenToSquare, faHouse, faUser, faArrowRightFromBracket, faKey, faGear, faCircleXmark, faThumbsUp, faMessage, faCamera, faHeart } from '@fortawesome/free-solid-svg-icons';

library.add(faPenToSquare, faCamera, faHouse, faUser, faArrowRightFromBracket, faKey, faGear, faCircleXmark, faThumbsUp, faMessage, faHeart);

const pinia = createPinia();
pinia.use(createPersistedState({ storage: sessionStorage, }));

createApp(App)
    .use(pinia)
    .use(Plugin)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app');


