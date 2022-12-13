<template>
  <div v-if="index" class="row m-2">
    <div class="col p-0 hr-container text-center">
      <div class="col p-0 dot-container hr-container">
        <hr class="text-light" />
        <div class="dot rounded-circle bg-primary"></div>
        <hr
          class="text-primary"
          :class="{ 'text-primary': index > 1, 'text-secondary': index <= 1 }"
        />
      </div>
    </div>
    <div class="col p-0 hr-container text-center">
      <div class="col p-0 dot-container hr-container">
        <hr
          class="text-primary"
          :class="{ 'text-primary': index >= 2, 'text-secondary': index < 2 }"
        />
        <div
          class="dot rounded-circle bg-primary"
          :class="{ 'bg-primary': index >= 2, 'bg-secondary': index < 2 }"
        ></div>
        <hr
          class="text-primary"
          :class="{ 'text-primary': index > 2, 'text-secondary': index <= 2 }"
        />
      </div>
    </div>
    <div class="col p-0 hr-container text-center">
      <div class="col p-0 dot-container hr-container">
        <hr
          class="text-primary"
          :class="{ 'text-primary': index >= 3, 'text-secondary': index < 3 }"
        />
        <div
          class="dot rounded-circle"
          :class="{ 'bg-primary': index >= 3, 'bg-secondary': index < 3 }"
        ></div>
        <hr
          class="text-primary"
          :class="{ 'text-primary': index > 3, 'text-secondary': index <= 3 }"
        />
      </div>
    </div>
    <div class="col p-0 hr-container text-center">
      <div class="col p-0 dot-container hr-container">
        <hr
          class="text-primary"
          :class="{ 'text-primary': index >= 4, 'text-secondary': index < 4 }"
        />
        <div
          class="dot rounded-circle"
          :class="{ 'bg-primary': index >= 4, 'bg-secondary': index < 4 }"
        ></div>
        <hr
          class="text-primary"
          :class="{ 'text-primary': index > 4, 'text-secondary': index <= 4 }"
        />
      </div>
    </div>
    <div class="col p-0 hr-container text-center">
      <div class="col p-0 dot-container hr-container">
        <hr
          class="text-primary"
          :class="{ 'text-primary': index >= 5, 'text-secondary': index < 5 }"
        />
        <div
          class="dot rounded-circle"
          :class="{ 'bg-primary': index >= 5, 'bg-secondary': index < 5 }"
        ></div>
        <hr class="text-primary text-light" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    index: Number,
  },
});
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

.bg-secondary {
  background-color: gray !important;
}
</style>
