import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";

export const navbarLink:{ title: string, path: string }[] = [
  { title: "home", path: "/home" },
  { title: "schedule", path: "/schedule" },
  { title: "data", path: "/data" },
];

export const routes:RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home",
    meta: {
      title: "Home | FoneGP",
    },
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
    meta: {
      title: "Home | FoneGP",
    },
  },
  {
    path: "/ranking",
    name: "ranking",
    component: () => import("../views/RankView.vue"),
    meta: {
      title: "Ranking | FoneGP",
    },
  },
  {
    path: "/schedule",
    name: "schedule",
    component: () => import("../views/ScheduleView.vue"),
    meta: {
      title: "Schedule | FoneGP",
    },
  },
  {
    path: "/data",
    name: "data",
    component: () => import("../views/DataView.vue"),
    children: [{ path: ":round", component: () => import("../views/DataView.vue") }],
    meta: {
      title: "Data | FoneGP",
    },
  },
  {
    name: "404",
    path: "/:pathMatch(.*)*",
    component: () => import("../views/NotFoundView.vue"),
    meta: {
      title: "404 | FoneGP",
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
