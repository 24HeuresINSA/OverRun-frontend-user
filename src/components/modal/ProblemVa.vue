<template>
  <div class="backdrop" @click.self="closeModal">
    <div
      class="col-10 col-lg-4 p-3 bg-light custom-modal m-auto rounded-3 mt-5"
    >
      <div class="row pt-3">
        <div class="col">
          <h4>Un problème pour enregistrer votre carte VA? &#128557;</h4>
        </div>
      </div>
      <div class="row pt-3">
        <div class="col m-2 text-start">
          <p>
            Pas de panique, envoyer un petit e-mail à
            <a :href="mailURL()">overrun@24heures.org</a> en indiquant:
          </p>
          <ul class="ms-5">
            <li class="fw-bold">Votre pseudo</li>
            <li class="fw-bold">Votre nom</li>
            <li class="fw-bold">Votre prenom</li>
            <li class="fw-bold">Votre numéro de carte VA</li>
          </ul>
          <p>
            Attendez la validation de votre carte VA avant de procéder au
            payement (passez l'étape)... du moins si vous souhaitez bénéficier
            de la réduction associée &#128521;.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Athlete } from "@/types/interface";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      user: {} as Athlete,
      mailTemplate: "",
    };
  },

  methods: {
    closeModal() {
      this.$emit("closeProblemModal");
    },

    async getUserInfos() {
      const athleteResponse = await axios.get(
        `/athletes/${this.$store.getters["auth/getAthleteId"]}`
      );

      if (athleteResponse.status < 300) {
        this.user = athleteResponse.data;
      }
    },

    async feelMailTemplate() {
      await this.getUserInfos();
      this.mailTemplate = `Bonjour,
Je rencontre un problème pour enregistrer ma carte VA.
Voici mes informations:
- Pseudo: ${this.user.user.username}
- Nom: ${this.user.lastName}
- Prénom: ${this.user.firstName}
- Numéro de carte VA:

Merci d'avance pour votre aide.
      `;
    },

    mailURL() {
      return `mailto:courses@24heures.org?subject=${encodeURI(
        "Problème lors de l'enregistement de la carte VA"
      )}&body=${encodeURI(this.mailTemplate)}`;
    },
  },
  mounted() {
    this.feelMailTemplate();
  },
});
</script>

<style scoped>
.backdrop {
  top: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 10001;
  margin: 0;
}
</style>
