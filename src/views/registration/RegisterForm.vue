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
        <strong> <u>Attention:</u> </strong>
        <p>
          Si vous disposez d'une carte VA, assurez-vous que les nom et prénom
          saisies dans le formulaire d'inscription correspondent bien aux nom et
          prénom figurant sur votre carte VA.
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
              <label for="inputPhoneNumber">Télephone: </label>
              <input
                v-model="phoneNumber"
                type="text"
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
                required
              />
            </div>
            <div class="col col-lg-6 form-group">
              <label for="inputConfirmPassword" class="d-none d-md-inline"
                >Confirmez le mot de passe:
              </label>
              <label for="inputConfirmPassword" class="d-inline d-md-none"
                >Confirmez le mdp:
              </label>
              <input
                type="password"
                class="form-control"
                id="inputConfirmPassword"
                v-model="confirmPassword"
                required
              />
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
                type="text"
                class="form-control"
                id="inputZipCode"
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
                Je confirme que j'ai bien pris connaissance du
                <a
                  href="https://www.24heures.org/wp-content/uploads/2022/01/2022-01-19_Reglement-Interieur-Courses.pdf"
                  >règlement en vigueur</a
                >
                .
              </label>
            </div>
          </div>
          <div class="row m-2 mt-5">
            <div class="col form-group text-end">
              <button class="btn btn-primary" type="submit">S'inscrire</button>
            </div>
          </div>
        </form>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script lang="ts">
import StepBar from "@/components/stepBar/StepBar.vue";
import { MutationTypes } from "@/store/modules/auth";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    StepBar,
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
      birthDate: null,
      sex: null,
      address: null,
      city: null,
      zipCode: null,
      country: null,
    };
  },
  methods: {
    async register() {
      const response = await axios.post(
        "athletes",
        {
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
        },
        {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
          },
        }
      );

      if (response.status === 409) {
        alert(
          "L'utilisateur existe déjà, redirection vers la page de connexion"
        );
        this.$router.push({ name: "Login" });
      }

      if (response.status < 300) {
        const response = await axios.post("login", {
          email: this.email,
          password: this.password,
          username: this.username,
        });

        if (response.status === 200) {
          this.$store.commit(
            MutationTypes.SET_ACCESS_TOKEN,
            response.data.accessToken
          );
          this.$store.commit(
            MutationTypes.SET_REFRESH_TOKEN,
            response.data.refreshToken
          );
          const base64Url = this.$store.getters.getAccessToken.split(".")[1];
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
            MutationTypes.SET_USER,
            JSON.parse(jsonPayload).id
          );
          this.$store.commit(
            MutationTypes.SET_ATHLETE_ID,
            JSON.parse(jsonPayload).athleteId
          );
          this.$router.push({ name: "RegisterTeam" });
        }
      }
    },
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
