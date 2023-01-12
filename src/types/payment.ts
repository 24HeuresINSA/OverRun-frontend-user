export interface Payment {
  id: number;
  raceAmount: number;
  donationAmount: number;
  totalAmount: number;
  status: PaymentStatus;
  helloassoCheckoutExpiresAt: string;
  helloassoCheckoutIntentId: number;
  helloassoCheckoutIntentUrl: string;
  helloassoPaymentReceiptUrl: string;
  inscription: Inscription;
}

export enum PaymentStatus {
  NOT_STARTED = "NOT_STARTED",
  PENDING = "PENDING",
  VALIDATED = "VALIDATED",
  REFUSED = "REFUSED",
  REFUND = "REFUND",
}

export interface Inscription {
  athlete: { id: number };
  id: number;
  race: Race;
  edition: { id: number };
}

export interface Race {
  id: number;
  name: string;
  registrationPrice: number;
  vaRegistrationPrice: number;
}
