<template>
  <div class="container-fluid m-0 p-0">
    <PasswordReseted
      v-show="showPasswordResetedModal"
      @closePasswordResetedModal="togglePasswordResetedModal"
    />

    <div class="d-none d-lg-block">
      <TopBar :userButton="false" />
    </div>

    <div class="d-block d-lg-none">
      <MiniTopBar :userButton="false" />
    </div>

    <div class="row mt-5">
      <div class="col m-2">
        <h2>Réinitialisation mot de passe</h2>
      </div>
    </div>

    <div class="row mx-3 mx-lg-0 mt-md-3 mt-2 mx-3 mx-md-0">
      <div class="col-md col-lg"></div>
      <div class="col col-md-6 col-lg-3 text-start">
        <div class="row fw-bold" v-show="wrongPassword">
          <div class="col text-danger">
            Les deux mots de passe ne correspondent pas!
          </div>
        </div>
        <form @submit.prevent="sendInvite">
          <div class="row mt-2 fw-bold">
            <div class="col form-group">
              <label for="inputNewPassword">Nouveau mot de passe: </label>
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
          <div class="row my-2 fw-bold">
            <div class="col form-group">
              <label for="inputConfirmPassword">Confirmer mot de passe: </label>
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
          <div class="row mt-5">
            <div class="col form-group text-center text-md-end">
              <button
                class="btn btn-primary"
                type="button"
                @click="checkPassword"
              >
                Réinitialiser mon mot de passe
              </button>
            </div>
          </div>
        </form>
      </div>
      <div class="col-md col-lg"></div>
    </div>
  </div>
</template>

<script lang="ts">
import PasswordReseted from "@/components/modal/PasswordReseted.vue";
import MiniTopBar from "@/components/topBar/MiniTopBar.vue";
import TopBar from "@/components/topBar/TopBar.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    TopBar,
    MiniTopBar,
    PasswordReseted,
  },
  data() {
    return {
      newPassword: "",
      confirmPassword: "",
      wrongPassword: false,
      showPasswordResetedModal: true,
    };
  },
  methods: {
    checkPassword() {
      console.log("Check password");
      console.log(this.newPassword);
      console.log(this.confirmPassword);
      if (this.confirmPassword !== this.newPassword) {
        this.wrongPassword = true;
        this.newPassword = "";
        this.confirmPassword = "";
        return false;
      }
      return true;
    },
    sendInvite() {
      console.log("Envoyer une invite");
    },
    togglePasswordResetedModal() {
      this.showPasswordResetedModal = !this.showPasswordResetedModal;
    },
  },
});
</script>
