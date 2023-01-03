<template>
  <div class="backdrop" @click.self="closeModal">
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
        <div class="col bg-primary text-start text-light rounded pt-3 mx-3">
          <p>
            La carte VA est une carte délivrée aux étudiants de l'INSA de Lyon.
            Elle doit être en cours de validité pour sa validation. Pour tout
            problème avec la carte VA, merci d'envoyer un petit e-mail à
            <a href="mailto:courses@24heures.org">overrun@24heures.org</a> en
            indiquant:
          </p>
          <ul class="ms-5">
            <li class="fw-bold">Votre pseudo</li>
            <li class="fw-bold">Votre nom</li>
            <li class="fw-bold">Votre prenom</li>
            <li class="fw-bold">Votre numéro de carte VA</li>
          </ul>
        </div>
      </div>

      <div class="row m-2 pt-3">
        <div class="col text-start fw-bold">
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
                <label for="inputVA">Numero de carte VA: </label>
                <input
                  v-model="vaNumber"
                  type="text"
                  class="form-control"
                  id="inputVA"
                />
              </div>
            </div>
            <div class="row mt-5">
              <div class="col col-lg-6 text-end">
                <button @click="sendVa" type="button" class="btn btn-primary">
                  Valider
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
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeVaModal");
    },
    async sendVa() {
      const vaCheckResponse = await axios.post("/checkVA", {
        vaNumber: this.vaNumber,
        vaFirstName: this.vaFirstName,
        vaLastName: this.vaLastName,
      });

      if (vaCheckResponse.status !== 200) return this.$emit("openErrorModal");
      this.closeModal();
      this.$store.dispatch("setMe");
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

#close-arrow {
  margin-top: -1vh;
  margin-right: 50px;
  background: none;
  border: none;
}
</style>
