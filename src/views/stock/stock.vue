<template>
    <div>

        <header class="card-header header-category">
            <h2>
                Persediaan
            </h2>
        </header>

        <!-- <aside class="card-header header-category">
            <div class="form-group row m-auto">
                <label for="inputPassword" class="col-sm-2 col-form-label">Cari Produk...</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" v-model="search" id="inputPassword" placeholder="Cari Produk...">
                </div>
            </div>
        </aside> -->

        <div class="row mt-5">

            <div class="col-md-12 col-sm-12 resource-container">
                <div class="resource">

                    <div class="loading-container w-100" v-if="loading">
                        <SwappingSquaresSpinner
                            :animation-duration="1000"
                            :size="60"
                            :color="'#ff1d5e'"
                            class="text-center m-auto"
                        />
                        <vue-typed-js class="justify-content-center" :strings="['memuat data...', 'mengumpulkan data...', 'mengkompres data...', 'memuat...']">
                            <p class="typing"></p>
                        </vue-typed-js>
                        
                    </div>

                    <div class="row no-gutters" v-else>
                        <div class="col-md-6">
                            Tanggal: {{ new Date() | formatDate }}
                        </div>
                        <div class="col-md-6">
                            Stock: <button class="btn btn-success" @click="createPdf"><i class="fad fa-file"></i> stock.pdf</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import axios from "axios"
import { SwappingSquaresSpinner  } from 'epic-spinners'
import $ from "jquery"
require("print-js/dist/print.css")
import moment from "moment"

moment.locale('id');    

export default {
    name: "stock",
    components: {
        SwappingSquaresSpinner
    },
    data(){
        return {
            products: [],
            search: "",
            loading: false,
            fileId: ""
        }
    },
    methods: {
        createPdf(){
            let url = `/stock/download`
            window.open(url, "_blank").focus()
        },
        getProducts(){

            this.loading = !this.loading;
            return axios.get(`${process.env.VUE_APP_BASE_HOST_API}/stocks`,{

                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt"),
                },
            })
                .then(results => {
                    if(results['data']['success']){
                        this.fileId = results['data']['data']
                    }
                    this.loading = !this.loading;
                })
        },
    },
    filters:{
        formatDate(){
            return moment().format("Do MMMM YYYY");  
        }  
    },
    created() {
        this.getProducts()
    }
}
</script>

<style scoped lang="css">

    .header-category{
        text-align: center;
        background-color: white;
        border-radius: 10px;
        margin: auto;
        margin-top: 2%;
    }
    .resource-container {
        margin-bottom: 3%;
    }
    .resource {
        text-align: center;
        box-shadow: 0 2 px 10 px 0 rgba(0, 0, 0, 0.1);
        padding: 15px;
        /*max-width: 345px;*/
        background-color: white;
        border-radius: 12px;
        justify-content: center;
        margin: auto;
        min-height: 100%;
        max-height: 100%;
    }
    .left {
        width: 90px;
        position: relative;
        float: left;
    }
    .right{
        max-width: 345px;
        text-align: left;
    }
    .loading-container{
        background-color: wheat;
        padding: 20%;
    }
</style>
