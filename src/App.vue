<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-left: auto;
  margin-right: auto;
}

body {
  background-color: #f6f8fa;
  box-sizing: border-box;
  max-width: 1200px;
  margin: 0 auto;
}

h2,
p {
  margin: 0;
}
</style>
