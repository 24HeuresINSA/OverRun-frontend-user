import { PaymentStatus } from "./payment";

export enum InscriptionStatus {
  PENDING = "PENDING",
  VALIDATED = "VALIDATED",
  CANCELLED = "CANCELLED",
}

export interface User {
  id: number;
  email: string;
  username: string;
}

export interface Athlete {
  id: number;
  user: User;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string;
  inscriptions: Inscription[];
  address: string;
  zipCode: string;
  city: string;
  country: string;
  sex: boolean;
}

export interface Payment {
  id: number;
  raceAmount: number;
  donationAmount: number;
  helloassoPaymentReceiptUrl: string;
  status: PaymentStatus;
}

export interface Inscription {
  id: number;
  edition: Edition;
  status: InscriptionStatus;
  va: VA;
  certificate: Certificate;
  race: Race;
  team: Team;
  payment: Payment;
}

export interface Edition {
  id: number;
  name: string;
}

export interface VA {
  id: number;
}

export interface Certificate {
  id: number;
  status: number;
}

export interface Race {
  id: number;
  name: string;
  disciplines: RaceDiscipline[];
}

export interface Team {
  id: number;
  name: string;
}

export interface RaceDiscipline {
  discipline: Discipline;
  duration: number;
  id: number;
}

export interface Discipline {
  id: number;
  name: string;
}