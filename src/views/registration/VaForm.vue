<template>
  <div class="container-fluid p-0">
    <UnfoundVa
      v-show="showUnfoundModal"
      @closeUnfoundModal="toggleUnfoundModal"
    />
    <ProblemVa
      v-show="showProblemModal"
      @closeProblemModal="toggleProblemModal"
    />
    <div class="row">
      <div class="col mt-5">
        <h1>Carte VA</h1>
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
      <div class="col"></div>
      <div
        class="col-lg-4 bg-primary rounded text-light text-start pt-2"
        v-if="previousVaExists"
      >
        <strong> <u>Attention:</u> </strong>
        <p>
          Une carte VA est déjà enregistrée pour ce compte. Assurez-vous que les
          informations renseignées soient correctes. Si ce n'est pas le cas,
          vous pouvez cliquer sur Modifier afin de les mettre à jour.
        </p>
      </div>
      <div
        class="col-lg-4 bg-primary rounded text-light text-start pt-2"
        v-else
      >
        <strong> <u>Attention:</u> </strong>
        <p>
          Si vous disposez d'une carte VA, assurez-vous que les nom et prénom
          saisis dans le formulaire d'inscription correspondent bien aux nom et
          prénom figurant sur votre carte VA. <br />
          Le numéro de la carte VA est le numéro commençant par 'c' suivi de 12
          chiffres. Il se trouve en-dessous du code-barres sur la carte.
        </p>
      </div>
      <div class="col"></div>
    </div>
    <div class="row mt-4" v-if="previousVaExists && !updatePreviousVa">
      <div class="col-lg"></div>
      <div class="col col-lg-4 fw-bold text-start">

        <div class="row m-2 mt-4">
          <form>
            <div class="row">
              <div class="col-12 my-2 my-lg-0 col-lg form-group">
                <label for="inputFirstName">Prénom sur la carte VA: </label>
                <input
                  v-model="vaFirstName"
                  type="text"
                  class="form-control"
                  id="inputFirstName"
                  disabled
                />
              </div>
              <div class="col-12 my-2 my-lg-0 col-lg form-group">
                <label for="inputLastName">Nom sur la carte VA:</label>
                <input
                  v-model="vaLastName"
                  type="text"
                  class="form-control"
                  id="inputLastName"
                  disabled
                />
              </div>
            </div>
            <div class="row mt-2">
              <div class="col form-group">
                <label for="inputVA">Numéro de carte VA: </label>
                <input
                  v-model="vaNumber"
                  type="text"
                  class="form-control"
                  id="inputVA"
                  disabled
                />
              </div>
            </div>
          </form>
          <div class="row m-2 mt-4">
          <div class="col text-end">
            <button type="button" class="btn btn-success" @click="sendVa">
              Les informations sont correctes
            </button>
          </div>
        </div>
        <div class="row m-2 mt-4">
          <div class="col text-end">
            <button type="button" class="btn btn-primary" @click="toogleUpdateVa">
              Modifier
            </button>
          </div>
        </div>
        </div>
      </div>
      <div class="col-lg"></div>
    </div>
    <div v-else class="row mt-4">
      <div class="col-lg"></div>
      <div class="col col-lg-4 fw-bold text-start">
        <div class="row m-2">
          <label for="">
            Avez-vous une carte VA?
            <span
              class="material-icons"
              data-toggle="tooltip"
              data-placement="top"
              title="La carte VA est une carte réservé aux étudiant Insaliens adhérents à la vie associative de l'école."
            >
              help
            </span>
          </label>
          <div class="ms-4 mt-2">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="yesRadioButton"
                @change="onChange($event)"
                checked
              />
              <label class="form-check-label" for="yesRadioButton"> Oui </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="noRadioButton"
                @change="onChange($event)"
              />
              <label class="form-check-label" for="noRadioButton"> Non </label>
            </div>
          </div>
        </div>

        <div v-if="!VA" class="row m-2 mt-4">
          <div class="col text-end">
            <button type="button" class="btn btn-primary" @click="next">
              Continuer
            </button>
          </div>
        </div>

        <div v-if="VA" class="row m-2 mt-4">
          <form>
            <div class="row">
              <div class="col-12 my-2 my-lg-0 col-lg form-group">
                <label for="inputFirstName">Prénom sur la carte VA: </label>
                <input
                  v-model="vaFirstName"
                  type="text"
                  class="form-control"
                  id="inputFirstName"
                />
              </div>
              <div class="col-12 my-2 my-lg-0 col-lg form-group">
                <label for="inputLastName">Nom sur la carte VA:</label>
                <input
                  v-model="vaLastName"
                  type="text"
                  class="form-control"
                  id="inputLastName"
                />
              </div>
            </div>
            <div class="row mt-2">
              <div class="col form-group">
                <label for="inputVA">Numéro de carte VA: </label>
                <input
                  v-model="vaNumber"
                  type="text"
                  class="form-control"
                  id="inputVA"
                />
              </div>
            </div>
            <div class="row mt-5">
              <div class="col col-lg-6">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="toggleProblemModal"
                >
                  J'ai un problème
                </button>
              </div>
              <div class="col col-lg-6 text-end">
                <button @click="sendVa" type="button" class="btn btn-primary">
                  Valider
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

