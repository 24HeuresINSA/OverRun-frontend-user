<template>
  <div class="container-fluid h-100 p-0 m-0">
    <TopBar :title="title" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TopBar from "../../components/topBar/TopBar.vue";

export default defineComponent({
  components: {
    TopBar,
  },
  data() {
    return {
      title: "Réinitialiser mon mot de passe",
    };
  },
});
</script>