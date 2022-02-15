<template>
  <div class="container-fluid h-100">
    <div class="row">
      <div class="col mt-5">
        <h1>Certificat</h1>
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
      <div class="col col-lg-4 text-start fw-bold">
        <form class="m-2">
          <div class="row">
            <div class="col form-group">
              <label for="inputCertificate"
                >Certificat:
                <span
                  class="material-icons"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Le certificat doit dater de moins d'un an au moment de la compétition et doit comporter l'autorisation de la pratiques des disciplines en compétition selon votre course. Les liscences des fédérations corrspondant aux courses sont accéptées (FFC pour le vélo par exemple)."
                >
                  help
                </span>
              </label>

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
            <div class="col col-lg-6">
              <button
                type="button"
                @click="passCertificateUpload"
                class="btn btn-secondary"
              >
                Passer pour l'instant
              </button>
            </div>
            <div class="col col-lg-6 text-end">
              <button
                type="button"
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import StepBar from "@/components/stepBar/StepBar.vue";

export default defineComponent({
  components: {
    StepBar,
  },
  methods: {
    passCertificateUpload() {
      console.log("Pass certificateUpload");
      this.$router.push({name: "RegisterPayment"})
    },
    uploadCertificate() {
      console.log("Upload Certificate");
    },
  },
});
</script>

<style></style>
