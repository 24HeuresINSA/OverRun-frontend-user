<template>
  <div class="container-fluid h-100">
    <div class="row">
      <div class="col-md"></div>
      <div class="col col-md-4 text-start fw-bold">
        <form class="m-2">
          <div class="row">
            <div class="col form-group">
              <label for="inputCertificate"
                >Certificat:
                <span
                  class="material-icons"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Le certificat doit dater de moins d'un an au moment de la compétition et doit comporter l'autorisation de la pratiques des disciplines en compétition selon votre course. Les liscences des fédérations corrspondant aux courses sont accéptées (FFC pour le vélo par exemple)."
                >
                  help
                </span>
              </label>

              <input
                type="file"
                class="d-inline"
                id="inputCertificate"
                name="certificate"
                accept="image/png, image/jpeg,.pdf"
              />
            </div>
          </div>
          <div class="row mt-5">
              <div class="col col-md-6">
                <button class="btn btn-secondary">Passer pour l'instant</button>
              </div>
              <div class="col col-md-6 text-end">
                <button class="btn btn-primary">Envoyer</button>
              </div>
            </div>
        </form>
      </div>
      <div class="col-md"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
