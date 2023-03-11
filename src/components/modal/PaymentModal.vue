<template>
  <div class="backdrop overflow-scroll" @click.self="closeModal">
    <div
      class="col-10 col-lg-4 p-3 bg-light custom-modal m-auto rounded-3 mt-5"
    >
      <div class="row pt-3">
        <div class="col">
          <h4>Vous souhaitez procéder au paiement ? 💰</h4>
        </div>
        <div class="col-1">
          <button id="close-arrow" @click="closeModal">
            <span class="material-icons-outlined"> close </span>
          </button>
        </div>
      </div>
      <div class="row m-2 pt-3">
        <div class="col bg-primary text-start text-light rounded pt-3 mx-3">
          <p>
            Le paiement s'effectue sur
            <a href="https://www.helloasso.com/">HelloAsso</a>, une plateforme
            externe. Si vous constatez une erreur dans les informations de
            paiement (course, tarif VA ou non,...), vous pouvez nous contacter à
            l'adresse
            <a href="mailto:overrun@24heures.org">overrun@24heures.org</a>
            indiquant
          </p>
          <ul class="ms-5">
            <li class="fw-bold">Votre pseudo</li>
            <li class="fw-bold">Votre nom</li>
            <li class="fw-bold">Votre prénom</li>
            <li class="fw-bold">Les informations qui vous semblent érronées</li>
          </ul>
        </div>
      </div>

      <div class="d-flex flex-column justify-content-center align-items-center">
        <div>
          <table class="table table-striped table-bordered mt-5">
            <thead>
              <tr>
                <th scope="col">Détail</th>
                <th scope="col">Quantité</th>
                <th scope="col">Prix unitaire</th>
                <th scope="col">Prix total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ payment?.inscription?.race?.name }}</td>
                <td>1</td>
                <td>{{ centimesToEuro(payment.raceAmount) }}€</td>
                <td>{{ centimesToEuro(payment.raceAmount) }}€</td>
              </tr>
              <tr v-show="wantToDonate">
                <td>Don pour la course caritative</td>
                <td>1</td>
                <td>{{ centimesToEuro(payment.donationAmount) }}€</td>
                <td>{{ centimesToEuro(payment.donationAmount) }}€</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" class="table-active">
                  <strong>Total</strong>
                </td>
                <td colspan="2">{{ computeTotalAmount() }}€ TTC</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div class="mt-5">
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
      <div class="row m-2 pt-3">
        <div class="col bg-primary text-start text-light rounded pt-3 mx-3">
          <p>
            Chaque année, le Club des 24Heures de l'INSA organise une levée de
            fond, dont le montant est reversé à une association caritative.
            L’association
            <strong>Solidarité Internationale France-Congo</strong> sont nos
            partenaires pour cette nouvelle édition. Leur objectif est
            d’apporter assistance, aide humanitaire et de réaliser des actions
            de solidarité et de bienfaisance auprès de populations vulnérables
            au Congo. Parmi les opérations menées, on peut citer :
          </p>
          <ul>
            <li>Récolte de près de 443 kg de fourniture scolaire</li>
            <li>
              Collecte de matériel pour les personnes en situation de handicap,
              tels que des fauteuils roulants et des déambulateurs
            </li>
          </ul>
          <p>
            Si vous aussi vous voulez apportez votre soutien, alors n’hésitez
            pas à faire don du montant que vous souhaitez lors de vos
            inscriptions ! Nous vous remercions pour votre geste 💙
          </p>
        </div>
      </div>
      <div
        class="mt-5 d-flex justify-content-around align-items-center flex-wrap"
      >
        <div>
          <button
            class="btn btn-lg btn-primary mx-5"
            v-show="!loading && payment?.helloassoCheckoutIntentUrl === null"
            @click="getHelloassoRedirectLink"
            :disabled="wantToDonate === null"
          >
            <span>Procéder au paiement</span>
          </button>
          <button
            class="btn btn-lg btn-primary mx-5"
            v-show="!loading && isNecessaryToUpdatePayment"
            @click="updateMyPaymentWithNewDonationAmount"
            :disabled="wantToDonate === null"
          >
            <span>Obtenir un nouveau lien</span>
          </button>
          <button class="btn btn-lg btn-primary mx-5" v-show="loading">
            <span class="spinner-border" role="status"></span>
          </button>
          <button
            class="btn btn-lg btn-primary mx-5"
            v-show="
              !loading &&
              payment.helloassoCheckoutIntentUrl &&
              !isNecessaryToUpdatePayment
            "
          >
            <span>
              <a
                :href="payment.helloassoCheckoutIntentUrl"
                class="btn btn-primary d-flex align-items-center"
              >
                <img
                  aspect-ratio="1"
                  class="size-one-em"
                  src="https://backoffice.helloasso.com/Assets/dist/img/helloasso-badge.svg"
                />
                <p class="ms-2 m-0 p-0">Payer {{ computeTotalAmount() }}€</p>
              </a>
            </span>
          </button>
        </div>
        <p class="error">{{ errorMsg }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Inscription, InscriptionStatus } from "@/types/interface";
