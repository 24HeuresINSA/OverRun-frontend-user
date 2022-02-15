<template>
  <div class="container-fluid h-100">
    <div class="row">
      <div class="col mt-5">
        <h1>Payement</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-lg"></div>
      <div class="col-12 col-lg-4 m-2">
        <StepBar :index="5" />
      </div>
      <div class="col-lg"></div>
    </div>
    <div class="row mt-4">
      <div class="col-lg"></div>
      <div class="col col-lg-4 mt-5 text-center fw-bold">
        <button class="btn btn-lg btn-primary">Procéder au payment</button>
      </div>
      <div class="col-lg"></div>
    </div>
    <div class="row mt-4">
      <div class="col-lg"></div>
      <div class="col col-lg-4 mt-5 text-center fw-bold">
        <button class="btn btn-sm btn-secondary" @click="passPayment">Payer plus tard</button>
      </div>
      <div class="col-lg"></div>
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
  methods: {
    passPayment() {
      console.log("Pass certificateUpload");
      this.$router.push({name: "Home"});
    },
    redirectPaymentSite() {
      console.log("Upload Certificate");
    },
  },
});
</script>

<style></style>
