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
        <g>
          <g>
            <g>
              <path
                d="M492,236H276V20c0-11.046-8.954-20-20-20c-11.046,0-20,8.954-20,20v216H20c-11.046,0-20,8.954-20,20s8.954,20,20,20h216    v216c0,11.046,8.954,20,20,20s20-8.954,20-20V276h216c11.046,0,20-8.954,20-20C512,244.954,503.046,236,492,236z"
                data-original="#000000"
                class="active-path"
                data-old_color="#becad7"
                fill="#becad7"
              />
            </g>
          </g>
        </g>
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
    <p class="file-name">{{ fileName }}</p>
    <p v-if="status" class="validation-status">{{ status }}</p>
  </div>
</template>

<script>
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
          this.validateFile();
        }
      });
    },
    validateFile() {}
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
    color: #c5cdd3;
    font-weight: 500;
    padding-top: 15px;
  }

  .validating {
    margin-top: 20px;

    .hash-loader {
      margin: 0 auto;
    }
  }

  .status-icon {
    height: 45px;
  }

  .validation-status {
    font-size: 18px;
    font-weight: 600;
    color: #0f82ff;
    padding: 10px 0 15px;
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
}
</style>
