<template>
  <div class="container-fluid h-100 p-0">
    <ResetPassword
      v-show="showResetPasswordModal"
      @closeResetPasswordModal="toggleResetPasswordModal"
    />

    <div class="row login">
      <div class="col mt-5">
        <h1>Se connecter</h1>
      </div>
    </div>

    <div class="row">
      <div class="col-lg"></div>
      <div class="col col-lg-3 text-start fw-bold">
        <div class="row mt-4">
          <form @submit.prevent="login">
            <div class="row m-2">
              <div class="col form-group">
                <label for="inputEmail">Email : </label>
                <input
                  type="text"
                  class="form-control"
                  id="inputEmail"
                  v-model="email"
                  required
                />
              </div>
            </div>

            <div class="row m-2">
              <div class="col form-group">
                <label for="inputPassword">Mot de passe : </label>
                <input
                  type="password"
                  class="form-control"
                  id="inputPassword"
                  v-model="password"
                  required
                />
                <div
                  id="forgottentPassword fw-light"
                  class="form-text mt-1 row"
                >
                  <a href="#" class="col" @click="toggleResetPasswordModal"
                    >Mot de passe oublié?</a
                  >
                  <RouterLink class="col text-end" to="/register"
                    >S'inscrire</RouterLink
                  >
                </div>
              </div>
            </div>
            <div class="row m-2 mt-5">
              <div class="col text-center">
                <button type="submit" class="btn btn-primary">
                  Se connecter
                </button>
              </div>
            </div>
          </form>
        </div>
        <div class="row m-2 mt-4" v-show="errorMsg">
          <div class="col text-center">
            <p class="text-danger">{{ errorMsg }}</p>
          </div>
        </div>
      </div>
      <div class="col-lg"></div>
    </div>
  </div>
</template>

<script lang="ts">
import ResetPassword from "@/components/modal/ResetPassword.vue";
import { MutationTypes } from "@/store/modules/auth";
import { Inscription } from "@/types/interface";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    ResetPassword,
  },
  data() {
    return {
      email: null,
      password: null,
      showResetPasswordModal: false,
      errorMsg: "",
    };
  },
  methods: {
    async login() {
      const response = await axios.post("login", {
        email: this.email,
        password: this.password,
      });

      if (response.status === 401) return (this.errorMsg = "Email incorrect");
      if (response.status === 400)
        return (this.errorMsg = "Mot de passe incorrect");

      if (response.status === 200) {
        this.$store.commit(
          `auth/${MutationTypes.SET_ACCESS_TOKEN}`,
          response.data.accessToken
        );
        this.$store.commit(
          `auth/${MutationTypes.SET_REFRESH_TOKEN}`,
          response.data.refreshToken
        );
        const base64Url =
          this.$store.getters["auth/getAccessToken"].split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );
        this.$store.commit(
          `auth/${MutationTypes.SET_USER}`,
          JSON.parse(jsonPayload).id
        );
        this.$store.dispatch("user/setMe").then(() => {
          if (
            this.$store.getters["user/getMe"].inscriptions.length == 0 ||
            this.$store.getters["user/getMe"].inscriptions.some(
              (inscription: Inscription) =>
                inscription.edition.id !==
                this.$store.getters["edition/getEditionId"]
            )
          ) {
            if (!this.$store.getters["edition/isRegistrationOpen"]) {
              alert("Désolé, mais il est trop tôt/tard pour s'inscrire");
              return this.$router.push("/");
            }
            return this.$router.push({ name: "RegisterTeam" });
          }
          this.$router.push("/");
        });
      }
    },
    toggleResetPasswordModal() {
      this.showResetPasswordModal = !this.showResetPasswordModal;
    },
  },
});
</script>

<style scoped>
.login {
  margin-top: 5%;
}
</style>
