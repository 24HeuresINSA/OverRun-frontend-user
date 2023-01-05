<template>
  <div class="backdrop" @click.self="closeModal">
    <div
      class="col-10 col-lg-4 p-3 bg-light custom-modal m-auto rounded-3 mt-5"
    >
      <div>
        <div class="row pt-3">
          <div class="col">
            <h4>Certificat 📜</h4>
          </div>
          <div class="col-1">
            <button id="close-arrow" @click="closeModal">
              <span class="material-icons-outlined"> close </span>
            </button>
          </div>
        </div>

        <div class="row" id="certificate-row">
          <div class="certificate" id="certificate-container">
            <embed
              :src="imageLink"
              height="100%"
              width="100%"
              id="certificate-img"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DisplayCertificate",
  data() {
    return {
      imageLink: "",
    };
  },
  props: {
    certificateFile: {
      type: String,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("closeDisplayCertificateModal");
    },
    async getImage(): Promise<string> {
      if (!this.certificateFile) return "";
      const response = await fetch(
        `${process.env.VUE_APP_API_BASE_URL}/static/${this.certificateFile}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/getAccessToken"]}`,
          },
        }
      );

      if (response.status === 200) {
        const url = URL.createObjectURL(await response.blob());
        return url;
      }
      return "";
    },
  },
  watch: {
    certificateFile() {
      this.getImage().then((url) => {
        this.imageLink = url;
      });
    },
  },
});
</script>

<style scoped>
#certificate-row {
  height: calc(100vh - 300px);
  max-height: calc(100vh - 300px) !important;
}

#certificate-container {
  height: 100%;
  width: 100%;
  position: relative;
  display: inline-block;
  overflow: hidden;
}

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
