<template>
  <div class="container-fluid h-100">
    <div class="row login">
      <div class="col mt-5">
        <h1>Se connecter</h1>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-lg"></div>
      <div class="col col-lg-3 text-start fw-bold">
        <div class="row mt-4">
          <form>
            <div class="row m-2">
              <div class="col form-group">
                <label for="inputEmail">Email : </label>
                <input
                  type="text"
                  class="form-control"
                  id="inputTeamPassword"
                  v-model="email"
                />
              </div>
            </div>

            <div class="row m-2">
              <div class="col form-group">
                <label for="inputTeamPassword">Mot de passe : </label>
                <input
                  type="password"
                  class="form-control"
                  id="inputTeamPassword"
                  v-model="password"
                />
                <div id="forgottentPassword fw-light" class="form-text mt-1">
                  <router-link :to="{ name: 'ResetPasswordRequest' }" class="fw-light"
                    >Mot de passe oublié?</router-link
                  >
                </div>
              </div>
            </div>
            <div class="row m-2 mt-5">
              <div class="col text-center">
                <button type="button" class="btn btn-primary">
                  Se connecter
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="col-lg"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  components: {},
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    login() {
      console.log("Login");
    },
  },
});
</script>

<style scoped>
.login {
  margin-top: 5%;
}
</style>
