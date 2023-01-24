<template>
  <div class="backdrop" @click.self="closeModal">
    <div
      class="col-10 col-lg-4 p-3 bg-light custom-modal m-auto rounded-3 mt-5"
    >
      <div class="row pt-3">
        <div class="col">
          <h4>Vous avez un certificat médical à charger? 🩺</h4>
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
            Le certificat doit dater de moins d'un an au moment de la
            compétition et doit comporter l'autorisation de la pratique des
            disciplines en compétition selon votre course. Les licences des
            fédérations correspondant aux courses sont acceptées (FFC pour le
            vélo par exemple).
          </p>
        </div>
      </div>

      <div class="row m-2 pt-3">
        <div class="col text-start fw-bold">
          <form @submit.prevent="uploadCertificate">
            <div class="row">
              <div class="col form-group">
                <label for="inputCertificate">Certificat:</label>

                <input
                  type="file"
                  class="form-control"
                  id="inputCertificate"
                  name="certificate"
                  accept="image/png, image/jpeg,.pdf"
                />
              </div>
            </div>
            <div class="row mt-5">
              <div class="col-12 text-center">
                <button type="submit" class="btn btn-primary">Envoyer</button>
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
  methods: {
    closeModal() {
      this.$emit("closeCertificateModal");
    },
    async uploadCertificate() {
      let formData = new FormData();
      let imageFile: HTMLInputElement | null =
        document.querySelector("#inputCertificate");
      if (imageFile && imageFile.files && imageFile.files[0]) {
        formData.append("certificate", imageFile.files[0]);
        formData.append(
          "editionId",
          this.$store.getters["edition/getEditionId"]
        );
        const response = await axios.post("/certificates/upload", formData);
        if (response.status !== 200) return this.$emit("openErrorModal");
        this.closeModal();
        this.$store.dispatch("user/setMe");
      }
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
