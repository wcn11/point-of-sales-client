<template>
    <div>

        <header class="card-header header-category">
            <h2>
                Persediaan
            </h2>
        </header>

        <aside class="card-header header-category">
            <div class="form-group row m-auto">
                <label for="inputPassword" class="col-sm-2 col-form-label">Cari Produk...</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" v-model="search" id="inputPassword" placeholder="Cari Produk...">
                </div>
            </div>
        </aside>

        <div class="row mt-5">

            <div class="col-md-12 col-sm-12 resource-container">
                <div class="resource">

                    <div class="row no-gutters">
                        <div class="table-responsive">
                            <table class="table table-hover table-border">
                                <thead>
                                <tr>
                                    <th>Nama Barang</th>
                                    <th>Kode Barang</th>
                                    <th>Jenis Barang</th>
                                    <th>Satuan</th>
                                    <th>Kuantitas (Gudang Pengguna)</th>
                                    <th>Stok Dapat Dijual</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(product, index) in products" :key="index">
                                    <td class="text-left">
                                        {{ product['title'] }}
                                    </td>
                                    <td>
                                        {{ product['id'] }}
                                    </td>
                                    <td>
                                        PCS
                                    </td>
                                    <td>
                                        10
                                    </td>
                                    <td>
                                        10
                                    </td>
                                    <td>
                                        10
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import axios from "axios"

export default {
    name: "stock",
    data(){
        return {
            products: [],
            search: ""
        }
    },
    methods: {
        getProducts(){
            return axios.get('https://fakestoreapi.com/products')
                .then(results => {
                    this.products = results.data
                })
        },
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
        margin-bottom: 5%;
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
</style>
