<template>
  <div class="backdrop" @click.self="closeModal">
    <div
      class="col-10 col-lg-4 p-3 bg-light custom-modal m-auto rounded-3 mt-5"
    >
      <div>
        <div class="row pt-3">
          <div class="col">
            <h4>Êtes vous sûr ? 🤔</h4>
          </div>
          <div class="col-1">
            <button id="close-arrow" @click="closeModal">
              <span class="material-icons-outlined"> close </span>
            </button>
          </div>
        </div>
        <div class="row pt-3">
          <div class="col mx-2 text-start">
            <p>
              Êtes vous sûr de vouloir
              <span v-if="actionType === TeamAdminModalType.DELETE_ATHLETE">
                supprimer
              </span>
              <span v-else-if="actionType === TeamAdminModalType.PROMOTE_ADMIN">
                proumovoir en responsable d'équipe
              </span>
              <span v-else-if="actionType === TeamAdminModalType.REVOKE_ADMIN">
                retirer les droits de responsable d'équipe de
              </span>
              <strong> {{ athlete.firstName }} {{ athlete.lastName }} </strong>
              de votre équipe ?
            </p>
          </div>
        </div>
        <div class="row pt-3">
          <div class="col d-flex justify-content-center">
            <button class="btn btn-primary" @click="closeModal">Annuler</button>
            <button
              class="btn btn-warning mx-2"
              @click="deleteAthlete(athlete.id)"
              v-if="actionType === TeamAdminModalType.DELETE_ATHLETE"
            >
              Supprimer
            </button>
            <button
              class="btn btn-success mx-2"
              @click="promoteAthlete(athlete.id)"
              v-else-if="actionType === TeamAdminModalType.PROMOTE_ADMIN"
            >
              Promouvoir
            </button>
            <button
              class="btn btn-danger mx-2"
              @click="revokeAdmin(athlete.id)"
              v-else-if="actionType === TeamAdminModalType.REVOKE_ADMIN"
            >
              Retirer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Athlete } from "@/types/team";
import axios from "axios";
import { defineComponent } from "vue";

export enum TeamAdminModalType {
  DELETE_ATHLETE = "DELETE_ATHLETE",
  PROMOTE_ADMIN = "PROMOTE_ADMIN",
  REVOKE_ADMIN = "REVOKE_ADMIN",
}

export default defineComponent({
  name: "TeamAdminModal",
  data() {
    return {
      TeamAdminModalType,
    };
  },
  props: {
    actionType: {
      type: String as () => TeamAdminModalType,
      required: true,
    },
    athlete: {
      type: Object as () => Athlete,
      required: true,
    },
    teamId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("closeTeamAdminModal");
    },
    async deleteAthlete(id: number) {
      const response = await axios.post(`/teams/${this.teamId}/removeMember`, {
        athleteId: id,
      });
      if (response.status !== 200) return this.$emit("openErrorModal");
      this.$emit("success");
      this.closeModal();
    },
    async promoteAthlete(id: number) {
      const response = await axios.post(`/teams/${this.teamId}/admin`, {
        athleteId: id,
      });
      if (response.status !== 200) return this.$emit("openErrorModal");
      this.$emit("success");
      this.closeModal();
    },
    async revokeAdmin(id: number) {
      const response = await axios.post(`/teams/${this.teamId}/removeAdmin`, {
        athleteId: id,
      });
      if (response.status !== 200) return this.$emit("openErrorModal");
      this.$emit("success");
      this.closeModal();
    },
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

.big-emoji {
  font-size: 120px;
  vertical-align: middle;
  line-height: 1;
}

#close-arrow {
  margin-top: -1vh;
  margin-right: 50px;
  background: none;
  border: none;
}
</style>
