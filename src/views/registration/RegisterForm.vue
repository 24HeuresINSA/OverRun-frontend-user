<template>
  <div class="container-fluid bg-white h-100">
    <div class="row">
      <div class="col mt-5">
        <h1>Inscription</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-lg"></div>
      <div class="col-12 col-lg-4 m-2">
        <StepBar :index="1" />
      </div>
      <div class="col-lg"></div>
    </div>
    <div class="row mt-4">
      <div class="col"></div>
      <div class="col-lg-4 bg-primary rounded text-light text-start pt-2">
        <strong> <u>Information:</u> </strong>
        <p>
          Il n'est pas possible d'utiliser la même adresse email pour plusieurs
          comptes. Vous pouvez utiliser une sous adresse si vous avez une
          adresse gmail. <br />
          Par exemple, si votre adresse email est "monemail@gmail.com", vous
          pouvez utiliser "monemail+overrun@gmail.com", 'overrun' étant un mot
          de votre choix.
        </p>
      </div>
      <div class="col"></div>
    </div>
    <div class="row mt-2">
      <div class="col"></div>
      <div class="col-lg-4">
        <form class="text-start mb-5 fw-bold" @submit.prevent="register">
          <div class="row m-2">
            <div class="col-12 col-lg form-group">
              <label for="inputFirstName">Prénom: </label>
              <input
                v-model="firstName"
                type="text"
                class="form-control"
                id="inputFirstName"
                minlength="3"
                required
              />
            </div>
            <div class="col-12 col-lg form-group">
              <label for="inputLastName">Nom :</label>
              <input
                v-model="lastName"
                type="text"
                class="form-control"
                id="inputLastName"
                minlength="3"
                required
              />
            </div>
          </div>
          <div class="row m-2">
            <div class="col-12 col-lg-6 form-group">
              <label for="inputEmail">Email: </label>
              <input
                v-model="email"
                type="email"
                class="form-control"
                id="inputEmail"
                required
              />
            </div>
            <div class="col-12 col-lg-6 form-group">
              <label for="inputPhoneNumber">Téléphone: </label>
              <input
                title="Le numéro peut inclure des espaces et/ou un indicatif de pays"
                v-model="phoneNumber"
                type="tel"
                pattern="(\+|)[0-9 ]*"
                class="form-control"
                id="inputPhoneNumber"
                required
              />
            </div>
          </div>
          <div class="row m-2">
            <div class="col form-group">
              <label for="inputUserName">Pseudo: </label>
              <input
                v-model="username"
                type="text"
                class="form-control"
                id="inputUserName"
                required
              />
              <div v-show="duplicatePseudo" class="error">
                Le pseudo choisi n'est pas disponible. Merci d'en choisir un
                différent.
              </div>
            </div>
          </div>
          <div class="row m-2">
            <div class="col col-lg-6 form-group">
              <label for="inputPassword">Mot de passe: </label>
              <input
                v-model="password"
                type="password"
                class="form-control"
                id="inputPassword"
                minlength="8"
                required
              />
            </div>
            <div class="col col-lg-6 form-group">
              <label for="inputConfirmPassword" class="d-none d-md-inline"
                >Confirmez le mot de passe:
              </label>
              <input
                type="password"
                class="form-control"
                id="inputConfirmPassword"
                v-model="confirmPassword"
                minlength="8"
                required
              />
            </div>
            <div class="error" v-show="password !== confirmPassword">
              Les mots de passe ne correspondent pas
            </div>
          </div>
          <div class="row m-2">
            <div class="col-12 col-lg-4 form-group">
              <label for="inputBirthDate">Date de naissance: </label>
              <input
                v-model="birthDate"
                type="date"
                class="form-control"
                id="inputBirthDate"
                required
              />
              <div class="error" v-show="!dateIsCorrect()">
                La date est incorrecte!
              </div>
            </div>
            <div class="col-12 col-lg-4 form-group">
              <label for="inputBirthDate">Sexe: </label>
              <select
                v-model="sex"
                class="form-select"
                aria-label="Default select example"
                required
              >
                <option value="" disabled selected hidden></option>
                <option value="1">Femme</option>
                <option value="0">Homme</option>
              </select>
            </div>
          </div>
          <div class="row m-2">
            <div class="col form-group">
              <label for="inputAddress">Adresse: </label>
              <input
                v-model="address"
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
                v-model="city"
                type="text"
                class="form-control"
                id="inputCity"
                required
              />
            </div>
            <div class="col-12 col-lg form-group">
              <label for="inputZipCode">Code Postal: </label>
              <input
                v-model="zipCode"
                title="Le code postal doit contenir une suite de chiffres uniquement"
                type="text"
                class="form-control"
                id="inputZipCode"
                pattern="[0-9]*"
                required
              />
            </div>
            <div class="col-12 col-lg form-group">
              <label for="inputCountry">Pays: </label>
              <input
                v-model="country"
                type="text"
                class="form-control"
                id="inputCountry"
                required
              />
            </div>
          </div>
          <div class="row m-2 mt-3">
            <div class="col form-group">
              <input
                id="checkRules"
                class="mt-0 me-1"
                type="checkbox"
                value=""
                aria-label="Checkbox for following text input"
                required
              />
              <label for="checkRules">
                J'ai lu et j'accepte le
                <a
                  href="https://www.24heures.org/reglements/courses"
                  target="_blank"
                  >règlement en vigueur</a
                >
                .
              </label>
            </div>
          </div>
          <div class="row m-2 mt-5">
            <div class="col form-group text-end">
              <button
                class="btn btn-primary"
                type="submit"
                :disabled="
                  password !== confirmPassword ||
                  !dateIsCorrect() ||
                  duplicatePseudo ||
                  showErrorModal
                "
              >
                S'inscrire
              </button>
            </div>
          </div>
        </form>
      </div>
      <div class="col"></div>
    </div>
  </div>
  <Error v-show="showErrorModal" @closeErrorModal="toggleErrorModal" />
