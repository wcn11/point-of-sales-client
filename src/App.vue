<template>
  <div id="app">

    <Navigation />

        <div class="container">

            <router-view></router-view>

        </div>

        <!-- <FooterView></FooterView> -->

  </div>
</template>

<script>
import Navigation from './components/navigation.vue'
import FooterView from './components/footer/footer-view.vue'


export default {
  name: 'App',
  components: {
    Navigation,
    // FooterView
  },
}
</script>

<style>
    body {
        background: #e4e4e4 !important;
        padding: 0;
        margin: 0;
        font-family: DM Sans;
    }
</style>
