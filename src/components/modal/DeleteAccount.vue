<template>
  <div class="backdrop" @click.self="closeModal">
    <div
      class="col-10 col-lg-4 p-3 bg-light custom-modal m-auto rounded-3 mt-5"
    >
      <div class="row pt-3">
        <div class="col">
          <h4>Vous souhaitez nous quitter? &#128557;</h4>
        </div>
      </div>
      <div class="row pt-3 px-2">
        <div class="col mx-2 text-start">
          <p>
            <strong><u>Attention!</u></strong> La suppression de votre compte
            entrainera la suppression de toutes vos données personnelles de
            manière irreverssible. Il ne vous sera plus possible de vous
            connecter et d'accéder notamment à vos factures.
          </p>
          <p>
            Pour a nouveau participer aux courses, il faudra vous reinscrire et
            repayer les droits d'admission (sauf derogation).
          </p>
          <p>
            Si vous souhaitez poursuivre la suppression de votre compte,
            veuillez renseignez votre mot de passe ci-dessous, puis cliquez sur
            le button supprimer.
          </p>
        </div>
      </div>
      <div class="row text-start">
        <div class="col m-2">
          <div class="row px-2 fw-bold" v-show="wrongPassword">
            <div class="col text-danger">Mauvais mot de passe</div>
          </div>
          <div class="row px-2 fw-bold" v-show="errorAPI">
            <div class="col text-danger">Une erreur est survenue</div>
          </div>
          <form action="">
            <div class="row p-2 fw-bold">
              <div class="col form-group">
                <label for="inputNewPassword"> Mot de passe:</label>
                <input
                  type="password"
                  class="form-control"
                  id="inputNewPassword"
                  v-model="password"
                  minlength="8"
                  required
                />
              </div>
            </div>

            <div class="row mt-4">
              <div class="col form-group text-center">
                <button
                  class="btn btn-danger"
                  type="button"
                  @click="deleteAccount"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { MutationTypes as AuthMutationTypes } from "@/store/modules/auth";
import { MutationTypes as UserMutationTypes } from "@/store/modules/user";
import axios from "axios";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      password: "",
      wrongPassword: false,
      errorAPI: false,
    };
  },
  computed: {
    me() {
      return this.$store.getters[`user/getMe`];
    },
  },
  methods: {
    closeModal() {
      this.password = "";
      this.wrongPassword = false;
      this.$emit("closeDeleteAccountModal");
    },
    async deleteAccount() {
      const checkPasswordResponse = await axios.post("login", {
        email: this.me.user.email,
        password: this.password,
      });

      if (checkPasswordResponse.status !== 200)
        return (this.wrongPassword = true);

      const deleteAccountResponse = await axios.delete(
        `/athletes/${this.me.user.id}`
      );
      if (deleteAccountResponse.status !== 200) return (this.errorAPI = true);

      this.$store.commit(`user/${UserMutationTypes.SET_USER_ME}`, {});
      this.$store.commit(`auth/${AuthMutationTypes.LOGOUT}`);
      this.$router.push({ name: "Login" });
    },
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
</style>
