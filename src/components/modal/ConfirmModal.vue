<template>
  <div class="backdrop" @click.self="closeModal">
    <div
      class="col-10 col-lg-4 p-3 bg-light custom-modal m-auto rounded-3 mt-5"
    >
      <div>
        <div class="row pt-3">
          <div class="col">
            <h4>Êtes vous sûr ? 🤔</h4>
          </div>
          <div class="col-1">
            <button id="close-arrow" @click="closeModal">
              <span class="material-icons-outlined"> close </span>
            </button>
          </div>
        </div>
        <div class="row pt-3">
          <div class="col mx-2 text-start">
            <p>
              {{ message }}
            </p>
          </div>
        </div>
        <div class="row pt-3">
          <div class="col d-flex justify-content-center">
            <button class="btn btn-primary mx-2" @click="closeModal">
              Annuler
            </button>
            <button class="btn btn-warning mx-2" @click="confirmAction">
              Confirmer
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
  name: "ConfirmModal",
  props: {
    message: {
      type: String,
      default: "Vous confirmez cette action ?",
    },
  },
  methods: {
    closeModal() {
      this.$emit("closeConfirmModal");
    },
    confirmAction() {
      this.$emit("callback");
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

#close-arrow {
  margin-top: -1vh;
  margin-right: 50px;
  background: none;
  border: none;
}
</style>