<script lang="ts" scoped>
import ProblemVa from "@/components/modal/ProblemVa.vue";
import UnfoundVa from "@/components/modal/UnfoundVa.vue";
import StepBar from "@/components/stepBar/StepBar.vue";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    StepBar,
    ProblemVa,
    UnfoundVa,
  },
  data() {
    return {
      showProblemModal: false,
      showUnfoundModal: false,
      vaFirstName: "",
      vaLastName: "",
      vaNumber: "",
      lastVaId: -1,
      previousVaExists: false,
      updatePreviousVa: false,
      VA: true,
    };
  },
  methods: {
    onChange(event: Event) {
      if (event.target) {
        if (
          (event.target as HTMLInputElement).id &&
          (event.target as HTMLInputElement).id === "yesRadioButton"
        ) {
          this.VA = true;
        } else {
          this.VA = false;
        }
      }
    },
    next() {
      this.$store.dispatch("user/setMe");
      this.$router.push({ name: "RegisterCertificate" });
    },
    sendVa() {
      if (this.previousVaExists) {
        this.updateVa();
      } else {
        this.createVA();
      }
    },
    async createVA() {
      const vaCheckResponse = await axios.post("/checkVA", {
        vaNumber: this.vaNumber,
        vaFirstName: this.vaFirstName,
        vaLastName: this.vaLastName,
      });

      if (vaCheckResponse.status === 200) {
        return this.next();
      }

      this.toggleUnfoundModal();
    },
    async findPreviousVa() {
      const lastVa = await axios.get("vas/me/last");
      if (lastVa.status >= 300) {
        return;
      }

      this.previousVaExists = true;
      this.vaFirstName = lastVa.data.inscription.athlete.firstName;
      this.vaLastName = lastVa.data.inscription.athlete.lastName;
      this.vaNumber = lastVa.data.va;
      this.lastVaId = lastVa.data.id;
    },
    async updateVa() {
      const vaResponse = await axios.put("vas/"+this.lastVaId, {
        vaNumber: this.vaNumber,
        vaFirstName: this.vaFirstName,
        vaLastName: this.vaLastName,
      });
      if (vaResponse.status === 200) {
        return this.next();
      }
      this.toggleUnfoundModal();
    },
    toogleUpdateVa() {
      this.updatePreviousVa = true;
      this.VA = true;
    },
    toggleProblemModal() {
      this.showProblemModal = !this.showProblemModal;
    },
    toggleUnfoundModal() {
      this.showUnfoundModal = !this.showUnfoundModal;
    },
  },
  beforeMount() {
    this.findPreviousVa();
  },
});
</script>

<style>
#helpIcon {
  font-weight: 100;
  height: 5px;
  font-size: 10px !important;
}
</style>
