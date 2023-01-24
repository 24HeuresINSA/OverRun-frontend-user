import { createApp } from "vue";
import App from "./App.vue";
import "./axios";
import router from "./router";
import store from "./store";
import { MutationTypes } from "./store/modules/auth";

router.beforeEach(async (to, from) => {
  const accessToken = sessionStorage.getItem("accessToken");
  const refreshToken = sessionStorage.getItem("refreshToken");
  if (accessToken && refreshToken && from.name === undefined) {
    store.commit(`auth/${MutationTypes.SET_ACCESS_TOKEN}`, accessToken);
    store.commit(`auth/${MutationTypes.SET_REFRESH_TOKEN}`, refreshToken);
    const base64Url = store.getters["auth/getAccessToken"].split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    store.commit(`auth/${MutationTypes.SET_USER}`, JSON.parse(jsonPayload).id);
    store.commit(
      `auth/${MutationTypes.SET_ATHLETE_ID}`,
      JSON.parse(jsonPayload).id
    );
  }

  if (
    store.getters["auth/getAccessToken"] === "" &&
    to.name !== "BeforeReagistration" &&
    to.name !== "Login" &&
    to.name !== "Register" &&
    to.name !== "ResetPassword" &&
    (to.name !== "RegisterPayment" || to.query.token === undefined) &&
    (to.name !== "HelloAssoReturn" || to.query.type === undefined)
  ) {
    return { name: "BeforeReagistration" };
  }
});

store.dispatch("edition/setEdition").then(() => {
  createApp(App).use(router).use(store).mount("#app");
});
