import axios from "axios";
import { createApp } from "vue";
import App from "./App.vue";
import "./axios";
import router from "./router";
import store from "./store";

router.beforeEach(async (to, from) => {
  if (
    store.getters["auth/getAccessToken"] === "" &&
    to.name !== "BeforeReagistration" &&
    to.name !== "Login" &&
    to.name !== "Register" &&
    to.name !== "ResetPassword"
  ) {
    return { name: "BeforeReagistration" };
  }
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${store.getters["auth/getAccessToken"]}`;
});

store.dispatch("edition/setEdition").then(() => {
  createApp(App).use(router).use(store).mount("#app");
});
