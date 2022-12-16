<template>
  <div id="top-bar" class="sticky-top bg-primary">
    <div id="top-logo" @click="home">
      <span id="overRun">
        <h1 class="m-0 text-light">OverRun</h1>
      </span>
    </div>
    <div id="top-side" class="container-fluid p-0 m-0 shadow-sm">
      <div class="row m-0 p-0 h-100">
        <div class="col h-100 text-start">
          <h4 class="text-light centered-text" id="title">
            {{ title }}
          </h4>
        </div>

        <div class="col-7 m-0 p-0 h-100">
          <div v-if="userButton" id="edition-button" class="h-100 dropdown">
            <a
              id="dropdownUserLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div class="centered-text">
                <p>Pintade</p>
              </div>
              <div class="h-100 w-10" id="edition-arrow">
                <span class="material-icons d-inline" id="test">
                  expand_more
                </span>
              </div>
            </a>

            <ul
              id="dropdownUserMenu"
              class="dropdown-menu p-0"
              aria-labelledby="dropdownUserLink"
            >
              <li @click="settings">
                <a class="dropdown-item text-dark pt-0 pb-0" href="#">
                  <span class="material-icons-outlined icon d-inline m-0 p-0">
                    settings
                  </span>
                  <p class="d-inline">Paramètre</p>
                </a>
              </li>
              <li><hr class="dropdown-divider m-0 p-0" /></li>
              <li @click="disconnect">
                <a
                  class="dropdown-item bg-danger text-light pt-0 pt-0"
                  href="#"
                >
                  <span class="material-icons-outlined icon d-inline m-0 p-0">
                    meeting_room
                  </span>
                  <p class="d-inline">Deconnection</p>
                </a>
              </li>
            </ul>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { MutationTypes } from "@/store/modules/auth";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: String,
    userButton: Boolean,
  },
  methods: {
    home() {
      this.$router.push({ name: "Home" });
    },
    settings() {
      this.$router.push({ name: "userSettings" });
    },
    disconnect() {
      this.$store.commit(MutationTypes.LOGOUT, undefined)
      this.$router.push({ name: "Login" });
    },
  },
});
</script>

<style scoped>
#top-bar {
  height: 60px;
  width: 100vw;
}

#top-logo {
  height: 100%;
  line-height: 60px;
  text-align: center;
  width: 320px;
  background: #24305e;
  float: left;
}

#top-side {
  height: 100%;
  background: #374785;
}

#top-admin {
  width: calc(100vw - 320px);
}

#overRun {
  margin-top: 8px;
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}

#hide-sidebar-icon {
  height: 30px;
  margin-top: 14px;
  margin-left: 30px;
  float: left;
}

#img-container {
  width: 50px;
  margin: 0 6px 0 20px;
  float: right;
}

#profile-picture {
  border: 2px solid #374785;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  object-fit: cover;
  margin-top: 8px;
}

#edition-button {
  line-height: 60px;
  text-align: center;
  width: 150px;
  display: block;
  float: right;
  color: white;
  background: #24305e;
}

#edition-button:hover {
  font-weight: bolder;
}

#title {
  margin-top: 24px;
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}

.centered-text {
  margin-top: 16px;
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}

#edition-arrow {
  display: inline-block;
  margin-left: 3px;
  line-height: 60px;
}

#test {
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}

#dropdownUserMenu {
  margin-right: -32px !important;
  margin-top: 20px !important;
}

.icon {
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}

.inactiveLink {
  pointer-events: none;
  cursor: default;
}

a {
  color: inherit;
}
</style>
