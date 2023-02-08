<template>
  <div class="container-fluid p-0">
    <div class="d-none d-lg-block">
      <TopBar :title="title" :userButton="true" />
    </div>

    <div class="d-block d-lg-none">
      <MiniTopBar :userButton="true" />
    </div>

    <CertificateModal
      v-show="showCertificateModal"
      @closeCertificateModal="toggleCertificateModal"
      @openErrorModal="toggleErrorModal"
    />

    <VaModal
      v-show="showVaModal"
      @closeVaModal="toggleVaModal"
      @openErrorModal="toggleErrorModal"
    />

    <PaymentModal
      v-show="showPaymentModal"
      @closePaymentModal="togglePaymentModal"
    />

    <TeamAdminModal
      v-show="showTeamAdminModal"
      @closeTeamAdminModal="toggleTeamAdminModal"
      @openErrorModal="toggleErrorModal"
      @success="getTeamInfos"
      :athlete="athlete"
      :actionType="actionType"
      :teamId="team.id"
    />

    <div class="container">
      <div class="row m-2 mt-4 text-start">
        <div class="col col-md-4 border-bottom">
          <h2>Mon Inscription</h2>
        </div>
      </div>
      <div class="row m-2 mt-3 text-start">
        <div class="col-12 mx-2">
          Vous êtes inscrit dans la course:
          <strong>{{ inscription?.race?.name || "aucune" }}</strong>
        </div>
      </div>

      <div class="row m-2 mt-3">
        <div class="col-12 col-md-3">
          <div
            class="container-fluid bg-light p-1 pt-3 pb-3 me-md-2 m-2 rounded-3 shadow-sm"
          >
            <div class="row pt-1">
              <div class="col">
                <h5>Statut de mon inscription</h5>
                <hr />
                <h5
                  class="big-emoji pb-0 mb-0 pt-3"
                  v-if="inscription === undefined"
                >
                  😢
                </h5>
                <h5
                  class="big-emoji pb-0 mb-0 pt-3"
                  v-else-if="
                    inscription?.status === InscriptionStatus.VALIDATED
                  "
                >
                  🎉
                </h5>
                <h5
                  class="big-emoji pb-0 mb-0 pt-3"
                  v-else-if="inscription?.status === InscriptionStatus.PENDING"
                >
                  ⌛
                </h5>
              </div>
            </div>
            <div class="row pt-1 text-center">
              <p class="mb-0" v-if="inscription === undefined">
                Inscription incomplète
              </p>
              <p
                class="mb-0"
                v-else-if="inscription?.status === InscriptionStatus.VALIDATED"
              >
                Inscription complète
              </p>
              <p
                class="mb-0"
                v-else-if="inscription?.status === InscriptionStatus.PENDING"
              >
                En cours de validation ...
              </p>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-3">
          <div
            class="container-fluid bg-light p-1 pt-3 pb-3 me-md-2 m-2 rounded-3 shadow-sm"
          >
            <div class="row pt-1 pb-1">
              <div class="col">
                <h5>Mon Certificat</h5>
                <hr />
                <h5
                  class="big-emoji pb-0 mb-0 pt-3"
                  v-if="inscription?.certificate?.status === 5"
                  @click="toggleCertificateModal"
                >
                  😱
                </h5>
                <h5
                  class="big-emoji pb-0 mb-0 pt-3"
                  v-if="inscription?.certificate?.status === 1"
                >
                  🎉
                </h5>
                <h5
                  class="big-emoji pb-0 mb-0 pt-3"
                  v-if="inscription?.certificate?.status === 4"
                >
                  ⌛
                </h5>
                <h5
                  class="big-emoji pb-0 mb-0 pt-3"
                  v-if="
                    inscription?.certificate === undefined ||
                    inscription?.certificate === null
                  "
                  @click="toggleCertificateModal"
                >
                  🤔
                </h5>
              </div>
            </div>
            <div class="row pt-1 text-center">
              <p
                class="mb-0"
                v-if="inscription?.certificate?.status === 5"
                @click="toggleCertificateModal"
              >
                Certificat rejeté!
              </p>
              <p class="mb-0" v-if="inscription?.certificate?.status === 1">
                Certificat validé!
              </p>
              <p class="mb-0" v-if="inscription?.certificate?.status === 4">
                En cours de validation ...
              </p>
              <p
                class="mb-0"
                v-if="
                  inscription?.certificate === undefined ||
                  inscription?.certificate === null
                "
                @click="toggleCertificateModal"
              >
                Certificat manquant!
              </p>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-3">
          <div
            class="container-fluid bg-light p-1 pt-3 pb-3 me-md-2 m-2 rounded-3 shadow-sm"
          >
            <div class="row pt-1 pb-1">
              <div class="col">
                <h5>Ma Carte VA</h5>
                <hr />
                <h5
                  class="big-emoji pb-0 mb-0 pt-3"
                  v-if="inscription?.va !== null"
                >
                  🎉
                </h5>
                <h5
                  class="big-emoji pb-0 mb-0 pt-3"
                  v-if="inscription?.va === null"
                  @click="toggleVaModal"
                >
                  🤔
                </h5>
              </div>
            </div>
            <div class="row pt-1 text-center">
              <p class="mb-0" v-if="inscription?.va !== null">
                Carte VA validée!
              </p>
              <p
                class="mb-0"
                v-if="inscription?.va === null"
                @click="toggleVaModal"
              >
                Pas de carte VA!
              </p>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-3">
          <div
            class="container-fluid bg-light p-1 pt-3 pb-3 me-md-2 m-2 rounded-3 shadow-sm"
          >
            <div class="row pt-1 pb-1">
              <div class="col">
                <h5>Mon Paiement</h5>
                <hr />
                <h5
                  v-if="
                    inscription?.payment?.status ===
                      PaymentStatus.NOT_STARTED || inscription?.payment === null
                  "
                  class="big-emoji pb-0 mb-0 pt-3"
                  @click="togglePaymentModal"
                >
                  🤔
                </h5>
                <h5
                  v-if="inscription?.payment?.status === PaymentStatus.PENDING"
                  class="big-emoji pb-0 mb-0 pt-3"
                  @click="togglePaymentModal"
                >
                  ⌛
                </h5>
                <h5
                  v-if="
                    inscription?.payment?.status === PaymentStatus.VALIDATED
                  "
                  class="big-emoji pb-0 mb-0 pt-3"
                >
                  🎉
                </h5>
                <h5
                  v-if="inscription?.payment?.status === PaymentStatus.REFUSED"
                  class="big-emoji pb-0 mb-0 pt-3"
                  @click="togglePaymentModal"
                >
                  😢
                </h5>
                <h5
                  v-if="
                    inscription?.payment?.status === PaymentStatus.REFUNDING
                  "
                  class="big-emoji pb-0 mb-0 pt-3"
                >
                  🏦
                </h5>
                <h5
                  v-if="inscription?.payment?.status === PaymentStatus.REFUND"
                  class="big-emoji pb-0 mb-0 pt-3"
                  @click="togglePaymentModal"
                >
                  🤑
                </h5>
              </div>
            </div>
            <div class="row pt-1 text-center">
              <p
                class="mb-0"
                v-if="
                  inscription?.payment?.status === PaymentStatus.NOT_STARTED ||
                  inscription?.payment === null
                "
              >
                Paiement non initié
              </p>
              <p
                class="mb-0"
                v-if="inscription?.payment?.status === PaymentStatus.PENDING"
              >
                Paiement en cours
              </p>
              <p
                class="mb-0"
                v-if="inscription?.payment?.status === PaymentStatus.VALIDATED"
              >
                Paiement validé
              </p>
              <p
                class="mb-0"
                v-if="inscription?.payment?.status === PaymentStatus.REFUSED"
              >
                Paiement refusé
              </p>
              <p
                class="mb-0"
                v-if="inscription?.payment?.status === PaymentStatus.REFUNDING"
              >
                Remboursement en cours
              </p>
              <p
                class="mb-0"
                v-if="inscription?.payment?.status === PaymentStatus.REFUND"
              >
                Remboursé
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="row m-2 mt-4 text-start">
        <div class="col col-md-4 border-bottom">
          <h2>Mon Équipe</h2>
        </div>
      </div>
      <div class="row m-2 mt-3 text-start">
        <div class="col-12 mx-2">
          Vous êtes inscrit dans l'équipe:
          <strong> {{ inscription?.team?.name || "aucune" }}</strong>
        </div>
        <div
          class="col-12 bg-primary rounded text-light text-start pt-2"
          v-if="inscription?.team?.name"
        >
          <p>
            Si vous souhaitez quitter l'équipe, merci de contacter l'équipe des
            courses à l'adresse <a :href="mailURL()">overrun@24heures.org</a> en
            leur indiquant vos nom, prénom et nom d'équipe. Nous nous chargerons
            d'effectuer le remboursement de votre paiement le cas échéant avant
            de vous retirer de l'équipe. Vous pourrez ensuite choisir une
            nouvelle course et/ou équipe.
          </p>
          <p v-show="isTeamAdmin(me.id)">
            <strong><u>Attention:</u></strong> si vous êtes le seul responsable
            d'équipe, il ne sera pas possible pour vous de quitter l'équipe. Si
            vous souhaitez retirer un membre de votre équipe, merci de contacter
            l'équipe des courses à l'adresse
            <a :href="mailURL()">overrun@24heures.org</a> en leur indiquant son
            nom, prénom et nom d'équipe. Nous nous chargerons d'effectuer le
            remboursement de son paiement le cas échéant avant de le retirer de
            l'équipe. Il pourra ensuite choisir une nouvelle course et/ou
            équipe.
          </p>
        </div>
        <div
          class="col-12 bg-primary rounded text-light text-start pt-2"
          v-else
        >
          <p>
            Si vous souhaitez rejoindre une équipe, merci de contacter l'équipe
            des courses à l'adresse
            <a :href="mailURL()">overrun@24heures.org</a> en leur indiquant vos
            nom et prénom. Nous nous chargerons d'effectuer le remboursement de
            votre paiement le cas échéant. Vous pourrez ensuite choisir une
            nouvelle course et/ou équipe.
          </p>
        </div>
      </div>

      <div v-show="isTeamAdmin(me.id)">
        <div class="row mx-3 mt-3">
          <div
            class="col col-md-3 border-bottom text-start vertical-center-container"
          >
            <div class="vertical-center">
              <h6>
                Paramètres équipe
                <span
                  v-show="showTeamSettings"
                  @click="toggleTeamSettings"
                  class="material-icons-outlined chevron"
                >
                  expand_more
                </span>
                <span
                  v-show="!showTeamSettings"
                  @click="toggleTeamSettings"
                  class="material-icons-outlined chevron"
                >
                  chevron_right
                </span>
              </h6>
            </div>
          </div>
        </div>
        <div v-show="showTeamSettings" class="row mx-3">
          <div class="col mx-2 bg-light rounded-bottom shadow-sm">
            <div class="row fw-bold text-start" v-show="matchError">
              <div class="col text-danger">
                Les deux mots de passe ne correspondent pas!
              </div>
            </div>
            <div class="row fw-bold text-start" v-show="lengthError">
              <div class="col text-danger">
                Le mot de passe doit faire plus de 8 caractères!
              </div>
            </div>
            <form @submit.prevent="submitChnageTeamPassword">
              <div class="row fw-bold text-start">
                <div class="col-12 my-2 col-md-5 form-groups">
                  <label for="inputNewTeamPassword"
                    >Nouveau mot de passe:
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    v-model="newTeamPassword"
                    id="inputNewTeamPassword"
                  />
                </div>
                <div class="col-12 my-2 col-md-5 form-groups">
                  <label for="inputConfirmTeamPassword"
                    >Confirmez mot de passe:
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    v-model="confirmTeamPassword"
                    id="inputConfirmPassword"
                  />
                </div>
                <div
                  class="col-12 my-2 col-md form-groups text-center btn-container"
                >
                  <div class="vertical-center-button">
                    <button class="btn btn-primary m-auto align-middle">
                      Mettre à jour
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="d-sm-felx row mx-3 mt-3">
        <div class="col mx-2 bg-light rounded-3 shadow-sm">
          <table
            class="table table-striped table-hover w-100"
            v-show="inscription?.team?.name"
          >
            <thead>
              <tr>
                <th scope="col">Responsable d'équipe</th>
                <th scope="col">Athlète</th>
                <th scope="col">Statut de l'inscription</th>
                <th v-show="isTeamAdmin(me.id)" scope="col">Actions</th>
              </tr>
            </thead>
            <tbody v-if="team.members">
              <tr
                v-for="member in team.members.filter(
                  (m: Member) => m.status !== InscriptionStatus.CANCELLED
                )"
                :key="member.id"
              >
                <th scope="row">
                  <span
                    class="material-icons-outlined"
                    v-if="isTeamAdmin(member.athlete.id)"
                  >
                    military_tech
                  </span>
                </th>
                <td>
                  {{ member.athlete.firstName }} {{ member.athlete.lastName }}
                </td>
                <td>
                  <span
                    class="material-icons-outlined"
                    style="color: green"
                    v-if="member.status === InscriptionStatus.VALIDATED"
                  >
                    check_circle
                  </span>
                  <span
                    class="material-icons-outlined"
                    style="color: red"
                    v-else
                  >
                    cancel
                  </span>
                </td>
                <td v-show="isTeamAdmin(me.id)">
                  <button
                    class="btn btn-success mx-1"
                    title="Ajoute l'athlète à la liste de responsables d'équipe"
                    @click="
                      openTeamAdminModal(
                        member.athlete,
                        TeamAdminModalType.PROMOTE_ADMIN
                      )
                    "
                    v-show="!isTeamAdmin(member.athlete.id)"
                  >
                    Promouvoir responsable d'équipe
                  </button>
                  <button
                    v-show="
                      isTeamAdmin(member.athlete.id) &&
                      member.athlete.id !== me.id
                    "
                    class="btn btn-danger mx-1"
                    title="Supprime l'athlète de la liste de responsables d'équipe"
                    @click="
                      openTeamAdminModal(
                        member.athlete,
                        TeamAdminModalType.REVOKE_ADMIN
                      )
                    "
                  >
                    Retirer responsable d'équipe
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="row m-2 mt-4 text-start" v-show="false">
        <div class="col col-md-4 border-bottom">
          <h2>Mes Résultats</h2>
          <!-- TODO -->
        </div>
      </div>

      <div class="row m-2 mt-4 text-start">
        <div class="col col-md-4 border-bottom">
          <h2>Mes Paiements</h2>
        </div>
        <div class="d-sm-felx row mx-3 mt-3">
          <div class="col mx-2 bg-light rounded-3 shadow-sm">
            <table class="table table-striped table-hover w-100">
              <thead>
                <tr>
                  <th scope="col">Édition</th>
                  <th scope="col">Course</th>
                  <th scope="col">Prix inscription</th>
                  <th scope="col">Prix don</th>
                  <th scope="col">Statut</th>
                  <th scope="col">Reçu HelloAsso</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="inscription in me.inscriptions.filter((i: Inscription) => 
                     i.payment && 
                  (  i.payment.status === PaymentStatus.VALIDATED 
                  || i.payment.status === PaymentStatus.REFUNDING 
                  || i.payment.status === PaymentStatus.REFUND))"
                  :key="inscription.payment.id"
                >
                  <td>{{ inscription.edition?.name }}</td>
                  <td>
                    {{ inscription.race.name }}
                  </td>
                  <td>
                    {{ centimesToEuros(inscription.payment.raceAmount) }} €
                  </td>
                  <td>
                    {{ centimesToEuros(inscription.payment.donationAmount) }} €
                  </td>
                  <td
                    v-if="
                      inscription.payment?.status === PaymentStatus.VALIDATED
                    "
                  >
                    Validé
                  </td>
                  <td
                    v-else-if="
                      inscription.payment.status === PaymentStatus.REFUND
                    "
                  >
                    Remboursé
                  </td>
                  <td
                    v-else-if="
                      inscription.payment.status === PaymentStatus.REFUNDING
                    "
                  >
                    En cours de remboursement
                  </td>
                  <td v-else></td>
                  <td>
                    <a
                      :href="inscription.payment.helloassoPaymentReceiptUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {{ inscription.payment?.helloassoPaymentReceiptUrl }}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="row m-2 mt-4 text-start">
        <div class="col col-md-4 border-bottom">
          <h2>Mes Certificats</h2>
        </div>

        <div class="d-sm-felx row mx-3 mt-3">
          <div class="col mx-2 bg-light rounded-3 shadow-sm">
            <table class="table table-striped table-hover w-100">
              <thead>
                <tr>
                  <th scope="col">Édition</th>
                  <th scope="col">Fichier</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="inscription in me.inscriptions.filter((i: Inscription) => i.certificate)"
                  :key="inscription.certificate.id"
                >
                  <td>{{ inscription.edition?.name }}</td>
                  <td>
                    <span
                      @click="
                        openCertificateModal(inscription.certificate.filename)
                      "
                    >
                      {{ inscription.certificate.filename }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <DisplayCertificate
    v-show="showDisplayCertificateModal"
    @closeDisplayCertificateModal="toggleDisplayCertificateModal"
    :certificateFile="certificateFile"
  />

  <ConfirmModal
    v-show="showConfirmModal"
    @closeConfirmModal="toggleConfirmModal"
    @callback="confirmCallback"
    :message="confirmMessage"
  />

  <ErrorModal v-show="showErrorModal" @closeErrorModal="toggleErrorModal" />

  <SuccessModal
    v-show="showSuccessModal"
    @closeSuccessModal="toggleSuccessModal"
    :message="successMessage"
  />
</template>

<script lang="ts">
import CertificateModal from "@/components/modal/Certificate.vue";
import ConfirmModal from "@/components/modal/ConfirmModal.vue";
import DisplayCertificate from "@/components/modal/DisplayCertificate.vue";
import ErrorModal from "@/components/modal/Error.vue";
import PaymentModal from "@/components/modal/PaymentModal.vue";
import SuccessModal from "@/components/modal/Success.vue";
import TeamAdminModal, {
  TeamAdminModalType,
} from "@/components/modal/TeamAdminModal.vue";
import VaModal from "@/components/modal/VA.vue";
import MiniTopBar from "@/components/topBar/MiniTopBar.vue";
import TopBar from "@/components/topBar/TopBar.vue";
import { Inscription, InscriptionStatus } from "@/types/interface";
import { PaymentStatus } from "@/types/payment";
import { Athlete, Member, Team } from "@/types/team";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    TopBar,
    MiniTopBar,
    CertificateModal,
    VaModal,
    ErrorModal,
    SuccessModal,
    TeamAdminModal,
    ConfirmModal,
    DisplayCertificate,
    PaymentModal,
  },
  data() {
    return {
      title: "Dashboard",
      showTeamSettings: false,
      showCertificateModal: false,
      showErrorModal: false,
      showSuccessModal: false,
      successMessage: undefined as string | undefined,
      showVaModal: false,
      showPaymentModal: false,
      showTeamAdminModal: false,
      showConfirmModal: false,
      confirmMessage: undefined as string | undefined,
      confirmCallback: () => {
        return;
      },
      showDisplayCertificateModal: false,
      certificateFile: "",
      newTeamPassword: "",
      confirmTeamPassword: "",
      matchError: false,
      lengthError: false,
      team: {} as Team,
      athlete: {} as Athlete,
      TeamAdminModalType,
      actionType: "" as TeamAdminModalType,
      mailTemplate: "",
      PaymentStatus,
      InscriptionStatus,
    };
  },
  computed: {
    me() {
      return this.$store.getters["user/getMe"];
    },
    inscription() {
      return this.$store.getters["user/getMe"].inscriptions?.filter(
        (inscription: Inscription) =>
          inscription.edition.id ===
            this.$store.getters["edition/getEditionId"] &&
          inscription.status !== InscriptionStatus.CANCELLED
      )[0];
    },
  },
  methods: {
    centimesToEuros(price: number) {
      return price / 100;
    },
    toggleTeamSettings() {
      this.newTeamPassword = "";
      this.confirmTeamPassword = "";
      this.matchError = false;
      this.lengthError = false;
      this.showTeamSettings = !this.showTeamSettings;
    },
    toggleCertificateModal() {
      this.showCertificateModal = !this.showCertificateModal;
    },
    toggleVaModal() {
      this.showVaModal = !this.showVaModal;
    },
    togglePaymentModal() {
      this.showPaymentModal = !this.showPaymentModal;
    },
    toggleErrorModal() {
      this.showErrorModal = !this.showErrorModal;
    },
    toggleSuccessModal() {
      this.showSuccessModal = !this.showSuccessModal;
    },
    toggleTeamAdminModal() {
      this.showTeamAdminModal = !this.showTeamAdminModal;
    },
    openTeamAdminModal(athlete: Athlete, action: TeamAdminModalType) {
      this.actionType = action;
      this.athlete = athlete;
      this.toggleTeamAdminModal();
    },
    toggleConfirmModal() {
      this.showConfirmModal = !this.showConfirmModal;
    },
    toggleDisplayCertificateModal() {
      this.showDisplayCertificateModal = !this.showDisplayCertificateModal;
    },
    openCertificateModal(certificateFile: string) {
      this.certificateFile = certificateFile;
      this.toggleDisplayCertificateModal();
    },
    async openLeaveTeamModal() {
      this.confirmMessage = "Voulez-vous vraiment quitter l'équipe ?";
      this.confirmCallback = await this.leaveTeam;
      this.toggleConfirmModal();
    },
    checkPassword() {
      let error = false;
      if (this.newTeamPassword !== this.confirmTeamPassword) {
        error = true;
        this.matchError = true;
      }
      if (this.newTeamPassword.length <= 8) {
        error = true;
        this.lengthError = true;
      }
      return !error;
    },
    async getTeamInfos() {
      if (!this.inscription?.team) return;
      const teamResponse = await axios.get(
        `/teams/${this.inscription.team.id}`
      );
      if (teamResponse.status === 200) {
        this.team = teamResponse.data;
        this.isTeamAdmin(this.me.id);
      }
    },
    isTeamAdmin(athleteId: number) {
      return this.team?.admins?.some(
        (admin) => admin.adminInscription.athleteId === athleteId
      );
    },
    async submitChnageTeamPassword() {
      if (!this.checkPassword()) return this.toggleErrorModal();
      const changeTeamPasswordResponse = await axios.post(
        `/teams/${this.team.id}/updatePassword`,
        {
          password: this.newTeamPassword,
        }
      );
      if (changeTeamPasswordResponse.status !== 200)
        return this.toggleErrorModal();

      this.newTeamPassword = "";
      this.confirmTeamPassword = "";

      this.successMessage = "Mot de passe changé avec succès";
      this.toggleSuccessModal();
    },
    async leaveTeam() {
      const leaveTeamResponse = await axios.post(
        `/teams/${this.team.id}/leave`,
        {
          athleteId: this.me.id,
        }
      );
      if (leaveTeamResponse.status !== 200) return this.toggleErrorModal();

      this.successMessage = "Vous avez quitté l'équipe";
      this.toggleSuccessModal();
      this.$store.dispatch("user/setMe");
    },
    fillMailTemplate() {
      this.mailTemplate = `Bonjour,
Je souhaite modifier mon inscription.
Voici mes informations:
- Pseudo: ${this.me.pseudo}
- Nom: ${this.me.lastName}
- Prénom: ${this.me.firstName}

[Merci de compléter ce mail avec les raisons de la modification 
(changer de course, d'équipe, retirer un membre de l'équipe,...)]

Merci d'avance pour votre aide.
      `;
    },
    mailURL() {
      return `mailto:overrun@24heures.org?subject=${encodeURI(
        "Modification d'une inscription"
      )}&body=${encodeURI(this.mailTemplate)}`;
    },
  },
  watch: {
    inscription() {
      this.getTeamInfos();
    },
  },
  mounted() {
    this.fillMailTemplate();
    this.$store.dispatch("user/setMe");
    this.getTeamInfos();
  },
});
</script>

<style>
.container {
  top: 60px;
  position: relative;
}
</style>

<style scoped>
.admin-col {
  width: 150px;
}

.btn-container {
  margin: auto;
}

.vertical-center-button {
  margin-top: 15px;
}

.vertical-center-container {
  height: 30px;
  position: relative;
}

.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

.chevron {
  margin-top: -5px;
  position: absolute;
}

.big-emoji {
  font-size: 60px;
  vertical-align: middle;
  line-height: 1;
}
</style>
