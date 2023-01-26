<template>
  <div class="container-fluid p-0">
    <div class="d-none d-lg-block">
      <TopBar :title="title" :userButton="true" />
    </div>

    <div class="d-block d-lg-none">
      <MiniTopBar :userButton="true" />
    </div>

    <ChangePassword
      v-show="showChangePasswordModal"
      @closeChangePasswordModal="toggleChangePasswordModal"
    />

    <DeleteAccount
      v-show="showDeleteAccountModal"
      @closeDeleteAccountModal="toggleDeleteAccountModal"
    />

    <div class="container mt-5">
      <div class="row m-2 mt-4 text-start">
        <div class="col col-sm-12 col-md-5 boder-bottom">
          <h2>Modifier mon mot de passe</h2>
        </div>
      </div>
      <div class="row m-2 mt-4 text-start">
        <div class="col text-start">
          <button
            type="submit"
            class="btn btn-primary"
            @click="toggleChangePasswordModal"
          >
            Modifier mon mot de passe
          </button>
        </div>
      </div>
    </div>

    <div class="container mt-5">
      <div class="row m-2 mt-4 text-start">
        <div class="col col-sm-12 col-md-5 boder-bottom">
          <h2>Supprimer mon compte</h2>
        </div>
      </div>
      <div class="row m-2 mt-4 text-start">
        <div class="col text-start">
          <button
            type="submit"
            class="btn btn-danger"
            @click="toggleDeleteAccountModal"
          >
            Supprimer mon compte
          </button>
        </div>
      </div>
    </div>

    <div class="container mt-5">
      <div class="row m-2 mt-4">
        <div class="col text-center">
          <button
            type="submit"
            class="btn btn-primary"
            @click="goBackToDashboard"
          >
            Retour
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ChangePassword from "@/components/modal/ChangePassword.vue";
import DeleteAccount from "@/components/modal/DeleteAccount.vue";
import MiniTopBar from "@/components/topBar/MiniTopBar.vue";
import TopBar from "@/components/topBar/TopBar.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    TopBar,
    MiniTopBar,
    DeleteAccount,
    ChangePassword,
  },
  data() {
    return {
      title: "Mon compte",
      showChangePasswordModal: false,
      showDeleteAccountModal: false,
    };
  },
  methods: {
    goBackToDashboard() {
      console.log("Go back to Dashboard");
      this.$router.push({ name: "Home" });
    },
    toggleChangePasswordModal() {
      this.showChangePasswordModal = !this.showChangePasswordModal;
    },
    toggleDeleteAccountModal() {
      this.showDeleteAccountModal = !this.showDeleteAccountModal;
    },
  },
});
</script>
