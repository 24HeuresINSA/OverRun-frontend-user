<template>
  <div class="container-fluid h-100">
    <div class="row">
      <div class="col mt-5">
        <h1>Choix course</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-lg"></div>
      <div class="col-12 col-lg-4 m-2">
        <StepBar :index="3" />
      </div>
      <div class="col-lg"></div>
    </div>
    <div class="row mt-4">
      <div class="col-lg"></div>
      <div class="col col-lg-4 text-start fw-bold">
        <div class="row m-2">
          <label for=""> Souhaitez-vous faire la course en équipe? </label>
          <div class="ms-4 mt-2">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="team"
                @change="soloOrTeam"
              />
              <label class="form-check-label" for="flexRadioDefault1">
                Oui
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="solo"
                @change="soloOrTeam"
              />
              <label class="form-check-label" for="flexRadioDefault2">
                Non
              </label>
            </div>
          </div>
        </div>

        <div v-show="solo" class="row mt-4">
          <form>
            <div class="row m-2">
              <div class="col form-group">
                <label for="inputBirthDate">Selection votre course: </label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="selectedRace"
                >
                  <option value="" disabled selected hidden></option>
                  <option value="2">Femme</option>
                  <option value="1">Homme</option>
                </select>
              </div>
              <div class="row m-2 mt-5">
                <div class="col form-group text-end">
                  <button type="button" class="btn btn-primary">
                    Continuer
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div v-show="team" class="row m-2 mt-4">
          <label for=""> Que souhaitez-vous faire? </label>
          <div class="ms-4 mt-2">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="joinTeam"
                @change="joinOrCreateTeam"
              />
              <label class="form-check-label" for="flexRadioDefault1">
                Rejoindre une équipe existante
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="createTeam"
                @change="joinOrCreateTeam"
              />
              <label class="form-check-label" for="flexRadioDefault2">
                Créer une nouvelle équipe
              </label>
            </div>
          </div>
        </div>

        <div v-show="joinTeam" class="row mt-4">
          <form>
            <div class="row m-2">
              <div class="col-12 col-lg form-group">
                <label for="selectTeam"
                  >Selectionnez l'équipe à rejoindre:
                </label>
                <select
                  class="form-select"
                  id="selectTeam"
                  aria-label="Default select example"
                  v-model="joinedTeamName"
                >
                  <option value="" disabled selected hidden></option>
                  <option value="2">Equipe 1</option>
                  <option value="1">Equipe 2</option>
                </select>
              </div>
            </div>
            <div class="row m-2">
              <div class="col form-group">
                <label for="inputTeamPassword"
                  >Mot de passe de l'équipe:
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="inputTeamPassword"
                  v-model="joinedTeamPassword"
                />
              </div>
            </div>
            <div class="row m-2 mt-5">
              <div class="col text-end">
                <button type="button" class="btn btn-primary">
                  Rejoindre l'équipe
                </button>
              </div>
            </div>
          </form>
        </div>

        <div v-show="createTeam" class="row mt-4">
          <form>
            <div class="row m-2">
              <div class="col form-group">
                <label for="inputTeamName">Nom de l'équipe: </label>
                <input
                  type="text"
                  class="form-control"
                  id="inputTeamName"
                  v-model="createdTeamName"
                />
              </div>
            </div>
            <div class="row m-2">
              <div class="col form-group">
                <label for="inputCreatePassword">Mot de passe: </label>
                <input
                  type="text"
                  class="form-control"
                  id="inputCreatePassword"
                  v-model="createdTeamPassword"
                />
              </div>
            </div>
            <div class="row m-2">
              <div class="col-12 form-group">
                <label for="inputCreateCategory">Category: </label>
                <select
                  class="form-select"
                  id="inputCreateCategory"
                  aria-label="Default select example"
                  v-model="createdTeamCategory"
                  @change="fetchRaces"
                >
                  <option value="" disabled selected hidden></option>
                  <option value="2">Loisir (2 à 12 personnes)</option>
                  <option value="1">Compétition (2 à 4 personnes)</option>
                </select>
              </div>
            </div>
            <div class="row m-2">
              <div class="col-12 form-group" v-show="createdTeamCategory">
                <label for="inputCreateRace">Course: </label>
                <select
                  class="form-select"
                  id="inputCreateRace"
                  aria-label="Default select example"
                  v-model="createdTeamRace"
                >
                  <option value="" disabled selected hidden></option>
                  <option value="1">Course à pied</option>
                  <option value="1">Vélo</option>
                  <option value="2">Triathlon</option>
                </select>
              </div>
            </div>
            <div class="row m-2 mt-5">
              <div class="col text-end">
                <button type="button" class="btn btn-primary">
                  Créer l'équipe
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
import StepBar from "@/components/stepBar/StepBar.vue";

export default defineComponent({
  components: {
    StepBar,
  },
  data() {
    return {
      solo: false,
      team: false,
      joinTeam: false,
      createTeam: false,
      selectedRace: null,
      joinedTeamName: null,
      joinedTeamPassword: null,
      createdTeamName: null,
      createdTeamRace: null,
      createdTeamCategory: null,
      createdTeamPassword: null,
    };
  },
  methods: {
    soloOrTeam(event: Event) {
      if (event) {
        console.log((event.target as HTMLInputElement).id);
        if (
          event.target &&
          (event.target as HTMLInputElement).id === "solo" &&
          (event.target as HTMLInputElement).checked === true
        ) {
          this.solo = true;
          this.team = false;
        } else {
          this.solo = false;
          this.team = true;
        }
        this.joinTeam = false;
        this.createTeam = false;
      }
    },
    joinOrCreateTeam(event: Event) {
      if (event) {
        if (
          event.target &&
          (event.target as HTMLInputElement).id === "createTeam" &&
          (event.target as HTMLInputElement).checked === true
        ) {
          this.createTeam = true;
          this.joinTeam = false;
        } else {
          this.createTeam = false;
          this.joinTeam = true;
        }
        this.createdTeamCategory = null;
      }
    },
    fetchRaces() {
      console.log("Fetch Races");
    },
    joinRace() {
      console.log("Join Race");
      this.$router.push({ name: "RegisterCertificate" });
    },
    submitCreateTeam() {
      console.log("Create Team");
      this.$router.push({ name: "RegisterCertificate" });
    },
    submitJoinTeam() {
      console.log("Join Team");
      this.$router.push({ name: "RegisterCertificate" });
    },
  },
});
</script>

<style></style>
