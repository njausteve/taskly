import Vue from "vue";
import Vuex from "vuex";
import { validate } from "./assets/js/validate";
import { toCamelCase } from "./utils/index.js";

Vue.use(Vuex);

const defaultState = () => ({
  intimatedStatus: "",
  osEndMonthStatus: "",
  osLastMonthStatus: "",
  paidStatus: "",
  paid: [],
  intimated: [],
  osEndMonth: [],
  osLastMonth: []
});

export default new Vuex.Store({
  state: defaultState(),
  getters: {},
  mutations: {
    setDefaultState(state) {
      const defaults = defaultState();
      Object.keys(state).forEach(key => {
        state[key] = defaults[key];
      });
    },
    setData(state, payload) {
      state[payload.stateToChange] = payload.data;
    },
    setState(state, payload) {
      state[payload.stateToChange] = payload.value;
    }
  },
  actions: {
    setDefaultState(state) {
      const defaults = defaultState();
      Object.keys(state).forEach(key => {
        state[key] = defaults[key];
      });
    },
    async validateFile({ commit }, { filePath, sheetName }) {
      let validationStatus;

      try {
        const validationResponse = await validate(filePath, sheetName);
        const stateName = toCamelCase(sheetName);
        const stateStatusTochange = `${stateName}Status`;

        if (validationResponse.status == "invalid") {
          validationStatus = "invalid";
          commit("setState", {
            stateToChange: stateStatusTochange,
            value: false
          });

          commit("setData", {
            stateToChange: stateName,
            data: []
          });

          validationStatus = "invalid";
        } else {
          commit("setState", {
            stateToChange: stateStatusTochange,
            value: true
          });

          commit("setData", {
            stateToChange: stateName,
            data: validationResponse.data
          });

          validationStatus = "valid";
        }

        return validationStatus;
      } catch (error) {
        console.log("error occured", error);
        return "invalid";
      }
    }
  }
});
