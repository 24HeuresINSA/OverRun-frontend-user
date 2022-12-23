import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    return err.response;
  }
);
