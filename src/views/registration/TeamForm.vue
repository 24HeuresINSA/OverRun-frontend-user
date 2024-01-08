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
        <StepBar :index="2" />
      </div>
      <div class="col-lg"></div>
    </div>
    <div class="row mt-4">
      <div class="col-lg"></div>
      <div class="col bg-primary text-light text-start rounded pt-3 mx-3">
        <p>
          <strong><u>Attention:</u></strong> Certaines courses, notamment les
          triathlons, ont un nombre de places limité et s'inscrire à la course
          ne garantit pas votre participation.
        </p>
        <p v-show="solo">
          Pour un athlète courant sans équipe, l'inscription est considérée
          comme <i>confirmée</i> lorsque le paiement et l'inscription auront été
          validés par l'équipe des Courses des 24 Heures de l'INSA.
        </p>
        <div v-show="team" class="mb-2">
          <p>
            Pour un athlète en équipe, l'inscription de l'équipe est considérée
            comme <i>confirmée</i> lorsqu'un certain nombre d'athlètes de
            l'équipe ont leur inscription confirmée (paiment et inscription
            validés par nos soins).
          </p>
          <ul class="m-0" v-for="category in categories" :key="category.id">
            <li>
              Catégorie <strong>{{ category.name }}</strong> ->
              {{ category.minTeamMembers }} inscriptions minimum
            </li>
          </ul>
        </div>
      </div>

      <div class="col-lg"></div>
    </div>
    <div>
      <small>
        <RouterLink class="col text-end" to="/">
          Je souhaite m'inscrire plus tard (accéder à ma page)
        </RouterLink>
      </small>
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
          <form @submit.prevent="submitSoloRace()">
            <div class="row m-2">
              <div class="col form-group">
                <label for="inputBirthDate">Sélectionnez votre course: </label>
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
                    :disabled="raceSoloIsComplete(soloRace.id)"
                  >
                    <!-- For every soloRace, get the raceDisciplines to get discipline's name and the duration -->
                    {{
                      soloRace.name +
                      (raceSoloIsComplete(soloRace.id) ? " (Complète)" : "")
                    }}
                    -
                    <span
                      v-for="(
                        raceDiscipline, indexRaceDiscipline
                      ) in soloRace.disciplines"
                      :key="raceDiscipline.id"
                    >
                      {{ raceDiscipline.discipline.name }} ({{
                        raceDiscipline.duration
                      }}h)
                      <!-- If the item is the last one in the array, don't add the / symbol -->
                      <span
                        v-if="
                          indexRaceDiscipline < soloRace.disciplines.length - 1
                        "
                      >
                        /
                      </span>
                    </span>
                  </option>
                </select>
              </div>
              <div v-if="selectedRace" class="row m-2">
                <div class="col-12 form-group">
                  <label for="inputCreateRace"
                    >Tarif standard: {{ getSoloRegularPrice() }} €
                  </label>
                  <br />
                  <label for="inputCreateRace"
                    >Tarif VA: {{ getSoloVaPrice() }} €
                  </label>
                </div>
              </div>
              <div class="row m-2 mt-5">
                <div class="col form-group text-end">
                  <button type="submit" class="btn btn-primary">
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
          <form @submit.prevent="submitJoinTeam()">
            <div class="row m-2">
              <div class="col-12 col-lg form-group">
                <label for="selectTeam"
                  >Sélectionnez l'équipe à rejoindre:
                </label>
                <select
                  class="form-select"
                  id="selectTeam"
                  aria-label="Default select example"
                  v-model="joinedTeamId"
                >
                  <option value="" disabled selected hidden></option>
                  <option
                    v-for="team in teams"
                    :key="team.id"
                    :value="team.id"
                    :disabled="teamIsComplete(team.id)"
                  >
                    {{
                      team.name +
                      " " +
                      (teamIsComplete(team.id) ? " (Complète)" : "")
                    }}
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
                <button type="submit" class="btn btn-primary">
                  Rejoindre l'équipe
                </button>
              </div>
            </div>
          </form>
        </div>

        <div v-show="createTeam" class="row mt-4">
          <form @submit.prevent="submitCreateTeam()">
            <div class="row m-2">
              <div class="col form-group">
                <label for="inputTeamName">Nom de l'équipe: </label>
                <input
                  type="text"
                  class="form-control"
                  id="inputTeamName"
                  v-model="createdTeamName"
                  required
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
                  minlength="8"
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
                  minlength="8"
                  required
                />
              </div>
              <div
                v-show="createdTeamPassword !== createdTeamConfirmPassword"
                class="text-danger"
              >
                Les mots de passe ne correspondent pas.
              </div>
            </div>
            <div class="row m-2">
              <div class="col-12 form-group">
                <label for="inputCreateCategory">Catégorie: </label>
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
                    {{ category.maxTeamMembers }}
                    personnes)
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
                  required
                >
                  <option value="" disabled selected hidden></option>
                  <option
                    v-for="race in races"
                    :key="race.id"
                    :value="race.id"
                    :disabled="raceIsComplete(race.id)"
                  >
                    {{
                      race.name + (raceIsComplete(race.id) ? " (Complète)" : "")
                    }}
                    -
                    <span
                      v-for="(
                        raceDiscipline, indexRaceDiscipline
                      ) in race.disciplines"
                      :key="raceDiscipline.id"
                    >
                      {{ raceDiscipline.discipline.name }} ({{
                        raceDiscipline.duration
                      }}h)
                      <!-- If the item is the last one in the array, don't add the / symbol -->
                      <span
                        v-if="indexRaceDiscipline < race.disciplines.length - 1"
                      >
                        /
                      </span>
                    </span>
                  </option>
                </select>
              </div>
            </div>
            <div v-if="createdTeamRace" class="row m-2">
              <div class="col-12 form-group">
                <label for="inputCreateRace"
                  >Tarif standard: {{ getRegularPrice() }} €
                </label>
                <br />
                <label for="inputCreateRace"
                  >Tarif VA: {{ getVaPrice() }} €
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
  <ErrorModal v-show="showErrorModal" @closeErrorModal="toggleErrorModal" />
