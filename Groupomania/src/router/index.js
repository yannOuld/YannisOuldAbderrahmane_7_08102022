
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth.js';
import SignView from '../views/Sign.vue';
import ProfilView from '../views/Profil.vue';
import PostView from '../views/Post.vue';
import HomeView from '../views/Home.vue';
import NotFound from '../views/NotFound.vue';
import AdminView from '../views/Admin.vue';

// path to the components
const routes = [
    // Public Page
    {
        path: '/',
        name: 'SignView',
        component: SignView,

        meta: {
            title: 'Inscription'
        }
    },
    // Home component
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
    // Profil component
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
    // Post component
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
    // Admin DashBoard
    {
        path: '/admin',
        name: 'AdminView',
        component: AdminView
    },
    // Out of Boundaries 
    {
        path: '/:pathMatch(.*)',
        name: 'NotFound',
        component: NotFound,
        meta: {
            title: 'not found',
            description: 'page non trouvée'
        }
    },
]

//  router creation
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: 'active',
    routes
})


//Guardian redirection and public pages 
router.beforeEach(async (to) => {
    // public page (signview)
    const publicPages = ['/'];

    // not public page 
    const authRequired = !publicPages.includes(to.path);

    // pinia store auth 
    const auth = useAuthStore();

    // if not in public page and auth data missing
    if (authRequired && !auth.userData) {
        // return to public page
        auth.returnUrl = to.fullPath;
        return '/';
    }
});

export default router