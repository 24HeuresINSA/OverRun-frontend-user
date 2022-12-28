import { Athlete } from "@/types/interface";
import axios from "axios";
import { ActionContext, ActionTree, GetterTree, MutationTree } from "vuex";

export const state = {
  me: {} as Athlete,
};

export type State = typeof state;

export enum MutationTypes {
  SET_USER_ME = "SET_USER_ME",
}

export type Mutations<S = State> = {
  [MutationTypes.SET_USER_ME](state: S, payload: Athlete): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_USER_ME](state, payload: Athlete) {
    state.me = payload;
  },
};

export type Getters = {
  getMe(state: State): Athlete;
};

export const getters: GetterTree<State, State> & Getters = {
  getMe: (state) => {
    return state.me;
  },
};

export type Actions = {
  setMe(context: ActionContext<State, State>, payload: Athlete): void;
};

export const actions: ActionTree<State, State> & Actions = {
  async setMe({ commit, rootGetters }) {
    const meResponse = await axios.get("/athletes/me", {
      headers: {
        Authorization: `Bearer ${rootGetters.getAccessToken}`,
      },
    });
    commit(MutationTypes.SET_USER_ME, meResponse.data);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
