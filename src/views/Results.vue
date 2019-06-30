<template>
  <div class="button-wrapper">
    <router-link class="back" to="/">continue</router-link>
  </div>
</template>

<script>
export default {
  name: "results"
};
</script>

<style lang="scss" scoped>
.back {
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
</style>
