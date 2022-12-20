import axios from "axios";
import store from "./store";

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

axios.defaults.withCredentials = true;
axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${store.getters.getAccessToken}`;

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    return err.response;
  }
);
