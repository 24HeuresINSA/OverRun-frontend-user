<template>
  <div class="backdrop" @click.self="closeModal">
    <div
      class="col-10 col-lg-4 p-3 bg-light custom-modal m-auto rounded-3 mt-5"
    >
      <div v-show="!passwordReseted">
        <div class="row pt-3">
          <div class="col">
            <h4>Envie de changer de mot de passe? 😎</h4>
          </div>
        </div>
        <div class="row text-start">
          <div class="col m-2">
            <div class="row px-2 fw-bold" v-show="matchError">
              <div class="col text-danger">
                Les deux mots de passe ne correspondent pas!
              </div>
            </div>
            <div class="row px-2 fw-bold" v-show="lengthError">
              <div class="col text-danger">
                Le mot de passe doit faire plus de 8 caractères!
              </div>
            </div>
            <form action="">
              <div class="row p-2 fw-bold">
                <div class="col form-group">
                  <label for="inputNewPassword"> Nouveau mot de passe:</label>
                  <input
                    type="password"
                    class="form-control"
                    id="inputNewPassword"
                    v-model="newPassword"
                    minlength="8"
                    required
                  />
                </div>
              </div>
              <div class="row p-2 fw-bold">
                <div class="col form-group">
                  <label for="inputConfirmPassword">
                    Confirmer mot de passe:</label
                  >
                  <input
                    type="password"
                    class="form-control"
                    id="inputConfirmPassword"
                    v-model="confirmPassword"
                    minlength="8"
                    required
                  />
                </div>
              </div>
              <div class="row mt-4">
                <div class="col form-group text-center">
                  <button
                    class="btn btn-primary"
                    type="button"
                    @click="updatePassword"
                  >
                    Mettre à jour
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div v-show="passwordReseted">
        <div class="row pt-3">
          <div class="col">
            <h5 class="big-emoji pb-0 mb-0 pt-3">🎉</h5>
          </div>
        </div>
        <div class="row pt-3">
          <div class="col mx-2 text-center">
            <p>Victoire! Votre mot de passe a bien été mis à jour!</p>
          </div>
        </div>
        <div class="row text-start">
          <div class="col m-2">
            <div class="col form-group text-center">
              <button class="btn btn-primary" type="submit" @click="closeModal">
                Fermer
              </button>
            </div>
          </div>
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
      passwordReseted: false,
      newPassword: "",
      confirmPassword: "",
      matchError: false,
      lengthError: false,
    };
  },
  methods: {
    closeModal() {
      this.passwordReseted = false;
      this.matchError = false;
      this.$emit("closeChangePasswordModal");
    },
    checkPassword() {
      let error = false;
      this.matchError = false;
      this.lengthError = false;
      if (this.newPassword !== this.confirmPassword) {
        this.matchError = true;
        error = true;
      }
      if (this.newPassword.length <= 8) {
        this.lengthError = true;
        error = true;
      }
      if (error) {
        this.newPassword = "";
        this.confirmPassword = "";
      }
      return !error;
    },
    async updatePassword() {
      if (this.checkPassword() === true) {
        const userId = this.$store.getters[`user/getMe`].user.id;
        const newPasswordResponse = await axios.patch(
          `/users/${userId}/updatePassword`,
          {
            password: this.newPassword,
          }
        );
        this.passwordReseted = newPasswordResponse.status < 300;
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

.big-emoji {
  font-size: 120px;
  vertical-align: middle;
  line-height: 1;
}
</style>
