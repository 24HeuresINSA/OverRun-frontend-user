import { Edition } from "@/types/edition";
import axios from "axios";
import { ActionContext, ActionTree, GetterTree, MutationTree } from "vuex";

export const state = {
  edition: {} as Edition,
};

export type State = typeof state;

export enum MutationTypes {
  SET_EDITION_ID = "SET_EDITION_ID",
}

export type Mutations<S = State> = {
  [MutationTypes.SET_EDITION_ID](state: S, payload: Edition): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_EDITION_ID](state, payload: Edition) {
    state.edition = payload;
  },
};

export type Getters = {
  getEditionId(state: State): number;
  isRegistrationOpen(state: State): boolean;
  getRegistrationStartDate(state: State): Date;
  getRegistrationEndDate(state: State): Date;
};

export const getters: GetterTree<State, State> & Getters = {
  getEditionId: (state) => {
    return state.edition.id;
  },
  isRegistrationOpen: (state) => {
    const now = new Date();
    const registrationStart = new Date(state.edition.registrationStartDate);
    const registrationEnd = new Date(state.edition.registrationEndDate);

    return now >= registrationStart && now <= registrationEnd;
  },
  getRegistrationStartDate: (state) => {
    return new Date(state.edition.registrationStartDate);
  },
  getRegistrationEndDate: (state) => {
    return new Date(state.edition.registrationEndDate);
  },
};

export type Actions = {
  setEdition(context: ActionContext<State, State>, payload: number): void;
};

export const actions: ActionTree<State, State> & Actions = {
  async setEdition({ commit }) {
    const curentEditionResponse = await axios.get("/edition/curent");
    commit(MutationTypes.SET_EDITION_ID, curentEditionResponse.data);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
