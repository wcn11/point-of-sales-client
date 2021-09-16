<template>
    <div>

        <header class="card-header header-category">
            <h2>
                Penjualan
            </h2>
        </header>

        <aside class="card-header header-category">
            <div class="form-group row m-auto">
                <label for="inputPassword" class="col-sm-2 col-form-label">Cari Penjualan...</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" v-model="search" id="inputPassword" placeholder="Cari Nomor, Tanggal, Pelanggan, Nilai Pembayaran...">
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
                                    <th>Nomor</th>
                                    <th>Tanggal</th>
                                    <th>No Cek</th>
                                    <th>Tanggal Cek</th>
                                    <th>Pelanggan</th>
                                    <th>Bank</th>
                                    <th>Keterangan</th>
                                    <th>Pakai kredit</th>
                                    <th>Nilai Pembayaran</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(product, index) in products" :key="index">
                                    <td class="text-left">
                                        INV.0002.21.08.06.000001
                                    </td>
                                    <td class="text-left">
                                        12/05/2021
                                    </td>
                                    <td colspan="1">

                                    </td>
                                    <td>
                                        12/05/2021
                                    </td>
                                    <td>
                                        Pa Ino
                                    </td>
                                    <td>
                                        Petty Cash
                                    </td>
                                    <td colspan="1">
                                        -
                                    </td>
                                    <td>
                                        Tidak
                                    </td>
                                    <td>
                                        75000
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
    name: "sale",
    data(){
        return {
            products: [],
            search: ""
        }
    },
    methods: {
        getProducts(){
            // return axios.get('https://fakestoreapi.com/products')
            //     .then(results => {
            //         this.products = results.data
            //     })
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
