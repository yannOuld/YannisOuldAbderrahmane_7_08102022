import { createRouter, createWebHistory } from "vue-router";
import Sign from "../views/Sign.vue";
import Profil from "../views/Profil.vue";
import Post from "../views/Post.vue";
import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";
import Admin from "../views/Admin.vue";

const authRequired = true;
const adminRequired = true;
const routes = [
  { path: "/login", component: Sign, meta: {}, },
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
});

//Guardian redirection and public pages
router.beforeEach(async (to) => {
  if (to.meta.authRequired && auth.userData) {
    return { path: '/login', query: { redirect: to.fullPath } };
  }

  if (to.meta.adminRequired && auth.userData?.role !== 'admin') {
    return { path: '/', query: { redirect: to.fullPath } }
  }
});

export default router;
