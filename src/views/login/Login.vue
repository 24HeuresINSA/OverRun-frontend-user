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
                <div id="forgottentPassword fw-light" class="form-text mt-1">
                  <router-link
                    :to="{ name: 'ResetPasswordRequest' }"
                    class="fw-light"
                    >Mot de passe oublié?</router-link
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
      </div>
      <div class="col-lg"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations } from "vuex";
import axios from "axios";

export default defineComponent({
  components: {},
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    async login() {
      console.log(this.email, this.password);
      const response = await axios.post("login", {
        email: this.email,
        password: this.password,
      });

      console.log(response);
      if (response.status === 200) {
        console.log("Hello: ", this.$store.getters.getUser);
        // this.SET_ACCESS_TOKEN(response.data.accessToken);
        // this.SET_REFRESH_TOKEN(response.data.refreshToken);
      }
    },
  },
});
</script>

<style scoped>
.login {
  margin-top: 5%;
}
</style>
