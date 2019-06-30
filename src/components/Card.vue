<template>
  <div class="card">
    <div>
      <img :src="card.imageUrl" class="icon" alt="card.title" />
    </div>
    <h2>{{ card.title }}</h2>
    <p class="description">{{ card.description }}</p>
    <div
      v-if="state === 'initial'"
      class="upload-image-wrapper"
      @click="selectFile"
    >
      <svg
        x="0px"
        y="0px"
        viewBox="0 0 512 512"
        style="enable-background:new 0 0 512 512;"
        xml:space="preserve"
        width="512px"
        height="512px"
        class="upload-icon"
      >
        <path
          d="M492,236H276V20c0-11.046-8.954-20-20-20c-11.046,0-20,8.954-20,20v216H20c-11.046,0-20,8.954-20,20s8.954,20,20,20h216    v216c0,11.046,8.954,20,20,20s20-8.954,20-20V276h216c11.046,0,20-8.954,20-20C512,244.954,503.046,236,492,236z"
          data-original="#000000"
          class="active-path"
          data-old_color="#becad7"
          fill="#becad7"
        />
      </svg>
    </div>
    <p v-if="state === 'initial'" class="select-file">select excel file</p>
    <div class="validating">
      <hash-loader
        class="hash-loader"
        color="#ffa820"
        :loading="isValidating"
        :size="56"
      />
      <div class="hash-loader">
        <img
          v-if="showError"
          class="status-icon"
          src="../assets/error.svg"
          alt="error"
        />
        <img
          v-if="showSuccess"
          class="status-icon"
          src="../assets/success.svg"
          alt="success"
        />
      </div>
    </div>
    <p v-if="status" class="validation-status">{{ status }}</p>
    <p v-if="state !== 'initial'" class="file-name">{{ fileName }}</p>

    <p v-if="hasfinishedValidating" @click="reset" class="reset">
      Select again ?
    </p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { close, closeSync } from "fs";

import { toCamelCase } from "../utils/index.js";
const { dialog } = require("electron").remote;

export default {
  props: {
    card: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  data: () => {
    return {
      fullPath: "",
      fileName: "",
      state: "initial" // initial, validating, valid, invalid
    };
  },
  computed: {
    status() {
      let status;

      switch (this.state) {
        case "initial":
          status = "";
          break;
        case "validating":
          status = "checking file";
          break;
        case "valid":
          status = "All good";
          break;
        case "invalid":
          status = "Errors found";
          break;
        default:
          break;
      }
      return status;
    },
    hasfinishedValidating() {
      return this.showError || this.showSuccess;
    },
    isValidating() {
      return this.state === "validating";
    },
    showError() {
      return this.state === "invalid";
    },
    showSuccess() {
      return this.state === "valid";
    }
  },
  methods: {
    ...mapActions({
      validateFile: "validateFile"
    }),
    reset() {
      this.selectFile();
    },
    selectFile() {
      const filters = {
        filters: [
          {
            name: "Excel file",
            extensions: ["xlsx", "xls"]
          }
        ]
      };

      dialog.showOpenDialog(filters, selectedFile => {
        if (selectedFile) {
          this.fullPath = selectedFile[0];
          this.fileName = this.fullPath.substring(
            this.fullPath.lastIndexOf("/") + 1
          );

          this.state = "validating";
          this.initiateValidation();
        }
      });
    },
    async initiateValidation() {
      try {
        const response = await this.validateFile({
          filePath: this.fullPath,
          sheetName: this.card.title
        });

        this.state = response;
      } catch (error) {
        this.state = "invalid";
      }
    }
  },
  watch: {
    state: function() {
      // TODO: add error notification or error message when file is invalid
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  border-radius: 8px;
  background-color: white;
  padding: 20px;
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.5s ease;
  margin: 15px;

  @media screen and (min-width: 768px) {
    min-height: 425px;
  }

  &:hover {
    box-shadow: 0 0 8px #79a7fc;
  }

  .icon {
    height: 150px;

    @media screen and (max-width: 768px) {
      height: 100px;
    }
  }

  .description {
    padding: 10px 0 0 0;

    @media screen and (max-width: 768px) {
      display: none;
    }
  }

  .file-name {
    color: #a8b9ca;
    font-weight: 600;
    font-size: 14px;
  }

  .validating {
    margin-top: 25px;

    .hash-loader {
      margin: 0 auto;
    }
  }

  .status-icon {
    height: 35px;
  }

  .validation-status {
    font-size: 18px;
    font-weight: 600;
    color: #0f82ff;
    padding: 10px 0 5px;
  }

  .inputfile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  .inputfile + label {
    font-size: 1.25em;
    font-weight: 700;
    color: white;
    background-image: url("../assets/file.svg");
    background-repeat: no-repeat;
  }

  .upload-image-wrapper {
    border: 2px dashed #a8b9ca;
    display: inline-block;
    padding: 10px 15px;
    margin-top: 50px;

    &:hover {
      .active-path {
        fill: rgba(255, 151, 0, 0.52);
      }
    }

    .upload-icon {
      height: 30px;
      width: 30px;
      cursor: pointer;
    }
  }
  .select-file {
    margin: 10px 0 0 0;
    color: #a8b9ca;
  }

  .reset {
    padding-top: 25px;
    cursor: pointer;
    color: #ff9700;
    font-weight: 400;
    font-size: 12px;

    &:hover {
      color: #a8b9ca;
    }
  }
}
</style>
