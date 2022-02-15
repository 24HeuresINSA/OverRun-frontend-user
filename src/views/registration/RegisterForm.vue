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
      <div class="col-lg-4">
        <form class="text-start mb-5 fw-bold">
          <div class="row m-2">
            <div class="col-12 col-lg form-group">
              <label for="inputFirstName">Prénom: </label>
              <input
                v-model="firstName"
                type="text"
                class="form-control"
                id="inputFirstName"
              />
            </div>
            <div class="col-12 col-lg form-group">
              <label for="inputLastName">Nom :</label>
              <input
                v-model="lastName"
                type="text"
                class="form-control"
                id="inputLastName"
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
              />
            </div>
            <div class="col-12 col-lg-6 form-group">
              <label for="inputPhoneNumber">Télephone: </label>
              <input
                v-model="phoneNumber"
                type="text"
                class="form-control"
                id="inputPhoneNumber"
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
              />
            </div>
            <div class="col-12 col-lg-4 form-group">
              <label for="inputBirthDate">Sex: </label>
              <select
                v-model="sex"
                class="form-select"
                aria-label="Default select example"
              >
                <option value="" disabled selected hidden></option>
                <option value="0">Femme</option>
                <option value="1">Homme</option>
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
              />
            </div>
            <div class="col-12 col-lg form-group">
              <label for="inputZipCode">Code Postal: </label>
              <input
                v-model="zipCode"
                type="text"
                class="form-control"
                id="inputZipCode"
              />
            </div>
            <div class="col-12 col-lg form-group">
              <label for="inputCountry">Pays: </label>
              <input
                v-model="country"
                type="text"
                class="form-control"
                id="inputCountry"
              />
            </div>
          </div>
          <div class="row m-2 mt-3">
            <div class="col form-group">
              <input id="checkRules" class="mt-0 me-1" type="checkbox" value="" aria-label="Checkbox for following text input">
              <label for="checkRules"> Je confirme que j'ai bien pris connaissance du <a href="https://www.24heures.org/wp-content/uploads/2022/01/2022-01-19_Reglement-Interieur-Courses.pdf">règlement en vigueur</a> . </label>
            </div>
          </div>
          <div class="row m-2 mt-5">
            <div class="col form-group text-end">
              <button class="btn btn-primary" @click="register">
                S'inscrire
              </button>
            </div>
          </div>
        </form>
      </div>
      <div class="col"></div>
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
    register() {
      console.log(this.firstName, this.lastName, this.email, this.phoneNumber, this.password, this.confirmPassword, this.username, this.birthDate, this.sex, this.address, this.city, this.zipCode, this.country);
      this.$router.push({name: 'RegisterVa'})
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
