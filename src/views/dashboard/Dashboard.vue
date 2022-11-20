<template>
  <div class="d-none d-lg-block">
    <TopBar :title="title" :userButton="true" />
  </div>

  <div class="d-block d-lg-none">
    <MiniTopBar :userButton="true" />
  </div>

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
              >
                🤔
              </h5>
            </div>
          </div>
          <div class="row pt-1 text-center">
            <p class="mb-0" v-if="certificateStatus === 0">
              Certificat rejeté!
            </p>
            <p class="mb-0" v-if="certificateStatus === 1">
              Certificat validé!
            </p>
            <p class="mb-0" v-if="certificateStatus === 2">
              En cours de validation ...
            </p>
            <p class="mb-0" v-if="certificateStatus === 3">
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
                v-if="certificateStatus === 0"
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
              >
                🤔
              </h5>
              <h5
                class="big-emoji pb-0 mb-0 pt-3"
                v-if="certificateStatus === 4"
              >
                🙈
              </h5>
            </div>
          </div>
          <div class="row pt-1 text-center">
            <p class="mb-0" v-if="certificateStatus === 0">Carte VA rejetée!</p>
            <p class="mb-0" v-if="certificateStatus === 1">Carte VA validée!</p>
            <p class="mb-0" v-if="certificateStatus === 2">
              En cours de validation...
            </p>
            <p class="mb-0" v-if="certificateStatus === 3">
              Carte VA manquante!
            </p>
            <p class="mb-0" v-if="certificateStatus === 4">Pas de carte VA!</p>
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
        <div class="col col-md-3 border-bottom text-start">
          <h6>
            Paramètres équipe
            <span
              v-show="showTeamSettings"
              @click="toggleTeamSettings"
              class="material-icons-outlined"
            >
              expand_more
            </span>
            <span
              v-show="!showTeamSettings"
              @click="toggleTeamSettings"
              class="material-icons-outlined"
            >
              chevron_right
            </span>
          </h6>
        </div>
      </div>
      <div v-show="showTeamSettings" class="row mx-3">
        <div class="col mx-2 bg-light rounded-bottom shadow-sm">
          <form>
            <div class="row fw-bold text-start">
              <div class="col-12 my-2 col-md-5 form-groups">
                <label for="inputNewTeamPassword">Nouveau mot de passe: </label>
                <input
                  type="password"
                  class="form-control"
                  id="inputTeamPassword"
                />
              </div>
              <div class="col-12 my-2 col-md-5 form-groups">
                <label for="inputNewTeamPassword"
                  >Confirmez mot de passe:
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="inputTeamPassword"
                />
              </div>
              <div
                class="col-12 my-2 col-md form-groups text-center btn-container"
              >
                <div class="vertical-center">
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
      <div class="col mx-2 bg-light rounded-3 shadow-sm">
        <table class="table table-striped table-hover w-100 bg-light">
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TopBar from "../../components/topBar/TopBar.vue";
import MiniTopBar from "../../components/topBar/MiniTopBar.vue";

export default defineComponent({
  components: {
    TopBar,
    MiniTopBar,
  },
  data() {
    return {
      title: "",
      isTeamAdmin: true,
      showTeamSettings: false,
      inscriptionStatus: 2,
      vaStatus: 3,
      certificateStatus: 3,
      paymentStatus: 0,
    };
  },
  methods: {
    toggleTeamSettings() {
      this.showTeamSettings = !this.showTeamSettings;
    },
  },
});
</script>

<style scoped>
table {
  overflow-x: scroll;
  white-space: nowrap;
}

.btn-container {
  margin: auto;
}

.vertical-center {
  margin-top: 15px;
}

.sm-table {
  display: block;
  overflow-x: auto;
  white-space: nowrap;
}

.big-emoji {
  font-size: 60px;
  vertical-align: middle;
  line-height: 1;
}
</style>
