<template>
  <div class="row m-2">
    <div class="col hr-container text-center">
      <div class="col dot-container hr-container">
        <hr class="" />
        <div class="dot rounded-circle bg-primary"></div>
        <hr class="" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style scoped>
.dot {
  width: 40px;
  height: 40px;
}

.hr-container {
  display: flex;
  align-items: center;
}

.dot-container {
  width: 40px !important;
}

hr {
  position: relative;
  height: 12px;
  float: right;
  width: calc(50% - 20px);
}
</style>