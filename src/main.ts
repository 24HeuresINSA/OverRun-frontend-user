import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./axios";
import axios from "axios";
import store from "./store";
import { MutationTypes } from "./store/modules/auth";

console.log(axios.defaults.baseURL);

export const edition = 1;

router.beforeEach(async (to, from) => {
  if (store.getters.getAccessToken === ""
    && to.name !== "BeforeReagistration"
    && to.name !== "Login"
    && to.name !== "Register"
    ) {
    return { name: "BeforeReagistration" };
  }
});

createApp(App).use(router).use(store).mount("#app");
