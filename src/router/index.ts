import { createRouter, createWebHistory } from "vue-router";
import SearchView from "../views/SearchView.vue";
import TvShowsView from "../views/TvShowsView.vue";
import TopShowsView from "../views/TopShowsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: { name: "tv-shows" },
    },
    {
      path: "/search",
      name: "search",
      component: SearchView,
    },
    {
      path: "/top-shows",
      name: "top-shows",
      component: TopShowsView,
    },
    {
      path: "/tv-shows",
      name: "tv-shows",
      component: TvShowsView,
      meta: {
        viewByCountry: true,
      },
    },
    {
      path: "/shows",
      name: "shows",
      component: TvShowsView,
    },
    {
      path: "/*",
      redirect: { name: "tv-shows" },
    },
  ],
});

export default router;
