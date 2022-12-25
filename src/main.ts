import axios from "axios";
import { createApp } from "vue";
import App from "./App.vue";
import "./axios";
import router from "./router";
import store from "./store";
import { MutationTypes } from "./store/modules/auth";

router.beforeEach(async (to, from) => {
  store.commit(
    MutationTypes.SET_ACCESS_TOKEN,
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ0aXQiLCJyb2xlIjoiQVRITEVURSIsImV4cGlyZV9hdCI6IjIwMjItMTItMjZUMDQ6MjA6NTEuMzE2WiIsImF0aGxldGVJZCI6MSwiYWRtaW5JZCI6bnVsbCwiaWF0IjoxNjcxOTk4NDUxLCJleHAiOjE2NzIwMjg0NTF9.WkczXtjUcRIJlgI7D7xc4DQQn59ll0tZTDB1jN8PM3M"
  );

  // if (
  //   store.getters.getAccessToken === "" &&
  //   to.name !== "BeforeReagistration" &&
  //   to.name !== "Login" &&
  //   to.name !== "Register" &&
  //   to.name !== "ResetPassword"
  // ) {
  //   return { name: "BeforeReagistration" };
  // }
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${store.getters.getAccessToken}`;
});

store.dispatch("setEditionId").then(() => {
  createApp(App).use(router).use(store).mount("#app");
});
