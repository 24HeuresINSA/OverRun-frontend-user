import { createStore } from "vuex";
import authModule from "./modules/auth";
import editionModule from "./modules/edition";
import userModule from "./modules/user";

const store = createStore({
  state: {
    ...authModule.state,
    ...editionModule.state,
    ...userModule.state,
  },

  modules: {
    auth: authModule,
    edition: editionModule,
    me: userModule,
  },
});

export default store;