import { Payment } from "@/types/payment";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  name: "PaymentModal",
  data() {
    return {
      wantToDonate: null as boolean | null,
      otherDonationAmount: false,
      loading: false,
      isNecessaryToUpdatePayment: false,
      donationAmount: 0,
      errorMsg: "",
      payment: {} as Payment,
    };
  },
  computed: {
    inscription(): Inscription {
      return this.$store.getters["user/getMe"].inscriptions.find(
        (inscription: Inscription) =>
          inscription.edition.id ===
            this.$store.getters["edition/getEditionId"] &&
          inscription.status !== InscriptionStatus.CANCELLED
      );
    },
    paymentDonationAmount(): number {
      return this.payment.donationAmount;
    },
  },
  methods: {
    closeModal() {
      this.$emit("closePaymentModal");
    },
    async getHelloassoRedirectLink() {
      this.loading = true;
      const response = await axios.post(
        `/payments/${this.payment.id}/initiate`,
        {
          donationAmount: this.wantToDonate ? this.payment.donationAmount : 0,
        }
      );
      if (response.status !== 200) {
        this.errorMsg =
          response.data.errors?.at(0).message ?? "Une erreur est survenue";
        this.loading = false;
        return;
      }
      this.payment = response.data;
      this.loading = false;
    },
    centimesToEuro(centimes: number) {
      return centimes / 100;
    },
    euroToCentimes(euro: number) {
      return euro * 100;
    },
    computeTotalAmount() {
      return this.centimesToEuro(
        this.payment.raceAmount +
          (this.wantToDonate ? this.payment.donationAmount : 0)
      );
    },
    async getMyPayment() {
      const response = await axios.get("/payments/me");
      if (response.status !== 200)
        return (this.errorMsg = "Une erreur est survenue");
      this.payment = response.data.find(
        (payment: Payment) => payment.inscription.id === this.inscription.id
      );
      this.wantToDonate = this.payment.donationAmount > 0;
      this.checkIfPaymentLinkIsExpired();
    },
    async createPayment() {
      const response = await axios.post("/payments", {
        inscriptionId: this.inscription.id,
      });
      if (response.status === 409) {
        this.getMyPayment();
        return;
      }
      if (response.status !== 200)
        return (this.errorMsg = "Une erreur est survenue");
      this.payment = response.data;
    },
    async updateMyPaymentWithNewDonationAmount() {
      this.loading = true;
      const response = await axios.patch(
        `/payments/${this.payment.id}/update`,
        {
          donationAmount: this.wantToDonate ? this.payment.donationAmount : 0,
        }
      );
      if (response.status !== 200) {
        this.errorMsg =
          response.data.errors?.at(0).message ?? "Une erreur est survenue";
        this.loading = false;
        return;
      }
      if (response.status === 200) this.payment = response.data;
      this.isNecessaryToUpdatePayment = false;
      this.donationAmount = this.payment.donationAmount;
      this.loading = false;
    },
    checkIfPaymentLinkIsExpired() {
      if (this.payment.helloassoCheckoutIntentUrl === null) return;
      const expirationDate = new Date(this.payment.helloassoCheckoutExpiresAt);
      const now = new Date();
      if (now > expirationDate) this.isNecessaryToUpdatePayment = true;
    },
  },
  watch: {
    wantToDonate(newValue: boolean, oldValue: boolean) {
      if (oldValue === null) return;
      this.isNecessaryToUpdatePayment = true;
      if (newValue) {
        this.payment.donationAmount = this.donationAmount;
        return;
      }
      this.payment.donationAmount = 0;
    },
    paymentDonationAmount(newValue: number, oldValue: number) {
      if (oldValue === undefined) return;
      if (oldValue === newValue) return;
      this.isNecessaryToUpdatePayment = true;
    },
  },
  async mounted() {
    await this.createPayment();
  },
});
</script>

<style scoped>
.backdrop {
  top: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 10001;
  margin: 0;
}

#close-arrow {
  margin-top: -1vh;
  margin-right: 50px;
  background: none;
  border: none;
}

.error {
  color: red;
  flex-basis: 50%;
  padding: 0;
  margin: 0;
}
</style>
