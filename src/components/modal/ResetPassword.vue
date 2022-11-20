<template>
  <div class="backdrop" @click.self="closeModal">
    <div
      class="col-10 col-lg-4 p-3 bg-light custom-modal m-auto rounded-3 mt-5"
    >
      <div v-show="!resetEmailSend">
        <div class="row pt-3">
          <div class="col">
            <h4>Un problème avec votre mot de passe? &#128557;</h4>
          </div>
        </div>
        <div class="row pt-3">
          <div class="col mx-2 text-start">
            <p>
              Pas de panique, entrez l'adresse mail avec laquelle votre compte a
              été créée. Si votre compte existe bien, une invitation de
              reinitialisation de mot de passe vous sera envoyée à cette
              adresse.
            </p>
          </div>
        </div>
        <div class="row text-start">
          <div class="col m-2">
            <form action="">
              <div class="row fw-bold">
                <div class="col form-group">
                  <label for="inputEmail"> Adresse email:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputEmail"
                    required
                  />
                </div>
              </div>
              <div class="row mt-4">
                <div class="col form-group text-center">
                  <button class="btn btn-primary" type="submit">
                    Envoyer un mail de reinitialisation
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div v-show="resetEmailSend">
        <div class="row pt-3">
          <div class="col text-center">
            <h5 class="big-emoji pb-0 mb-0 pt-3">📨</h5>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <p>
              Un email de reinistialisation a été envoyé à l'adresse
              <strong>francois.rlt@orange.fr</strong>!
            </p>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col form-group text-center">
            <button class="btn btn-primary" type="submit" @click="closeModal">
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      resetEmailSend: false,
    };
  },
  methods: {
    closeModal() {
      this.resetEmailSend = false;
      this.$emit("closeResetPasswordModal");
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

.big-emoji {
  font-size: 120px;
  vertical-align: middle;
  line-height: 1;
}
</style>
