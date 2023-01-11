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

    <div class="d-flex flex-column justify-content-center align-items-center">
      <div class="mt-5">
        {{ payment.inscription.race.name }} x 1 -
        {{ centimesToEuro(payment.totalAmount) }}€
      </div>
      <div class="mt-2" v-show="wantToDonate">
        Don de {{ centimesToEuro(payment.donationAmount) }}€ x 1 -
        {{ centimesToEuro(payment.donationAmount) }}€
      </div>
      <div class="mt-4">
        <form>
          <p>Je souhaite faire un don pour la course caritative</p>
          <div class="form-check d-flex justify-content-center">
            <div class="form-check">
              <label class="form-check-label" for="flexCheckDefault"
                >Oui
              </label>
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="donationYes"
                :value="true"
                v-model="wantToDonate"
              />
            </div>
            <div class="form-check ms-4">
              <label class="form-check-label" for="flexCheckDefault"
                >Non
              </label>
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="donationNo"
                :value="false"
                v-model="wantToDonate"
              />
            </div>
          </div>

          <div class="form-check d-flex justify-content-center">
            <div class="form-check" v-show="wantToDonate">
              <p>Je donne :</p>
              <div class="form-check d-flex">
                <div class="form-check">
                  <label class="form-check-label me-2" for="flexCheckDefault">
                    1 €
                  </label>
                  <input
                    class="form-check-input"
                    type="radio"
                    name="donationAmount"
                    id="donationOneEuro"
                    :value="100"
                    v-model="payment.donationAmount"
                  />
                </div>
                <div class="form-check">
                  <label class="form-check-label me-2" for="flexCheckDefault">
                    5 €
                  </label>
                  <input
                    class="form-check-input"
                    type="radio"
                    name="donationAmount"
                    id="donationTwoEuro"
                    :value="500"
                    v-model="payment.donationAmount"
                  />
                </div>
                <div class="form-check">
                  <label class="form-check-label me-2" for="flexCheckDefault">
                    10 €
                  </label>
                  <input
                    class="form-check-input"
                    type="radio"
                    name="donationAmount"
                    id="donationTenEuro"
                    :value="1000"
                    v-model="payment.donationAmount"
                  />
                </div>
                <div class="form-check">
                  <label class="form-check-label me-2" for="flexCheckDefault">
                    25 €
                  </label>
                  <input
                    class="form-check-input"
                    type="radio"
                    name="donationAmount"
                    id="donationTwentyFiveEuro"
                    :value="2500"
                    v-model="payment.donationAmount"
                  />
                </div>
                <div class="form-check">
                  <label class="form-check-label me-2" for="flexCheckDefault">
                    50 €
                  </label>
                  <input
                    class="form-check-input"
                    type="radio"
                    name="donationAmount"
                    id="donationFifteenEuro"
                    :value="5000"
                    v-model="payment.donationAmount"
                  />
                </div>
                <div class="form-check">
                  <label class="form-check-label me-2" for="flexCheckDefault">
                    Autre
                  </label>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="otherDonationAmount"
                    id="donationFifteenEuro"
                    :value="true"
                    v-model="otherDonationAmount"
                  />
                </div>
              </div>

              <div v-show="otherDonationAmount">
                <div class="form-check d-flex">
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Montant"
                    aria-describedby="basic-addon1"
                    :value="centimesToEuro(payment.donationAmount)"
                    @input="
                      (event) =>
                        (payment.donationAmount = euroToCentimes(
                          // @ts-ignore
                          event.target.value
                        ))
                    "
                  />
                  <span class="input-group-text" id="basic-addon1">€</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div
        class="mt-5 text-center d-flex justify-content-around align-items-center"
      >
        <button class="btn btn-lg btn-secondary mx-5" @click="passPayment">
          Payer plus tard
        </button>
        <button class="btn btn-lg btn-primary mx-5">Procéder au payment</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import StepBar from "@/components/stepBar/StepBar.vue";
import { Inscription } from "@/types/interface";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    StepBar,
  },
  data() {
    return {
      wantToDonate: null,
      otherDonationAmount: false,
      payment: {
        id: 9,
        status: "NOT_STARTED",
        totalAmount: 1500,
        donationAmount: 0,
        helloassoCheckoutIntentId: null,
        helloassoCheckoutIntentUrl: null,
        helloassoCheckoutExpiresAt: null,
        helloassoPaymentReceiptUrl: null,
        inscription: {
          id: 9,
          athlete: { id: 9 },
          race: {
            id: 2,
            name: "Vélo equipe",
            registrationPrice: 1500,
            vaRegistrationPrice: 2500,
          },
        },
      },
    };
  },
  methods: {
    passPayment() {
      this.$router.push({ name: "Home" });
    },
    redirectPaymentSite() {
      console.log("Upload Certificate");
    },
    centimesToEuro(centimes: number) {
      return centimes / 100;
    },
    euroToCentimes(euro: number) {
      return euro * 100;
    },
  },
  async mounted() {
    const inscriptions = this.$store.getters["user/getMe"].inscriptions;
    const inscription = inscriptions.find(
      (inscription: Inscription) =>
        inscription.edition.id === this.$store.getters["edition/getEditionId"]
    );
    const response = await axios.post("/payments", {
      inscriptionId: inscription.id,
    });
    if (response.status !== 200) return alert("Une erreur est survenue");
    this.payment = response.data;
  },
});
</script>

<style></style>
