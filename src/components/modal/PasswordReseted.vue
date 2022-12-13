<template>
  <div class="backdrop" @click.self="closeModal">
    <div
      class="col-10 col-lg-4 p-3 bg-light custom-modal m-auto rounded-3 mt-5"
    >
      <div class="row pt-3">
        <div class="col">
          <h5 class="big-emoji pb-0 mb-0 pt-3">🎉</h5>
        </div>
      </div>
      <div class="row pt-3">
        <div class="col mx-2 text-center">
          <p>Victoire! Votre mot de passe à bien été mis à jour!</p>
        </div>
      </div>
      <div class="row text-start">
        <div class="col m-2">
          <div class="col form-group text-center">
            <button class="btn btn-primary" type="button" @click="closeModal">
              Se connecter
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    closeModal() {
      this.$router.push("Login");
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

.big-emoji {
  font-size: 120px;
  vertical-align: middle;
  line-height: 1;
}

.big-emoji {
  font-size: 120px;
  vertical-align: middle;
  line-height: 1;
}
</style>
