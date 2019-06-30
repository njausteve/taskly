<template>
  <div id="app">
    <router-view />
    <transition name="modal">
      <div v-if="">
        <div class="overlay" @click.self="isOpen = false">
          <div class="modal">
            <div class="spinner">
              <h2>
                {{ text }}
              </h2>
              <grid-loader
                class="hash-loader"
                color="#ffa820"
                :loading="true"
                :size="25"
                :sizeUnit="em"
                style="margin: 0 auto;"
              />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  computed: {
    text: () => {
      return "wait while compile the reports";
    }
  }
};
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

.modal {
  margin: 0px auto;
  padding: 20px;
  border-radius: 2px;
  transition: all 0.2s ease-in;
  font-family: Helvetica, Arial, sans-serif;
}

.fadeIn-enter {
  opacity: 0;
}

.fadeIn-leave-active {
  opacity: 0;
  transition: all 0.2s step-end;
}

.fadeIn-enter .modal,
.fadeIn-leave-active.modal {
  transform: scale(1.1);
}

button {
  padding: 7px;
  margin-top: 10px;
  background-color: green;
  color: white;
  font-size: 1.1rem;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 999;
  transition: opacity 0.3s ease;
  -webkit-font-smoothing: antialiased;
  background: rgba(255, 255, 255, 0.9);
  opacity: 0.9;
  transform: translate3D(0, 0, 0);
}

.spinner {
  margin: 0px auto;
}
</style>
