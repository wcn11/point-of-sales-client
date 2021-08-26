<template>

      <footer class="footer bg-white text-dark">
          <div class=" p-2">
            <p>Copyright 2021 by PT. BELI AYAM COM. <br />
                All Rights Reserved. System Version 1.0.2-1 BETA
            </p>
          </div>
      </footer>

</template>

<script>
export default {
    name: "footer-view"
}
</script>

<style scoped>

    .footer {
      position: relative;
      left: 0;
      bottom: 0;
      width: 100%;
      background-color: red;
      color: white;
      text-align: center;
  grid-row-start: 2;
  grid-row-end: 3;
    }

</style>
