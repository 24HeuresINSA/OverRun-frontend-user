<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1 class="text-center">Paiement refusé 😭</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <p class="text-center">
            Votre paiement a été refusé. <br />
            Vous pouvez réessayer de payer ou nous contacter à cette adresse :
            <a href="mailto:overrun@24heures.org"> overrun@24heures.org </a>
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col d-flex justify-content-evenly">
          <div class="d-flex justify-content-center">
            <router-link to="/" class="btn btn-primary">
              Accéder à mon espace personnel
            </router-link>
          </div>
          <a
            :href="helloassoCheckoutIntentUrl"
            class="btn btn-primary d-flex align-items-center"
          >
            <img
              aspect-ratio="1"
              class="size-one-em"
              src="https://backoffice.helloasso.com/Assets/dist/img/helloasso-badge.svg"
            />
            <p class="ms-2 m-0 p-0">Payer {{ centimesToEuro(amount) }} €</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ErrorFromHelloasso",
  props: {
    helloassoCheckoutIntentUrl: {
      type: String,
      require: true,
    },
    amount: {
      type: Number,
      require: true,
    },
  },
  methods: {
    centimesToEuro(centimes: number | undefined) {
      if (!centimes) return 0;
      return centimes / 100;
    },
  },
});
</script>

<style>
.size-one-em {
  height: 1em;
}
</style>
