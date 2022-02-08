import { createRouter, createWebHashHistory } from "vue-router";
import Tabs from "../views/HomePage.vue";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: () => import("../views/HomePage.vue"),
  },
  {
    path: "/sites",
    component: () => import("../views/SitesPage.vue"),
  },
  {
    path: "/settings",
    component: () => import("../views/SettingsPage.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
