<template>
  <div class="container-fluid p-0">
    <div class="d-none d-lg-block">
      <TopBar :title="title" :userButton="true" />
    </div>

    <div class="d-block d-lg-none">
      <MiniTopBar :userButton="true" />
    </div>

    <ChangePassword
      v-show="showChangePasswordModal"
      @closeChangePasswordModal="toggleChangePasswordModal"
    />

    <DeleteAccount
      v-show="showDeleteAccountModal"
      @closeDeleteAccountModal="toggleDeleteAccountModal"
    />
    <Error v-show="showErrorModal" @closeErrorModal="toggleErrorModal" />

    <div class="row">
      <div class="col">
        <div class="container mt-5">
          <div class="row m-2 mt-4 text-start">
            <div class="col col-sm-12 boder-bottom">
              <h2>Modifier mes informations</h2>
            </div>
          </div>

          <form class="text-start mb-4 fw-bold" @submit.prevent="">
            <div class="row m-2">
              <div class="col-12 col-lg form-group">
                <label for="inputFirstName">Prénom: </label>
                <input
                  v-model="me.firstName"
                  type="text"
                  class="form-control"
                  id="inputFirstName"
                  required
                />
              </div>
              <div class="col-12 col-lg form-group">
                <label for="inputFirstName">Nom: </label>
                <input
                  v-model="me.lastName"
                  type="text"
                  class="form-control"
                  id="inputFirstName"
                  required
                />
              </div>
            </div>
            <div class="row m-2">
              <div class="col form-group">
                <label for="inputUserName">Pseudo: </label>
                <input
                  v-model="me.user.username"
                  type="text"
                  class="form-control"
                  id="inputUserName"
                  required
                />
              </div>
            </div>
            <div class="row m-2">
              <div class="col-12 col-lg-6 form-group">
                <label for="inputPhoneNumber">Téléphone: </label>
                <input
                  v-model="me.phoneNumber"
                  type="text"
                  class="form-control"
                  id="inputPhoneNumber"
                  required
                />
              </div>
            </div>
            <div class="row m-2">
              <div class="col-12 col-lg-4 form-group">
                <label for="inputBirthDate">Date de naissance: </label>
                <input
                  v-model="me.dateOfBirth"
                  type="date"
                  class="form-control"
                  id="inputBirthDate"
                  required
                />
              </div>
              <div class="col-12 col-lg-4 form-group">
                <label for="inputSex">Sexe: </label>
                <select
                  class="form-select"
                  v-model="me.sex"
                  aria-label="Default select example"
                  required
                >
                  <option value="" disabled selected hidden></option>
                  <option value="true">Femme</option>
                  <option value="false">Homme</option>
                </select>
              </div>
            </div>
            <div class="row m-2">
              <div class="col form-group">
                <label for="inputAddress">Adresse: </label>
                <input
                  v-model="me.address"
                  type="text"
                  class="form-control"
                  id="inputAddress"
                  required
                />
              </div>
            </div>
            <div class="row m-2">
              <div class="col-12 col-lg-6 form-group">
                <label for="inputCity">Ville: </label>
                <input
                  v-model="me.city"
                  type="text"
                  class="form-control"
                  id="inputCity"
                  required
                />
              </div>
              <div class="col-12 col-lg form-group">
                <label for="inputZipCode">Code Postal: </label>
                <input
                  v-model="me.zipCode"
                  type="text"
                  class="form-control"
                  id="inputZipCode"
                  required
                />
              </div>
              <div class="col-12 col-lg form-group">
                <label for="inputCountry">Pays: </label>
                <input
                  v-model="me.country"
                  type="text"
                  class="form-control"
                  id="inputCountry"
                  required
                />
              </div>
            </div>
          </form>
          <div class="row m-2 text-start">
            <div class="col text-start">
              <button
                type="submit"
                class="btn btn-primary"
                @click="updateUserInfo()"
              >
                Modifier mes informations
              </button>
              <div class="text-success" v-show="updateSuccess">
                Vos informations ont bien été mises à jour
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="container mt-5">
          <div class="row m-2 mt-4 text-start">
            <div class="col col-sm-12 boder-bottom">
              <h2>Modifier mon mot de passe</h2>
            </div>
          </div>
          <div class="row m-2 mt-4 text-start">
            <div class="col text-start">
              <button
                type="submit"
                class="btn btn-primary"
                @click="toggleChangePasswordModal"
              >
                Modifier mon mot de passe
              </button>
            </div>
          </div>
        </div>

        <div class="container mt-5">
          <div class="row m-2 mt-4 text-start">
            <div class="col col-sm-12 boder-bottom">
              <h2>Supprimer mon compte</h2>
            </div>
          </div>
          <div class="row m-2 mt-4 text-start">
            <div class="col text-start">
              <button
                type="submit"
                class="btn btn-danger"
                @click="toggleDeleteAccountModal"
              >
                Supprimer mon compte
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-5">
      <div class="row m-2 mt-4">
        <div class="col text-center">
          <button
            type="submit"
            class="btn btn-primary"
            @click="goBackToDashboard"
          >
            Retour
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ChangePassword from "@/components/modal/ChangePassword.vue";
import DeleteAccount from "@/components/modal/DeleteAccount.vue";
import MiniTopBar from "@/components/topBar/MiniTopBar.vue";
import TopBar from "@/components/topBar/TopBar.vue";
import Error from "@/components/modal/Error.vue";
import { dateFormat } from "@/types/dateFormat";
import { Athlete } from "@/types/interface";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    TopBar,
    MiniTopBar,
    DeleteAccount,
    ChangePassword,
    Error,
  },
  data() {
    return {
      title: "Mon compte",
      showChangePasswordModal: false,
      showDeleteAccountModal: false,
      me: {} as Athlete,
      showErrorModal: false,
      updateSuccess: false,
    };
  },

  methods: {
    getMe() {
      this.me = this.$store.getters["user/getMe"];
      console.log(this.me.dateOfBirth);
      this.me = {
        ...this.me,
        dateOfBirth: this.htmlImputDateTime(this.me.dateOfBirth),
      };
    },
    async updateUserInfo() {
      const responseUpdate = await axios.put("/athletes/" + this.me.id, {
        ...this.me,
        dateOfBirth: new Date(this.me.dateOfBirth),
      });
      if (responseUpdate.status >= 300) {
        this.toggleErrorModal();
        return;
      }
      this.updateSuccess = true;
    },
    htmlImputDateTime(date: string) {
      const formatedDate = this.formateDate(date);
      const day = formatedDate.slice(0, 2);
      const month = formatedDate.slice(3, 5);
      const year = formatedDate.slice(6, 10);
      return `${year}-${month}-${day}`;
    },
    formateDate(date: string) {
      return new Date(date).toLocaleDateString("FR-fr", dateFormat);
    },
    goBackToDashboard() {
      console.log("Go back to Dashboard");
      this.$router.push({ name: "Home" });
    },
    toggleErrorModal() {
      this.showErrorModal = !this.showErrorModal;
    },
    toggleChangePasswordModal() {
      this.showChangePasswordModal = !this.showChangePasswordModal;
    },
    toggleDeleteAccountModal() {
      this.showDeleteAccountModal = !this.showDeleteAccountModal;
    },
  },
  beforeMount() {
    this.getMe();
  },
});
</script>
