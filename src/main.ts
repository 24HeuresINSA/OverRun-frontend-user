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
    to.name !== "ResetPassword" &&
    (to.name !== "RegisterPayment" || to.query.token === undefined)
  ) {
    return { name: "BeforeReagistration" };
  }
});

store.dispatch("edition/setEdition").then(() => {
  createApp(App).use(router).use(store).mount("#app");
});
