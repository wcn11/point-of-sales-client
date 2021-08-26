<template>

	<div id="notfound">
		<div class="notfound">
			<div>
				<div class="notfound-404">
					<h1>!</h1>
				</div>
				<h2>Error<br>404</h2>
			</div>
			<p>Halaman yang Anda cari mungkin telah dihapus karena namanya diubah atau untuk sementara tidak tersedia. <a href="/">Kembali Ke Halaman Awal</a></p>
		</div>
	</div>
</template>

<script>
require('../assets/css/stylePageNotFound.css')

export default {
    name: "notFound",
    methods:{
        removeNav(){
            // document.querySelector(".nav").style.display = "none"
        }
    },
    mounted() {
        this.removeNav()
    }
}
</script>

<style scoped>

</style>