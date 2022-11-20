import axios from "axios";
import { MutationTypes } from "./store/modules/auth";
import store from "./store";

axios.defaults.baseURL = "http://localhost:8000/api/v1/";

axios.defaults.withCredentials = true;


// axios.interceptors.response.use(
//     (res) => {
//         return res;
//     }, 
//     async (err) => {
//         const originalConfig = err.config;
//         if(originalConfig)
//     }
// )
