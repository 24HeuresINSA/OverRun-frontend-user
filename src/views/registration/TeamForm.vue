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
                  <option
                    v-for="soloRace in soloRaces"
                    :key="soloRace.id"
                    :value="soloRace.id"
                  >
                    {{ soloRace.name }}
                  </option>
                </select>
              </div>
              <div v-if="createdTeamRace" class="row m-2">
                <div class="col-12 form-group">
                  <label for="inputCreateRace"
                    >Tarif standard: {{ getSoloRegularPrice() }}
                  </label>
                  <br />
                  <label for="inputCreateRace"
                    >Tarif VA:
                    {{ getSoloVaPrice() }}
                  </label>
                </div>
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
                  <option v-for="team in teams" :key="team.id" :value="team.id">
                    {{ team.name }}
                  </option>
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
          <form @submit.prevent="submitCreateTeam($event)">
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
                  type="password"
                  class="form-control"
                  id="inputCreatePassword"
                  v-model="createdTeamPassword"
                  required
                />
              </div>
            </div>
            <div class="row m-2">
              <div class="col form-group">
                <label for="inputCreatePassword"
                  >Confirmer mot de passe:
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="inputConfirmPassword"
                  v-model="createdTeamConfirmPassword"
                  required
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
                  v-model="selectedCategory"
                  @change="fetchRaces"
                  required
                >
                  <option value="" disabled selected hidden></option>
                  <option
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.name }} ({{ category.minTeamMembers }} à
                    {{ category.maxTeamMembers }} personnes)
                  </option>
                </select>
              </div>
            </div>
            <div class="row m-2">
              <div class="col-12 form-group" v-show="races.length > 0">
                <label for="inputCreateRace">Course: </label>
                <select
                  class="form-select"
                  id="inputCreateRace"
                  aria-label="Default select example"
                  v-model="createdTeamRace"
                >
                  <option value="" disabled selected hidden></option>
                  <option v-for="race in races" :key="race.id" :value="race.id">
                    {{ race.name }}
                  </option>
                </select>
              </div>
            </div>
            <div v-if="createdTeamRace" class="row m-2">
              <div class="col-12 form-group">
                <label for="inputCreateRace"
                  >Tarif standard: {{ getRegularPrice() }}
                </label>
                <br />
                <label for="inputCreateRace"
                  >Tarif VA:
                  {{ getVaPrice() }}
                </label>
              </div>
            </div>
            <div class="row m-2 mt-5">
              <div class="col text-end">
                <button type="submit" class="btn btn-primary">
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
import axios from "axios";
import { edition } from "@/main";

export interface Category {
  id: number;
  name: string;
  maxTeamMembers: number;
  minTeamMembers: number;
}

export interface Race {
  id: number;
  name: string;
  registrationPrice: number;
  vaRegistrationPrice: number;
  category: Category;
}

export interface TeamRace {
  id: number;
  name: string;
}

export interface Team {
  id: number;
  name: string;
  race: TeamRace;
}

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
      createdTeamConfirmPassword: null,
      selectedCategory: null,
      teams: [] as Team[],
      races: [] as Race[],
      soloRaces: [] as Race[],
      categories: [] as Category[],
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
    getSoloVaPrice(): number {
      let vaPrice = 0;
      if (this.selectedRace) {
        this.soloRaces.forEach((race, index) => {
          if (race.id === this.selectedRace) {
            vaPrice = race.vaRegistrationPrice;
          }
        });
      }
      return vaPrice;
    },
    getSoloRegularPrice(): number {
      let price = 0;
      if (this.selectedRace) {
        this.soloRaces.forEach((race, index) => {
          if (race.id === this.selectedRace) {
            price = race.registrationPrice;
          }
        });
      }
      return price;
    },
    getVaPrice(): number {
      let vaPrice = 0;
      if (this.createdTeamRace) {
        this.races.forEach((race, index) => {
          if (race.id === this.createdTeamRace) {
            vaPrice = race.vaRegistrationPrice;
          }
        });
      }
      return vaPrice;
    },
    getRegularPrice(): number {
      let price = 0;
      if (this.createdTeamRace) {
        this.races.forEach((race, index) => {
          if (race.id === this.createdTeamRace) {
            price = race.registrationPrice;
          }
        });
      }
      return price;
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
    async fetchRaces() {
      console.log("fetch");
      const racesResponse = await axios.get("races", {
        params: {
          categoryId: this.selectedCategory,
        },
      });
      if (racesResponse.status < 300) {
        this.races = racesResponse.data.data;
      }
    },
    joinRace() {
      console.log("Join Race");
      this.$router.push({ name: "RegisterCertificate" });
    },
    async submitCreateTeam(e: Event) {
      console.log("Create Team");
      const response = await axios.post(
        "teams",
        {
          name: this.createdTeamName,
          password: this.createdTeamPassword,
          raceId: this.createdTeamRace,
          editionId: edition,
        },
        {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
          },
        }
      );
      this.$router.push({ name: "RegisterCertificate" });
    },
    submitJoinTeam() {
      console.log("Join Team");
      this.$router.push({ name: "RegisterCertificate" });
    },
  },
  async mounted() {
    const categoriesResponse = await axios.get("categories/light", {
      headers: {
        Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
      },
    });
    if (categoriesResponse.status < 300) {
      this.categories = categoriesResponse.data.data;
    }
    const soloRacesResponse = await axios.get("races", {
      params: {
        maxTeamMembers: 1,
      },
      headers: {
        Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
      },
    });
    if (soloRacesResponse.status < 300) {
      this.soloRaces = soloRacesResponse.data.data;
      console.log(this.soloRaces.length);
    }
    const teamsResponse = await axios.get("teams/light", {
      headers: {
        Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
      },
    });
    if (teamsResponse.status < 300) {
      this.teams = teamsResponse.data.data;
    }
  },
});
</script>

<style></style>
