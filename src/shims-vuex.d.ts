import { Store as authStore } from "@/store/modules/auth";
import { Store as editionStore } from "@/store/modules/edition";
import { Store as userStore } from "@/store/modules/user";

export type Store = authStore & editionStore & userStore;

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store;
  }
}