</template>

<script lang="ts">
import ErrorModal from "@/components/modal/Error.vue";
import StepBar from "@/components/stepBar/StepBar.vue";
import { Inscription, InscriptionStatus } from "@/types/interface";
import axios from "axios";
import { defineComponent } from "vue";

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
  maxTeams: number;
  inscriptions: Inscription[];
  teams: Team[];
  maxParticipants: number;
  disciplines: RaceDiscipline[];
}

export interface TeamRace {
  id: number;
  name: string;
}

export interface Team {
  id: number;
  name: string;
  race: Race;
  members: Inscription[];
}

export interface RaceDiscipline {
  discipline: Discipline;
  duration: number;
  id: number;
}

export interface Discipline {
  id: number;
  name: string;
}

export default defineComponent({
  components: {
    StepBar,
    ErrorModal,
  },
  data() {
    return {
      solo: false,
      team: false,
      joinTeam: false,
      createTeam: false,
      selectedRace: null,
      joinedTeamId: null,
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
      showErrorModal: false,
    };
  },
  methods: {
    toggleErrorModal() {
      this.showErrorModal = !this.showErrorModal;
    },
    centimesToEuros(centimes: number): number {
      return centimes / 100;
    },
    soloOrTeam(event: Event) {
      if (event) {
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
        this.soloRaces.forEach((race) => {
          if (race.id === this.selectedRace) {
            vaPrice = this.centimesToEuros(race.vaRegistrationPrice);
          }
        });
      }
      return vaPrice;
    },
    getSoloRegularPrice(): number {
      let price = 0;
      if (this.selectedRace) {
        this.soloRaces.forEach((race) => {
          if (race.id === this.selectedRace) {
            price = this.centimesToEuros(race.registrationPrice);
          }
        });
      }
      return price;
    },
    getVaPrice(): number {
      let vaPrice = 0;
      if (this.createdTeamRace) {
        this.races.forEach((race) => {
          if (race.id === this.createdTeamRace) {
            vaPrice = this.centimesToEuros(race.vaRegistrationPrice);
          }
        });
      }
      return vaPrice;
    },
    getRegularPrice(): number {
      let price = 0;
      if (this.createdTeamRace) {
        this.races.forEach((race) => {
          if (race.id === this.createdTeamRace) {
            price = this.centimesToEuros(race.registrationPrice);
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
    raceSoloIsComplete(id: number) {
      let race = this.soloRaces?.find((r: Race) => r.id === id);
      if (race === undefined) return false;
      const sizeRace = race.inscriptions.filter(
        (i: Inscription) => i.status !== InscriptionStatus.CANCELLED
      ).length;
      return sizeRace >= race.maxParticipants;
    },
    raceIsComplete(id: number) {
      let race = this.races?.find((r: Race) => r.id === id);
      if (race === undefined) return false;
      const sizeRace = race.teams.length;
      return sizeRace >= race.maxTeams;
    },
    teamIsComplete(id: number) {
      const team = this.teams.find((t: Team) => t.id === id);
      const sizeTeam = team?.members.filter(
        (i: Inscription) => i.status !== InscriptionStatus.CANCELLED
      ).length;
      if (sizeTeam !== undefined && team?.race.category.maxTeamMembers)
        return sizeTeam >= team?.race.category.maxTeamMembers;
      else return false;
    },
    async fetchRaces() {
      const racesResponse = await axios.get("races", {
        params: {
          categoryId: this.selectedCategory,
          editionId: this.$store.getters["edition/getEditionId"],
        },
      });
      if (racesResponse.status < 300) {
        this.races = racesResponse.data.data;
      }
    },
    next() {
      this.$store.dispatch("user/setMe");
      this.$router.push({ name: "RegisterVa" });
    },
    async submitCreateTeam() {
      const response = await axios.post("teams", {
        name: this.createdTeamName,
        password: this.createdTeamPassword,
        raceId: this.createdTeamRace,
        editionId: this.$store.getters["edition/getEditionId"],
      });
      if (response.status !== 200) return this.toggleErrorModal();
      this.next();
    },
    async submitJoinTeam() {
      const response = await axios.post(`/teams/${this.joinedTeamId}/join`, {
        password: this.joinedTeamPassword,
      });
      if (response.status !== 201) return this.toggleErrorModal();
      this.next();
    },
    async submitSoloRace() {
      const response = await axios.post("/inscriptions", {
        raceId: this.selectedRace,
        editionId: this.$store.getters["edition/getEditionId"],
      });
      if (response.status !== 201) return this.toggleErrorModal();
      this.next();
    },
  },
  async mounted() {
    const categoriesResponse = await axios.get("categories/light", {
      params: {
        editionId: this.$store.getters["edition/getEditionId"],
        maxTeamMembers: 1,
      },
    });
    if (categoriesResponse.status < 300) {
      this.categories = categoriesResponse.data.data;
    }
    const soloRacesResponse = await axios.get("races", {
      params: {
        minTeamMembers: 1,
        editionId: this.$store.getters["edition/getEditionId"],
      },
    });
    if (soloRacesResponse.status < 300) {
      this.soloRaces = soloRacesResponse.data.data;
    }
    const teamsResponse = await axios.get("teams/light", {
      params: {
        editionId: this.$store.getters["edition/getEditionId"],
      },
    });
    if (teamsResponse.status < 300) {
      this.teams = teamsResponse.data.data;
    }
  },
});
</script>

<style></style>
