<template>
  <div id="app">
    <Navigation />

    <div class="container">
      <router-view></router-view>
    </div>

    <!-- <FooterView></FooterView> -->

    <div class="loading-container w-100" v-if="this.$root.loading">
      <div class="animate__animated animate__bounce infinite animate__infinite">
        <img
          :src="require('./assets/logo.png')"
          alt="Loading"
          class="img-fluid img-loading"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "./components/navigation.vue";
import FooterView from "./components/footer/footer-view.vue";

export default {
  name: "App",
  components: {
    Navigation
  },
  data() {
    return {};
  },
};
</script>

<style>
body {
  background: #e4e4e4 !important;
  padding: 0;
  margin: 0;
  font-family: DM Sans;
}
.loading-container {
  position: absolute;
  background-color: rgb(173 173 173 / 50%);
  top: 0;
  height: 100%;
  z-index: 1060;
}
.loading-container div {
  text-align: center;
  top: 50%;
  bottom: 50%;
  position: relative;
}

.loading-bar {
  top: 50%;
  bottom: 50%;
}

.img-loading {
  width: 100px;
}
</style>
