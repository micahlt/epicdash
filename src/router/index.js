import { createRouter, createWebHashHistory } from "vue-router";
import Tabs from "../views/HomePage.vue";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
  {
    path: "/404",
    component: () => import("../views/NotFoundPage.vue"),
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
    path: "/portals",
    component: () => import("../views/PortalsPage.vue"),
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
