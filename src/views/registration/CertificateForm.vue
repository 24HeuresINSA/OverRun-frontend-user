<template>
  <div class="container-fluid h-100">
    <div class="row">
      <div class="col mt-5">
        <h1>Document médical</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-lg"></div>
      <div class="col-12 col-lg-4 m-2">
        <StepBar :index="4" />
      </div>
      <div class="col-lg"></div>
    </div>
    <div class="row mt-4">
      <div class="col-lg"></div>
      <div
        class="col-lg-4 bg-primary rounded text-light text-start pt-2"
        v-if="previousCertificateExists && !updatePreviousCertificate"
      >
        <strong> <u>Attention:</u> </strong>
        <p>
          Un document médical est déjà enregistré pour ce compte. Si besoin,
          vous pouvez en envoyer un nouveau. Dans tous les cas, le document
          devra être de nouveau validé par notre équipe.
        </p>
      </div>
      <div
        class="col-lg-4 bg-primary rounded text-light text-start pt-2"
        v-else
      >
        <strong> <u>Attention:</u> </strong>
        <p>
            <ul>
              <li>
                <u>Si vous participez à la course à pied</u> : Le document médical requis
              est une attestation de Parcours Prévention Santé. Ce document a une durée de <strong>validité 
              de trois mois</strong>. Au-delà de ces trois mois, le document ne sera pas accepté.</li>
            <li>
              <u>Si vous participez aux autres épreuves</u> : Le document médical requis
              est un certificat médical. Il doit dater 
              de <strong>moins d'un an</strong> au moment de la
            compétition et doit comporter l'autorisation de la pratique des
            disciplines en compétition selon votre course. Les licences des
            fédérations correspondant aux courses sont acceptées (FFC pour le
            vélo par exemple).
            </li>   
            </ul>
          </p>
      </div>
      <div class="col-lg"></div>
    </div>
    <div class="row mt-4">
      <div class="col-lg"></div>
      <div class="col col-lg-4 text-start fw-bold">
        <form class="m-2" @submit.prevent="uploadCertificate">
          <div class="row">
            <div class="col form-group">
              <label for="inputCertificate">Document médical: </label>
              <input
                v-if="previousCertificateExists && !updatePreviousCertificate"
                class="form-control"
                id="inputCertificate"
                name="certificate"
                :value="certificateFile"
                @click="openCertificateModal(certificateFile)"
                readonly
              />
              <input
                v-else
                type="file"
                class="form-control"
                id="inputCertificate"
                name="certificate"
                accept="image/png, image/jpeg,.pdf"
              />
            </div>
          </div>
          <div class="row mt-5">
            <div class="col col-lg-6">
              <button
                v-if="previousCertificateExists && !updatePreviousCertificate"
                type="button"
                @click="activateUpdateCertificate"
                class="btn btn-primary"
              >
                Envoyer un nouveau document
              </button>
              <button
                v-else
                type="button"
                @click="passCertificateUpload"
                class="btn btn-secondary"
              >
                Passer pour l'instant
              </button>
            </div>
            <div class="col col-lg-6 text-end">
              <button
                v-if="previousCertificateExists && !updatePreviousCertificate"
                type="submit"
                class="btn btn-success"
                @click="createCertificate"
              >
                Les informations sont correctes
              </button>
              <button
                v-else
                type="submit"
                class="btn btn-primary"
                @click="uploadCertificate"
              >
                Envoyer
              </button>
            </div>
          </div>
        </form>
      </div>
      <div class="col-lg"></div>
    </div>
  </div>

  <DisplayCertificateVue
    v-show="showDisplayCertificateModal"
    @closeDisplayCertificateModal="toggleDisplayCertificateModal"
    :certificateFile="certificateFile"
  />
</template>

<script lang="ts">
import StepBar from "@/components/stepBar/StepBar.vue";
import DisplayCertificateVue from "@/components/modal/DisplayCertificate.vue";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    StepBar,
    DisplayCertificateVue,
  },
  data() {
    return {
      showDisplayCertificateModal: false,
      previousCertificateExists: false,
      updatePreviousCertificate: false,
      certificateFile: "",
      certificateId: -1,
    };
  },
  methods: {
    passCertificateUpload() {
      this.$router.push({ name: "RegisterPayment" });
    },
    activateUpdateCertificate() {
      this.updatePreviousCertificate = true;
    },
    toggleDisplayCertificateModal() {
      this.showDisplayCertificateModal = !this.showDisplayCertificateModal;
    },
    openCertificateModal(certificateFile: string) {
      this.certificateFile = certificateFile;
      this.toggleDisplayCertificateModal();
    },
    uploadCertificate() {
      if (this.previousCertificateExists && !this.updatePreviousCertificate) {
        this.updateCertificate();
      } else {
        this.createCertificate();
      }
    },
    async findPreviousCertificate() {
      const lastCertificate = await axios.get("certificates/me/last");
      if (lastCertificate.status >= 300) {
        return;
      }
      this.previousCertificateExists = true;
      this.certificateFile = lastCertificate.data.filename;
      this.certificateId = lastCertificate.data.id;
    },
    async updateCertificate() {
      const response = await axios.patch("/certificates/" + this.certificateId);
      if (response.status !== 200) return;
      this.$store.dispatch("user/setMe");
      this.$router.push({ name: "RegisterPayment" });
    },
    async createCertificate() {
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
        if (response.status !== 200) return;
        this.$store.dispatch("user/setMe");
        this.$router.push({ name: "RegisterPayment" });
      }
    },
  },
  beforeMount() {
    this.findPreviousCertificate();
  },
});
</script>

<style></style>
