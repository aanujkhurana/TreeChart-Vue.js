import { createRouter, createWebHistory } from "vue-router";
import Playground from "@/views/playground.vue";
import About from "@/views/about.vue";
import AddNode from "@/views/add_node.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "playground",
      component: Playground,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: About,
    },
    {
      path: "/add",
      name: "add",
      component: AddNode,
    },
  ],
});

export default router;
