<template>
  <div
    class="d-flex justify-content-center align-items-center container-fluid h-100"
  >
    <PaymentSucceded v-show="isReturn() && isPaymentSucceded()" />

    <PaymentRefused
      v-show="isReturn() && isPaymentRefused()"
      :helloassoCheckoutIntentUrl="helloassoCheckoutIntentUrl"
      :amount="totalAmount"
    />

    <ErrorFromHelloasso
      v-show="isError()"
      :helloassoCheckoutIntentUrl="helloassoCheckoutIntentUrl"
      :amount="totalAmount"
    />
  </div>
</template>

<script lang="ts">
import ErrorFromHelloasso from "@/components/payment/erroFromHelloasso.vue";
import PaymentRefused from "@/components/payment/paymentRefused.vue";
import PaymentSucceded from "@/components/payment/paymentSucceded.vue";
import { Inscription } from "@/types/payment";
import axios from "axios";
import { defineComponent } from "vue";

enum ReturnType {
  "error" = "error",
  "return" = "return",
}

enum PaymentStatus {
  "succeeded" = "succeeded",
  "refused" = "refused",
}

export default defineComponent({
  name: "HelloassoReturn",
  components: {
    ErrorFromHelloasso,
    PaymentRefused,
    PaymentSucceded,
  },
  computed: {
    helloassoCheckoutIntentUrl(): string {
      return this.$store.getters["user/getMe"].inscriptions.find(
        (inscription: Inscription) =>
          inscription.edition.id === this.$store.getters["edition/getEditionId"]
      ).payment.helloassoCheckoutIntentUrl;
    },
  },
  data() {
    return {
      totalAmount: 0,
      type: "" as ReturnType,
      paymentStatus: "" as PaymentStatus,
    };
  },
  methods: {
    isReturn() {
      return this.type === ReturnType.return;
    },
    isError() {
      return this.type === ReturnType.error;
    },
    isPaymentSucceded() {
      return this.paymentStatus === PaymentStatus.succeeded;
    },
    isPaymentRefused() {
      return this.paymentStatus === PaymentStatus.refused;
    },
  },
  async created() {
    this.helloassoCheckoutIntentUrl = this.$route.query
      .helloassoCheckoutIntentUrl as string;
    this.totalAmount = parseInt(this.$route.query.totalAmount as string);

    this.type = this.$route.query.type as ReturnType;
    this.paymentStatus = this.$route.query.code as PaymentStatus;

    if (this.isPaymentRefused()) {
      axios.get(
        `/payments/${this.$route.query.paymentId}/setstatusbyhelloasso`
      );
    }
  },
});
</script>

<style scoped></style>
