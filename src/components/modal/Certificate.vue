<template>
  <div class="backdrop" @click.self="closeModal">
    <div
      class="col-10 col-lg-4 p-3 bg-light custom-modal m-auto rounded-3 mt-5"
    >
      <div class="row pt-3">
        <div class="col">
          <h4>Vous avez un certificat medical à charger? 🩺</h4>
        </div>
      </div>
      <div class="row m-2 pt-3">
        <div class="col bg-primary text-start text-light rounded pt-3 mx-3">
          <p>
            Le certificat doit dater de moins d'un an au moment de la
            compétition et doit comporter l'autorisation de la pratiques des
            disciplines en compétition selon votre course. Les liscences des
            fédérations corrspondant aux courses sont accéptées (FFC pour le
            vélo par exemple).
          </p>
        </div>
      </div>

      <div class="row m-2 pt-3">
        <div class="col text-start fw-bold">
          <form>
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
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    closeModal() {
      this.$emit("closeCertificateModal");
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
</style>
