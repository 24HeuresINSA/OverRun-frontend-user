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
    />

    <VaModal v-show="showVaModal" @closeVaModal="toggleVaModal" />

    <div class="container">
      <div class="row m-2 mt-4 text-start">
        <div class="col col-md-4 border-bottom">
          <h2>Mon Inscription</h2>
        </div>
      </div>
      <div class="row m-2 mt-3 text-start">
        <div class="col-12 mx-2">
          <strong> Vous êtes inscrit dans la course: Ma course</strong>
        </div>
      </div>

      <div class="row m-2 mt-3">
        <div class="col-12 col-md-3">
          <div
            class="container-fluid bg-light p-1 pt-3 pb-3 me-md-2 m-2 rounded-3 shadow-sm"
          >
            <div class="row pt-1">
              <div class="col">
                <h5>Status de mon inscription</h5>
                <hr />
                <h5
                  class="big-emoji pb-0 mb-0 pt-3"
                  v-if="inscriptionStatus == 0"
                >
                  😢
                </h5>
                <h5
                  class="big-emoji pb-0 mb-0 pt-3"
                  v-if="inscriptionStatus == 1"
                >
                  🎉
                </h5>
                <h5
                  class="big-emoji pb-0 mb-0 pt-3"
                  v-if="inscriptionStatus == 2"
                >
                  ⌛
                </h5>
              </div>
            </div>
            <div class="row pt-1 text-center">
              <p class="mb-0" v-if="inscriptionStatus === 0">
                Inscription incomplète
              </p>
              <p class="mb-0" v-if="inscriptionStatus === 1">
                Inscription complète
              </p>
              <p class="mb-0" v-if="inscriptionStatus === 2">
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
                  v-if="certificateStatus === 0"
                  @click="toggleCertificateModal"
                >
                  😱
                </h5>
                <h5
                  class="big-emoji pb-0 mb-0 pt-3"
                  v-if="certificateStatus === 1"
                >
                  🎉
                </h5>
                <h5
                  class="big-emoji pb-0 mb-0 pt-3"
                  v-if="certificateStatus === 2"
                >
                  ⌛
                </h5>
                <h5
                  class="big-emoji pb-0 mb-0 pt-3"
                  v-if="certificateStatus === 3"
                  @click="toggleCertificateModal"
                >
                  🤔
                </h5>
              </div>
            </div>
            <div class="row pt-1 text-center">
              <p
                class="mb-0"
                v-if="certificateStatus === 0"
                @click="toggleCertificateModal"
              >
                Certificat rejeté!
              </p>
              <p class="mb-0" v-if="certificateStatus === 1">
                Certificat validé!
              </p>
              <p class="mb-0" v-if="certificateStatus === 2">
                En cours de validation ...
              </p>
              <p
                class="mb-0"
                v-if="certificateStatus === 3"
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
                  v-if="vaStatus === 0"
                  @click="toggleVaModal"
                >
                  😱
                </h5>
                <h5 class="big-emoji pb-0 mb-0 pt-3" v-if="vaStatus === 1">
                  🎉
                </h5>
                <h5 class="big-emoji pb-0 mb-0 pt-3" v-if="vaStatus === 2">
                  ⌛
                </h5>
                <h5
                  class="big-emoji pb-0 mb-0 pt-3"
                  v-if="vaStatus === 3"
                  @click="toggleVaModal"
                >
                  🤔
                </h5>
                <h5 class="big-emoji pb-0 mb-0 pt-3" v-if="vaStatus === 4">
                  🧋
                </h5>
              </div>
            </div>
            <div class="row pt-1 text-center">
              <p class="mb-0" v-if="vaStatus === 0" @click="toggleVaModal">
                Carte VA rejetée!
              </p>
              <p class="mb-0" v-if="vaStatus === 1">Carte VA validée!</p>
              <p class="mb-0" v-if="vaStatus === 2">
                En cours de validation...
              </p>
              <p class="mb-0" v-if="vaStatus === 3" @click="toggleVaModal">
                Carte VA manquante!
              </p>
              <p class="mb-0" v-if="vaStatus === 4">
                Pas de carte VA, pas de soucis!
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
                <h5>Mon Payement</h5>
                <hr />
                <h5 class="big-emoji">😢</h5>
              </div>
            </div>
            <div class="row pt-1 text-center">
              <p class="mb-0">Payement refusé</p>
            </div>
          </div>
        </div>
      </div>

      <div class="row m-2 mt-4 text-start">
        <div class="col col-md-4 border-bottom">
          <h2>Mon Equipe</h2>
        </div>
      </div>

      <div v-show="isTeamAdmin">
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
                Les deux mots de passes ne correspondent pas!
              </div>
            </div>
            <div class="row fw-bold text-start" v-show="lengthError">
              <div class="col text-danger">
                Le mot de passe doit faire plus de 8 caractères!
              </div>
            </div>
            <form>
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

      <div class="d-none d-sm-felx row mx-3 mt-3">
        <div class="col mx-2 bg-light rounded-3 shadow-sm">
          <table class="table table-striped table-hover w-100">
            <thead>
              <tr>
                <th scope="col">Admin</th>
                <th scope="col">Athlète</th>
                <th v-show="isTeamAdmin" scope="col">Changer status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">
                  <span class="material-icons-outlined"> military_tech </span>
                </th>
                <td>Mark</td>
                <td v-show="isTeamAdmin">Otto</td>
              </tr>
              <tr>
                <th scope="row"></th>
                <td>Jacob</td>
                <td v-show="isTeamAdmin">Thornton</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="d-sm-0 sm-table row mx-3 mt-3">
        <div class="col mx-2 bg-light rounded-3 shadow-sm table-responsive">
          <table class="table table-striped table-hover w-100 bg-light">
            <thead>
              <tr>
                <th scope="col" class="admin-col">Admin</th>
                <th scope="col">Athlète</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" class="admin-col">
                  <span class="material-icons-outlined"> military_tech </span>
                </th>
                <td>Mark</td>
              </tr>
              <tr>
                <th scope="row" class="admin-col"></th>
                <td>Jacob</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="row m-2 mt-4 text-start">
        <div class="col col-md-4 border-bottom">
          <h2>Mes Resultats</h2>
        </div>
      </div>

      <div class="row m-2 mt-4 text-start">
        <div class="col col-md-4 border-bottom">
          <h2>Mes Payements</h2>
        </div>
      </div>

      <div class="row m-2 mt-4 text-start">
        <div class="col col-md-4 border-bottom">
          <h2>Mes Certificats</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TopBar from "../../components/topBar/TopBar.vue";
import MiniTopBar from "../../components/topBar/MiniTopBar.vue";
import CertificateModal from "../../components/modal/Certificate.vue";
import VaModal from "../../components/modal/VA.vue";

export default defineComponent({
  components: {
    TopBar,
    MiniTopBar,
    CertificateModal,
    VaModal,
  },

  beforeCreate() {
    if (this.$store.getters.getAccessToken == "") {
      this.$router.push({ name: "BeforeReagistration"});
    }
  },

  data() {
    return {
      title: "",
      isTeamAdmin: true,
      showTeamSettings: false,
      showCertificateModal: false,
      showVaModal: true,
      inscriptionStatus: 2,
      vaStatus: 3,
      certificateStatus: 3,
      paymentStatus: 0,
      newTeamPassword: "",
      confirmTeamPassword: "",
      matchError: false,
      lengthError: false,
    };
  },
  methods: {
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
  },
});
</script>

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
