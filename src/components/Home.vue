<template>
  <div class="home-wrapper">
    <div class="home">
      <div v-for="card in cards" :key="card.title">
        <Card :card="card" />
      </div>
    </div>
  </div>
</template>

<script>
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

  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}
</style>
