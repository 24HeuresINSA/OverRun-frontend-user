<template>
  <div class="sticky-top p-0 m-0">
    <div id="top-bar" class="container-fluid p-0 m-0">
      <div class="row m-0 p-0">
        <div class="col-6">
          <div id="top-logo" class="p-0 m-0">
            <span id="overun">
              <h1 class="m-0 text-light" @click="home">Overun</h1>
            </span>
          </div>
        </div>
        <div class="col-6">
          <button
            type="button"
            class="btn btn-primary centered-button border-0 float-end d-table"
            @click="toggleMenu"
            v-if="userButton"
          >
            <span class="material-icons-outlined d-table-cell align-middle">
              menu
            </span>
          </button>
        </div>
      </div>
    </div>
    <div v-show="showMenu" id="menu" class="container-fluid p-0 m-0">
      <div class="row">
        <div class="col">
          <ul class="list-group text-light text-start mt-2">
            <li class="list-group-item" @click="settings">Parametres</li>
            <li class="list-group-item" @click="disconnect">Déconnection</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    userButton: Boolean,
  },
  data() {
    return {
      showMenu: false,
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    home() {
      this.$router.push({ name: "Home" });
    },
    settings() {
      this.$router.push({ name: "userSettings" });
    },
    disconnect() {
      this.$router.push({ name: "Login" });
    },
  },
});
</script>

<style scoped>
#top-bar {
  height: 60px;
  width: 100vw;
  background-color: #24305e;
}

#top-logo {
  height: 100%;
  line-height: 60px;
  text-align: start;
  width: 320px;
  float: left;
}

#overun {
  margin-top: 8px;
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}

#menu {
  background-color: #374785;
}

.centered-button {
  margin-top: 10px;
  line-height: 60px;
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}

ul {
  background-color: none !important;
}

.list-group-item {
  background-color: inherit !important;
  border: none;
  color: white;
}

.list-group-item:hover {
  background-color: #24305e !important;
  font-weight: bolder;
}
</style>
