<template>
  <div class="container-fluid h-100">
    <div class="row">
      <div class="col-md"></div>
      <div class="col col-md-4 fw-bold text-start">
        <div class="row m-2">
          <label for="">
            Avez-vous une carte VA?
            <span
              class="material-icons"
              data-toggle="tooltip"
              data-placement="top"
              title="La carte VA est une carte réservé aux étudiant Insaliens adhérents à la vie associative de l'école."
            >
              help
            </span>
          </label>
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

        <div class="row m-2 mt-4">
          <div class="col text-end">
            <button class="btn btn-primary">Continuer</button>
          </div>
        </div>

        <div class="row m-2 mt-4">
          <form>
            <div class="row">
              <div class="col-12 col-md form-group">
                <label for="inputFirstName">Prénom: </label>
                <input type="text" class="form-control" id="inputFirstName" />
              </div>
              <div class="col-12 col-md form-group">
                <label for="inputLastName">Nom :</label>
                <input type="text" class="form-control" id="inputLastName" />
              </div>
            </div>
            <div class="row mt-2">
              <div class="col form-group">
                <label for="inputVA">Numero de carte VA: </label>
                <input type="text" class="form-control" id="inputVA" />
              </div>
            </div>
            <div class="row mt-5">
              <div class="col col-md-6">
                <button class="btn btn-secondary">J'ai un problème</button>
              </div>
              <div class="col col-md-6 text-end">
                <button class="btn btn-primary">Valider</button>
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

<style scoped>
#helpIcon {
  font-weight: 100;
  height: 5px;
  font-size: 10px !important;
}
</style>
