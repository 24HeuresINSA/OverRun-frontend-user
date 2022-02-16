import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./axios";
import axios from "axios";
import store from "./store";

console.log(axios.defaults.baseURL);

createApp(App).use(router).use(store).mount("#app");
