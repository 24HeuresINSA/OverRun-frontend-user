import axios from "axios";
import { createApp } from "vue";
import App from "./App.vue";
import "./axios";
import router from "./router";
import store from "./store";

console.log(axios.defaults.baseURL);

export const edition = 1;

router.beforeEach(async (to, from) => {
  if (
    store.getters.getAccessToken === "" &&
    to.name !== "BeforeReagistration" &&
    to.name !== "Login" &&
    to.name !== "Register" &&
    to.name !== "ResetPassword"
  ) {
    return { name: "BeforeReagistration" };
  }
});

createApp(App).use(router).use(store).mount("#app");