</template>

<script lang="ts">
import StepBar from "@/components/stepBar/StepBar.vue";
import Error from "@/components/modal/Error.vue";
import { MutationTypes } from "@/store/modules/auth";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    StepBar,
    Error,
  },
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      phoneNumber: null,
      password: null,
      confirmPassword: null,
      username: null,
      birthDate: "",
      sex: null,
      address: null,
      city: null,
      zipCode: null,
      country: null,
      duplicatePseudo: false,
      showErrorModal: false,
    };
  },
  methods: {
    toggleErrorModal() {
      this.showErrorModal = !this.showErrorModal;
    },
    dateIsCorrect() {
      const date = new Date(this.birthDate);
      if (this.birthDate === "") return true;
      if (isNaN(date.getTime())) return false;
      if (date < new Date()) return true;
      else return false;
    },
    async register() {
      const response = await axios.post("athletes", {
        firstName: this.firstName,
        lastName: this.lastName,
        address: this.address,
        zipCode: this.zipCode,
        city: this.city,
        country: this.country,
        phoneNumber: this.phoneNumber,
        email: this.email,
        username: this.username,
        password: this.password,
        dateOfBirth: this.birthDate,
        sex: this.sex == 1 ? true : false,
      });

      if (
        response.status === 409 &&
        response.data.message === "EMAIL_ALREADY_EXISTS"
      ) {
        alert(
          "L'utilisateur existe déjà, redirection vers la page de connexion"
        );
        this.$router.push({ name: "Login" });
      }
      if (
        response.status === 409 &&
        response.data.message === "USERNAME_ALREADY_EXISTS"
      ) {
        this.duplicatePseudo = true;
      }

      if (response.status === 400) {
        this.toggleErrorModal();
      }

      if (response.status < 300) {
        const response = await axios.post("login", {
          email: this.email,
          password: this.password,
          username: this.username,
        });

        if (response.status === 200) {
          this.$store.commit(
            `auth/${MutationTypes.SET_ACCESS_TOKEN}`,
            response.data.accessToken
          );
          this.$store.commit(
            `auth/${MutationTypes.SET_REFRESH_TOKEN}`,
            response.data.refreshToken
          );
          const base64Url =
            this.$store.getters["auth/getAccessToken"].split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split("")
              .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
              })
              .join("")
          );
          this.$store.commit(
            `auth/${MutationTypes.SET_USER}`,
            JSON.parse(jsonPayload).id
          );
          this.$store.commit(
            `auth/${MutationTypes.SET_ATHLETE_ID}`,
            JSON.parse(jsonPayload).athleteId
          );
          this.$store.dispatch("user/setMe");
          this.$router.push({ name: "RegisterTeam" });
        }
      }
    },
  },
  watch: {
    username(oldName, newName) {
      this.duplicatePseudo = false;
    },
  },
  mounted() {
    if (!this.$store.getters["edition/isRegistrationOpen"]) {
      alert("Désolé, mais il est trop tôt/tard pour s'inscrire");
      return this.$router.push({ name: "Home" });
    }
  },
});
</script>

<style scoped>
#app {
  background-color: white;
}
.text-light {
  color: white;
}
</style>
