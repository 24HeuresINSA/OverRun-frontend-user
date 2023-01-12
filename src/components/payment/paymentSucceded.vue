<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1 class="text-center">Paiement réussi 🎉</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <p class="text-center">
            Votre paiement a bien été pris en compte. <br />
            Vous pouvez maintenant accéder à votre espace personnel.
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="d-flex justify-content-center">
            <router-link to="/" class="btn btn-primary">
              Accéder à mon espace personnel
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PaymentSucceded",
});
</script>

<style></style>
