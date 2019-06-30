import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home.vue";
import Results from "./views/Results.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/results",
      name: "results",
      component: Results
    }
  ]
});
