<template>
  <div id="app">

    <Navigation />

        <div class="container">

            <router-view></router-view>

        </div>


      <div class="footer bg-white text-dark">
        <p class=" p-2">
        Copyright 2021 by PT BELI AYAM COM. All Rights Reserved.
        System Version 1.0.2-1 BETA</p>
      </div>

  </div>
</template>

<script>
import Navigation from './components/navigation.vue'


export default {
  name: 'App',
  components: {
    Navigation
  }
}
</script>

<style>
    body {
        background: #e4e4e4 !important;
        padding: 0;
        margin: 0;
        font-family: DM Sans;
    }

    .footer {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      background-color: red;
      color: white;
      text-align: center;
    }
</style>
