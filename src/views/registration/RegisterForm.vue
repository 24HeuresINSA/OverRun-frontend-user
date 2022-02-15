<template>
  <div class="container-fluid h-100">
    <div class="row">
      <h1></h1>
    </div>
    <div class="row">
      <div class="col"></div>
      <div class="col-md-4">
        <form class="text-start fw-bold">
          <div class="row m-2">
            <div class="col-12 col-md form-group">
              <label for="inputFirstName">Prénom: </label>
              <input type="text" class="form-control" id="inputFirstName" />
            </div>
            <div class="col-12 col-md form-group">
              <label for="inputLastName">Nom :</label>
              <input type="text" class="form-control" id="inputLastName" />
            </div>
          </div>
          <div class="row m-2">
            <div class="col form-group">
              <label for="inputEmail">Email: </label>
              <input type="email" class="form-control" id="inputEmail" />
            </div>
          </div>
          <div class="row m-2">
            <div class="col form-group">
              <label for="inputUserName">Pseudo: </label>
              <input type="text" class="form-control" id="inputUserName" />
            </div>
          </div>
          <div class="row m-2">
            <div class="col col-md-6 form-group">
              <label for="inputPassword">Mot de passe: </label>
              <input type="password" class="form-control" id="inputPassword" />
            </div>
            <div class="col col-md-6 form-group">
              <label for="inputConfirmPassword">Confirmez mot de passe: </label>
              <input
                type="password"
                class="form-control"
                id="inputConfirmPassword"
              />
            </div>
          </div>
          <div class="row m-2">
            <div class="col-12 col-md-4 form-group">
              <label for="inputBirthDate">Date de naissance: </label>
              <input type="date" class="form-control" id="inputBirthDate" />
            </div>
            <div class="col-12 col-md-4 form-group">
              <label for="inputBirthDate">Sex: </label>
              <select class="form-select" aria-label="Default select example">
                <option value="" disabled selected hidden></option>
                <option value="2">Femme</option>
                <option value="1">Homme</option>
              </select>
            </div>
          </div>
          <div class="row m-2">
            <div class="col form-group">
              <label for="inputAddress">Adresse: </label>
              <input type="text" class="form-control" id="inputAddress" />
            </div>
          </div>
          <div class="row m-2">
            <div class="col-12 col-md-6 form-group">
              <label for="inputCity">Ville: </label>
              <input type="text" class="form-control" id="inputCity" />
            </div>
            <div class="col-12 col-md form-group">
              <label for="inputZipCode">Code Postal: </label>
              <input type="text" class="form-control" id="inputZipCode" />
            </div>
            <div class="col-12 col-md form-group">
              <label for="inputCountry">Pays: </label>
              <input type="text" class="form-control" id="inputCountry" />
            </div>
          </div>
          <div class="row m-2 mt-5">
            <div class="col form-group text-end">
              <button class="btn btn-primary">S'inscrire</button>
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

export default defineComponent({});
</script>

<style></style>
