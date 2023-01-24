<template>
  <div class="container-fluid m-0 p-0">
    <div class="d-none d-lg-block">
      <TopBar :title="title" :userButton="false" />
    </div>

    <div class="d-block d-lg-none">
      <MiniTopBar :userButton="false" />
    </div>

    <div class="row mt-5">
      <div class="col m-2">
        <h2>Réinitialisation mot de passe</h2>
      </div>
    </div>

    <div class="row mt-md-3 mt-2 mx-3 mx-md-0">
      <div class="col-md col-lg"></div>
      <div class="col col-md-6 col-lg-4 m-2 text-start">
        <p>
          Veuillez entrer l'adresse mail avec laquelle votre compte a été créé.
          Si votre compte existe bien, une invitation de réinitialisation de mot
          de passe vous sera envoyée à cette adresse.
        </p>
      </div>
      <div class="col-md"></div>
    </div>

    <div class="row mx-3 mx-lg-0">
      <div class="col-md col-lg"></div>
      <div class="col col-md-6 col-lg-4 text-start">
        <form @submit.prevent="sendInvite">
          <div class="row fw-bold">
            <div class="col form-group">
              <label for="inputEmail">Adresse email: </label>
              <input
                v-model="username"
                type="text"
                class="form-control"
                id="inputEmail"
                required
              />
            </div>
          </div>
          <div class="row mt-5">
            <div class="col form-group text-center text-md-end">
              <button class="btn btn-primary" type="submit">
                Envoyer un mail de réinitialisation
              </button>
            </div>
          </div>
        </form>
      </div>
      <div class="col-md col-lg"></div>
    </div>
  </div>
</template>

<script lang="ts">
import MiniTopBar from "@/components/topBar/MiniTopBar.vue";
import TopBar from "@/components/topBar/TopBar.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    TopBar,
    MiniTopBar,
  },
  data() {
    return {
      title: "Reinitialiser mon mot de passe",
    };
  },
  methods: {
    sendInvite() {
      console.log("Envoyer une invite");
    },
  },
});
</script>
