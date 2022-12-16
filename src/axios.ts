import axios from "axios";
import { MutationTypes } from "./store/modules/auth";
import store from "./store";

axios.defaults.baseURL = "https://overrun.24heures.org/api/v1/";

axios.defaults.withCredentials = true;


axios.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        return err.response;
    }
)
