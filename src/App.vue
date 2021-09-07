<template>
  <div id="app">
    <Navigation />

    <div class="container">
      <router-view></router-view>
    </div>

    <!-- <FooterView></FooterView> -->

    <div class="loading-container w-100" v-if="this.$root.loading">
      <SwappingSquaresSpinner
        :animation-duration="1000"
        :size="60"
        :color="'#ff1d5e'"
        class="text-center loading-bar w-100"
      />
    </div>
  </div>
</template>

<script>
import Navigation from "./components/navigation.vue";
import FooterView from "./components/footer/footer-view.vue";
import { SwappingSquaresSpinner } from "epic-spinners";

export default {
  name: "App",
  components: {
    Navigation,
    SwappingSquaresSpinner,
    // FooterView
  },
  data(){
    return {
    }
  }
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

.loading-bar {
  top: 50%;
  bottom: 50%;
}
</style>
