<template>
  <div class="container-fluid h-100">
    <div class="row">
      <div class="col-md"></div>
      <div class="col col-md-4 text-start fw-bold">
        <div class="row m-2">
          <label for=""> Souhaitez-vous faire la course en équipe? </label>
          <div class="ms-4 mt-2">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
              />
              <label class="form-check-label" for="flexRadioDefault1">
                Oui
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                checked
              />
              <label class="form-check-label" for="flexRadioDefault2">
                Non
              </label>
            </div>
          </div>
        </div>

        <div class="row mt-4">
          <form>
            <div class="row m-2">
              <div class="col form-group">
                <label for="inputBirthDate">Selection votre course: </label>
                <select class="form-select" aria-label="Default select example">
                  <option value="" disabled selected hidden></option>
                  <option value="2">Femme</option>
                  <option value="1">Homme</option>
                </select>
              </div>
              <div class="row m-2 mt-5">
                <div class="col form-group text-end">
                  <button class="btn btn-primary">Continuer</button>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div class="row m-2 mt-4">
          <label for=""> Que souhaitez-vous faire? </label>
          <div class="ms-4 mt-2">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
              />
              <label class="form-check-label" for="flexRadioDefault1">
                Rejoindre une équipe existante
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                checked
              />
              <label class="form-check-label" for="flexRadioDefault2">
                Créer une nouvelle équipe
              </label>
            </div>
          </div>
        </div>

        <div class="row mt-4">
          <form>
            <div class="row m-2">
              <div class="col-12 col-md form-group">
                <label for="selectTeam"
                  >Selectionnez l'équipe à rejoindre:
                </label>
                <select
                  class="form-select"
                  id="selectTeam"
                  aria-label="Default select example"
                >
                  <option value="" disabled selected hidden></option>
                  <option value="2">Equipe 1</option>
                  <option value="1">Equipe 2</option>
                </select>
              </div>
            </div>
            <div class="row m-2">
              <div class="col form-group">
                <label for="inputTeamPassword"
                  >Mot de passe de l'équipe:
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="inputTeamPassword"
                />
              </div>
            </div>
            <div class="row m-2 mt-5">
              <div class="col text-end">
                <button class="btn btn-primary">Rejoindre l'équipe</button>
              </div>
            </div>
          </form>
        </div>

        <div class="row mt-4">
          <form>
            <div class="row m-2">
              <div class="col form-group">
                <label for="inputTeamName">Nom de l'équipe: </label>
                <input type="text" class="form-control" id="inputTeamName" />
              </div>
            </div>
            <div class="row m-2">
              <div class="col form-group">
                <label for="inputCreatePassword">Mot de passe: </label>
                <input
                  type="text"
                  class="form-control"
                  id="inputCreatePassword"
                />
              </div>
            </div>
            <div class="row m-2">
              <div class="col-12 form-group">
                <label for="inputCreateCategory">Category: </label>
                <select
                  class="form-select"
                  id="inputCreateCategory"
                  aria-label="Default select example"
                >
                  <option value="" disabled selected hidden></option>
                  <option value="2">Loisir (2 à 12 personnes)</option>
                  <option value="1">Compétition (2 à 4 personnes)</option>
                </select>
              </div>
            </div>
            <div class="row m-2">
              <div class="col-12 form-group">
                <label for="inputCreateRace">Course: </label>
                <select
                  class="form-select"
                  id="inputCreateRace"
                  aria-label="Default select example"
                >
                  <option value="" disabled selected hidden></option>
                  <option value="1">Course à pied</option>
                  <option value="1">Vélo</option>
                  <option value="2">Triathlon</option>
                </select>
              </div>
            </div>
            <div class="row mt-5">
              <div class="col text-end">
                <button class="btn btn-primary">Créer l'équipe</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="col-md"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>

<style></style>
