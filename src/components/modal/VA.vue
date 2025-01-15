<template>
  <div class="backdrop overflow-scroll" @click.self="closeModal">
    <div
      class="col-10 col-lg-4 p-3 bg-light custom-modal m-auto rounded-3 mt-5"
    >
      <div class="row pt-3">
        <div class="col">
          <h4>Vous avez une carte VA? 🦏</h4>
        </div>
        <div class="col-1">
          <button id="close-arrow" @click="closeModal">
            <span class="material-icons-outlined"> close </span>
          </button>
        </div>
      </div>
      <div class="row m-2 pt-3">
        <div
          v-if="previousVaExists && !updatePreviousVa"
          class="col bg-primary text-start text-light rounded pt-3 mx-3"
        >
          <p>
            Une carte VA est déjà enregistrée pour ce compte. Assurez-vous que
            les informations renseignées soient correctes. Si ce n'est pas le
            cas, vous pouvez cliquer sur Modifier afin de les mettre à jour.
          </p>
        </div>
        <div
          v-else
          class="col bg-primary text-start text-light rounded pt-3 mx-3"
        >
          <p>
            La carte VA est une carte délivrée aux étudiants de l'INSA de Lyon.
            Elle doit être en cours de validité et vous devez bénéficier de
            l'adhésion VAvantages pour sa validation. Pour tout problème avec la
            carte VA, merci d'envoyer un petit e-mail à
            <a href="mailto:overrun@24heures.org">overrun@24heures.org</a> en
            indiquant:
          </p>
          <ul class="ms-5">
            <li class="fw-bold">Votre pseudo</li>
            <li class="fw-bold">Votre nom</li>
            <li class="fw-bold">Votre prénom</li>
            <li class="fw-bold">Votre numéro de carte VA</li>
          </ul>
        </div>
      </div>

      <div class="row m-2 pt-3">
        <div class="col text-start fw-bold">
          <form @submit.prevent="sendVa">
            <div class="row">
              <div class="col-12 my-2 my-lg-0 col-lg form-group">
                <label for="inputFirstName">Prénom de la carte VA: </label>
                <input
                  v-model="vaFirstName"
                  type="text"
                  class="form-control"
                  id="inputFirstName"
                  :disabled="previousVaExists && !updatePreviousVa"
                />
              </div>
              <div class="col-12 my-2 my-lg-0 col-lg form-group">
                <label for="inputLastName">Nom de la carte VA:</label>
                <input
                  v-model="vaLastName"
                  type="text"
                  class="form-control"
                  id="inputLastName"
                  :disabled="previousVaExists && !updatePreviousVa"
                />
              </div>
            </div>
            <div class="row mt-2">
              <div class="col form-group">
                <label for="inputVA">Numéro de carte VA: </label>
                <input
                  title="Le numéro de la carte VA est le numéro commençant par 'c' suivi de 12 chiffres. Il se trouve en-dessous du code-barres sur la carte."
                  v-model="vaNumber"
                  type="text"
                  class="form-control"
                  pattern="[c][0-9]{12}"
                  placeholder="c000000000000"
                  id="inputVA"
                  :disabled="previousVaExists && !updatePreviousVa"
                />
              </div>
            </div>
            <div class="row mt-3">
              <div class="col col-lg-5 text-start">
                <button
                  @click="toogleUpdateVa"
                  type="button"
                  class="btn btn-primary"
                  v-if="previousVaExists && !updatePreviousVa"
                >
                  Modifier
                </button>
                <button v-else type="submit" class="btn btn-primary">
                  Valider
                </button>
              </div>
              <div class="col text-end">
                <button
                  v-show="previousVaExists && !updatePreviousVa"
                  type="submit"
                  class="btn btn-success"
                >
                  Les informations sont correctes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      vaFirstName: "",
      vaLastName: "",
      vaNumber: "",
      previousVaExists: false,
      updatePreviousVa: false,
      lastVaId: -1,
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeVaModal");
    },
    sendVa() {
      if (this.previousVaExists) {
        this.updateVa();
      } else {
        this.createVa();
      }
    },
    async createVa() {
      const vaCheckResponse = await axios.post("/checkVA", {
        vaNumber: this.vaNumber,
        vaFirstName: this.vaFirstName,
        vaLastName: this.vaLastName,
      });

      if (vaCheckResponse.status !== 200) return this.$emit("openErrorModal");
      this.closeModal();
      this.$store.dispatch("user/setMe");
    },
    async updateVa() {
      const vaResponse = await axios.put("vas/" + this.lastVaId, {
        vaNumber: this.vaNumber,
        vaFirstName: this.vaFirstName,
        vaLastName: this.vaLastName,
      });
      if (vaResponse.status !== 200) return this.$emit("openErrorModal");
      this.closeModal();
      this.$store.dispatch("user/setMe");
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
    toogleUpdateVa() {
      this.updatePreviousVa = true;
    },
  },
  mounted() {
    this.findPreviousVa();
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

#close-arrow {
  margin-top: -1vh;
  margin-right: 50px;
  background: none;
  border: none;
}
</style>
