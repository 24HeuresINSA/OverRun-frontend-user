<template>
  <div class="backdrop" @click.self="closeModal">
    <div
      class="col-10 col-lg-4 p-3 bg-light custom-modal m-auto rounded-3 mt-5"
    >
      <div>
        <div class="row pt-3">
          <div class="col">
            <h4>Un est survenu &#128557;</h4>
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
              Une erreur est survenu lors de l'action, êtes vous sur d'avoir
              renseigné les bonnes informations?
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ErrorModal",
  methods: {
    closeModal() {
      this.$emit("closeErrorModal");
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

#close-arrow {
  margin-top: -1vh;
  margin-right: 50px;
  background: none;
  border: none;
}
</style>
