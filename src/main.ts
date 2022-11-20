import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./axios";
import axios from "axios";
import store from "./store";
import { MutationTypes } from "./store/modules/auth";

console.log(axios.defaults.baseURL);

export const edition = 1;

store.commit(
  MutationTypes.SET_ACCESS_TOKEN,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJUZXN0UHNldWRvIiwicm9sZSI6IkFUSExFVEUiLCJleHBpcmVfYXQiOiIyMDIyLTAyLTE4VDAwOjE2OjU3LjQwOFoiLCJhdGhsZXRlSWQiOjUsImFkbWluSWQiOm51bGwsImlhdCI6MTY0NTExMzQxNywiZXhwIjoxNjQ1MTQzNDE3fQ.HaarXG7GgF0WLTF3aUOyDjLGn90LvPqMcs8WPun6m7A"
);

createApp(App).use(router).use(store).mount("#app");
