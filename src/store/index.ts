import { createStore } from "vuex";
import authModule, { State as AuthState } from "./modules/auth";
import editionModule, { State as EditionState } from "./modules/edition";
import userModule, { State as UserState } from "./modules/user";

export type State = AuthState & EditionState & UserState;

const store = createStore<State>({
  modules: {
    auth: authModule,
    edition: editionModule,
    user: userModule,
  },
});

export default store;
