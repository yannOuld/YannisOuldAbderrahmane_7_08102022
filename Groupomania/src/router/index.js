import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth.js";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Profil from "../views/Profil.vue";
import Post from "../views/Post.vue";
import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";
import Admin from "../views/Admin.vue";


const authRequired = true;
const adminRequired = true;

const routes = [
  { path: "/login", component: Login, meta: {}, },
  { path: "/register", component: Register, meta: {}, },
  { path: "/", component: Home, meta: { authRequired }, },
  { path: "/profil/:uuid", component: Profil, meta: { authRequired }, },
  { path: "/post/:uuid", component: Post, meta: { authRequired }, },
  { path: "/admin", component: Admin, meta: { adminRequired } },
  { path: "/:pathMatch(.*)", component: NotFound, meta: { authRequired }, },
];

//  router creation
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "active",
  routes,
  base: '/login',
});

//Guardian redirection and public pages
router.beforeEach(async (to) => {
  const auth = useAuthStore()
  if (to.meta.authRequired && !auth.userData) {
    return { path: '/login', query: { redirect: to.fullPath } };
  }

  if (to.meta.adminRequired && !auth.authAdmin) {
    return { path: '/', query: { redirect: to.fullPath } }
  }
});

export default router;
