<template>
  <div class="container-fluid h-100">
    <div class="row">
      <div class="col mt-5">
        <h1>Paiement</h1>
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

      <div>
        <form>
          <img src="@/assets/course-cari.jpg" alt="Logo de l'association Le coeur et la Main" height="120"/>  
          <p>Je souhaite faire un don pour la course caritative
            (<a href="http://www.coeuretlamain.fr" target="_blank"
              >Plus d'informations</a>)
          </p>
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
        class="d-flex flex-column justify-content-center align-items-center w-50"
      >
        <div class="bg-primary text-light rounded pt-3 px-3 mx-3 text-start" >
          
          <p>
            Durant les 24 heures de courses, nous soutenons l’association <strong>Le Cœur et la Main</strong>
            , créée en 2017 par 11 membres fondateurs liés par leur 
            amitié. Réunis tout d’abord sous le nom « Le mercredi c’est surimi », leur objectif était 
            à l’époque de réunir des fonds pour organiser une kermesse en faveur de personnes issues 
            de milieux précaires. L’association a maintenant grandi et accueille de nouveaux membres 
            enthousiastes et de nouveaux projets solidaires.
          </p>
          <p>L'association récolte des financements par 
            l’organisation d’évènements ponctuels (marchés participatifs, concerts solidaires, 
            vente d’objets d’arts…) et par des donations et du crowfunding (collecte d’apports 
            financiers de particuliers au moyen d’une plateforme Internet). Aujourd’hui, 
            <strong>Le Cœur et la Main</strong> s’évertue à soutenir des projets sociaux lyonnais pour protéger les 
            plus vulnérables et a étendu son champ d’intervention à des missions à l’étranger, encore 
            et toujours portées par ses membres.</p>
          <p>
            Pour plus d'informations, visitez leur site :
            <a href="http://www.coeuretlamain.fr" target="_blank"
              >http://www.coeuretlamain.fr</a
            >
          </p>
          <p>
            Si vous aussi vous voulez apportez votre soutien, alors n’hésitez
            pas à faire don du montant que vous souhaitez lors de vos
            inscriptions ! Nous vous remercions pour votre geste 💙
          </p>
        </div>
      </div>
      <div
        class="mt-4 d-flex justify-content-around align-items-center flex-wrap"
      >
        <div>
          <button class="btn btn-lg btn-secondary mx-5" @click="passPayment">
            Payer plus tard
          </button>
        </div>
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
import StepBar from "@/components/stepBar/StepBar.vue";
import { Inscription, InscriptionStatus } from "@/types/interface";
import { Payment, PaymentStatus } from "@/types/payment";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    StepBar,
  },
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
    passPayment() {
      this.$router.push({ name: "Home" });
    },
    async getHelloassoRedirectLink() {
      this.loading = true;
      const response = await axios.post(
        `/payments/${this.payment.id}/initiate`,
        {
          donationAmount: this.wantToDonate ? this.payment.donationAmount : 0,
        }
      );
      if (response.status !== 200)
        return (this.errorMsg =
          response.data.errors?.at(0).message ?? "Une erreur est survenue");

      if (response.data?.status === PaymentStatus.VALIDATED)
        return this.passPayment();

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
    async getMyPayment() {
      const response = await axios.get("/payments/me");
      if (response.status !== 200)
        return (this.errorMsg = "Une erreur est survenue");
      this.payment = response.data.find(
        (payment: Payment) =>
          payment.inscription.edition.id ===
          this.$store.getters["edition/getEditionId"]
      );
      this.checkIfPaymentLinkIsExpired();
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
    if (this.$route.query.token && this.$route.query?.donationAmount) {
      await this.getMyPayment();
      this.payment.donationAmount = parseInt(
        this.$route.query.donationAmount as string
      );
      this.wantToDonate = true;
      this.isNecessaryToUpdatePayment = false;
      this.donationAmount = this.payment.donationAmount;
      return;
    }
    await this.createPayment();
  },
});
</script>

<style scoped>
.size-one-em {
  height: 1em;
}

.error {
  color: red;
  flex-basis: 50%;
  padding: 0;
  margin: 0;
}
</style>
