<template>
  <div class="backdrop" @click.self="closeModal">
    <div
      class="col-10 col-lg-4 p-3 bg-light custom-modal m-auto rounded-3 mt-5"
    >
      <div class="row pt-3">
        <div class="col">
          <h4>Nous n'avons pas réussi à trouver votre carte VA &#128561;</h4>
        </div>
      </div>
      <div class="row pt-3">
        <div class="col m-2 text-start">
          <p>
            Il semblerait qu'il y ait eu un problème lors de la vérification de
            votre carte VA. Assurez-vous d'avoir renseigné les bonnes valeurs
            dans les différents champs, et de bénéficier de l'adhésion
            VAvantages. Si le problème persiste, cliquez sur le bouton "J'ai un
            problème".
          </p>
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
      this.$emit("closeUnfoundModal");
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
