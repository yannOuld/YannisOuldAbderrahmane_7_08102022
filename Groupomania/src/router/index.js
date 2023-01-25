
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth.js';
import SignView from '../views/Sign.vue';
import ProfilView from '../views/Profil.vue';
import PostView from '../views/Post.vue';
import HomeView from '../views/Home.vue';
import NotFound from '../views/NotFound.vue'

const routes = [
    {
        path: '/',
        name: 'SignView',
        component: SignView,
        meta: {
            title: 'Inscription'
        }
    },

    {
        path: '/home',
        name: HomeView,
        component: HomeView,
        props: true,
        meta: {
            title: 'Accueil',
            description: 'page des posts'
        }
    },

    {
        path: '/profil/:uuid',
        name: 'ProfilView',
        component: ProfilView,
        props: true,
        meta: {
            title: 'Profil',
            description: 'page de profil'
        }
    },

    {
        path: '/post/:uuid',
        name: 'PostView',
        component: PostView,
        props: true,
        meta: {
            title: 'Post de',
            description: 'page de post'
        }
    },

    {
        path: '/:pathMatch(.*)',
        name: 'NotFound',
        component: NotFound,
        meta: {
            title: 'not found',
            description: 'page non trouvée'
        }
    }



]

// creation du router 
const router = createRouter({

    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: 'active',
    routes
})


// mise en place des pages publique et redirections en cas de non connection 
router.beforeEach(async (to) => {
    // page publique (signview)
    const publicPages = ['/'];
    // pages non publiques
    const authRequired = !publicPages.includes(to.path);
    // store pinia 
    const auth = useAuthStore();

    // si la page est non publique et que le user est non connecté
    if (authRequired && !auth.userData) {
        // retour sur SignView la page login / inscription
        auth.returnUrl = to.fullPath;
        return '/';
    }
});

export default router