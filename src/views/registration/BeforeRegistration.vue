<template>
  <div class="container-fluid h-100">
    <div class="row h-100">
      <div class="col h-100 text-center">
        <p id="title-1">Bienvenue sur</p>

        <p id="title-2">OverRun</p>

        <p id="title-3">
          Le site d'inscription aux courses des 24 heures de l'INSA
        </p>
        <button
          v-show="isRegistrationOpen"
          class="btn btn-primary"
          id="begin-btn"
          @click="register"
        >
          <h3 class="mb-0 m-2">Commencer mon inscription</h3>
        </button>
        <p v-show="!isRegistrationOpen">
          Les inscriptions sont actuellement fermées. <br />
          Elles sont ouvertes du
          <strong>
            {{ registrationStartDate }}
          </strong>
          au
          <strong> {{ registrationEndDate }} </strong>. <br />
          Si vous pensez que c'est une erreur, contactez-nous à l'adresse
          suivante :
          <a href="mailto:overrun@24heures.org"> overrun@24heures.org</a>
        </p>

        <br />
        <button class="btn btn-primary" id="login-btn" @click="login">
          <h3 class="mb-0 m-2">Se connecter</h3>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { dateFormat } from "@/types/dateFormat";
import { defineComponent } from "vue";
export default defineComponent({
  computed: {
    isRegistrationOpen() {
      return this.$store.getters["edition/isRegistrationOpen"];
    },
    registrationStartDate() {
      return this.$store.getters[
        "edition/getRegistrationStartDate"
      ].toLocaleDateString("FR-fr", dateFormat);
    },
    registrationEndDate() {
      return this.$store.getters[
        "edition/getRegistrationEndDate"
      ].toLocaleDateString("FR-fr", dateFormat);
    },
  },
  methods: {
    register() {
      this.$router.push({ name: "Register" });
    },
    login() {
      this.$router.push({ name: "Login" });
    },
  },
});
</script>

<style scoped>
#title-1 {
  font-size: 2vw;
  margin-top: 7%;
}

#title-2 {
  font-size: 10vw;
  margin: -1%;
}

#title-3 {
  font-size: 1.2vw;
  margin: 0;
}

#begin-btn {
  margin: 5%;
}
</style>
