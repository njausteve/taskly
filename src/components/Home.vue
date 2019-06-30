<template>
  <div class="home-wrapper">
    <div class="home">
      <div v-for="card in cards" :key="card.title">
        <Card :card="card" />
      </div>
    </div>
    <div class="button-wrapper" v-if="showContinue">
      <router-link class="continue" to="/results">continue</router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Card from "../components/Card";

export default {
  name: "home",
  components: {
    Card
  },
  data: () => {
    return {
      cards: [
        {
          title: "OS last month",
          description: "Outstanding Estimate as at end of the previous month",
          imageUrl: require("../assets/calendar-with-date-number-1.svg")
        },
        {
          title: "Intimated",
          description: "Claims intimated during the current month",
          imageUrl: require("../assets/intimated.png")
        },
        {
          title: "Paid",
          description: "Claims paid during the current month",
          imageUrl: require("../assets/payments.png")
        },
        {
          title: "OS end Month",
          description: "Outstanding Estimate as at end of the current month",
          imageUrl: require("../assets/halloween.svg")
        }
      ]
    };
  },
  computed: {
    showContinue() {
      return (
        this.paidStatus &&
        this.intimatedStatus &&
        this.osLastMonthStatus &&
        this.osEndMonthStatus
      );
    },
    ...mapState([
      "osLastMonthStatus",
      "intimatedStatus",
      "osEndMonthStatus",
      "paidStatus"
    ])
  }
};
</script>
<style lang="scss" scoped>
.home-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
}

.home {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  padding-bottom: 50px;

  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.button-wrapper {
  .continue {
    background-color: #0f82ff;
    padding: 10px 120px;
    border-radius: 5px;
    color: white;
    font-size: 18px;
    box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.05);
    cursor: pointer;
    text-decoration: none;

    &:hover {
      background-color: #1c83f1;
    }
  }
}
</style>
