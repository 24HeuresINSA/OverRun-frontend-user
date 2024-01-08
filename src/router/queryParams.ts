import { MutationTypes } from "@/store/modules/auth";
import { RouteLocation } from "vue-router";
import store from "../store";

export function setUserWithJWT(to: RouteLocation): void {
  if (to.query.token) {
    store.commit(`auth/${MutationTypes.SET_ACCESS_TOKEN}`, to.query.token);
    store.dispatch("user/setMe");
  }
}

export function openRegistrationGuard(to: RouteLocation) {
  if(!store.getters["edition/isRegistrationOpen"] && to.name !== "Home") {
    return { name : 'Home' }
  }
}
