<template>
    <div>

        <header class="card-header header-category">
            <h2>
                Laporan Penjualan
            </h2>
        </header>

        <aside class="card-header header-category">
            <div class="form-group row m-auto d-flex">
                <label for="inputPassword" class="col-sm-3 col-form-label">Cari Laporan Penjualan...</label>

                <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="search" id="inputPassword" placeholder="Cari Nomor, Tanggal, Pelanggan, Nilai Pembayaran...">
                </div>

<!--                <div class="col-sm-1">-->
<!--                    <button class="btn btn-outline-secondary" @click="openModalFilter"><span></span><i class="fad fa-filter"></i></button>-->
<!--                </div>-->
            </div>
        </aside>

        <div class="row mt-4">
            <div class="col-sm-6 m-auto">
                <div class="card card-head bg-success mb-3">
                    <div class="card-body text-white">
                        <h5 class="card-title">Pendapatan</h5>
                        <p class="card-text">{{ 523000 | formatMoney }}</p>
                        <small>Pendapatan Bersih</small>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 m-auto">
                <div class="card card-head bg-warning mb-3">
                    <div class="card-body text-white">
                        <h5 class="card-title">Piutang</h5>
                        <p class="card-text">{{ 1337500 | formatMoney }}</p>
                        <small>Nominal Yang Harus Di Berikan Kepada Pusat Setiap Minggu</small>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-2">

            <div class="col-md-12 col-sm-12 resource-container">
                <div class="resource">

                    <div class="row no-gutters">
                        <div class="table-responsive">
                            <table class="table table-hover table-bordered">
                                <thead>
                                <tr>
                                    <th>Produk</th>
                                    <th>Persediaan Saat Ini</th>
                                    <th>Penjualan</th>
                                    <th>Piutang Persediaan</th>
                                    <th>Sisa Persediaan</th>
                                    <th>Harga Dasar</th>
                                    <th>Komisi Pusat</th>
                                    <th>Komisi Mitra</th>
                                    <th>Harga Jual Pelanggan</th>
                                    <th>Nominal Piutang</th>
                                    <th>Pendapatan Mitra</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(product, index) in products" :key="index">
                                    <td class="text-left">
                                        {{ product['title'] }}
                                    </td>
                                    <td>
                                        13
                                    </td>
                                    <td>
                                        5
                                    </td>
                                    <td>
                                        13
                                    </td>
                                    <td>
                                        13
                                    </td>
                                    <td>
                                        {{ 20000 | formatMoney }}
                                    </td>
                                    <td>
                                        {{ 1000 | formatMoney }}
                                    </td>
                                    <td>
                                        {{ 4000 | formatMoney }}
                                    </td>
                                    <td>
                                        {{ 25000 | formatMoney }}
                                    </td>
                                    <td>
                                        {{ 105000 | formatMoney }}
                                    </td>
                                    <td>
                                        {{ 20000 | formatMoney }}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <!-- Modal -->
        <div class="modal fade" id="modal-filter" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="modal-filterLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Filter Laporan Penjualan</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div>
                            <div class="form-group row">
                                <label for="fromDate" class="col-sm-2 col-form-label">Berdasarkan</label>
                                <div class="col-sm-10">
                                    <select name="typeFilter" id="typeFilter" class="form-control">
                                        <option value="month">Bulan</option>
                                        <option value="date">Tanggal</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="form-group row">
                                <label for="fromDate" class="col-sm-2 col-form-label">Dari</label>
                                <div class="col-sm-10">
                                    <input type="date" readonly class="form-control-plaintext" id="fromDate" data-date-format="DD MMMM YYYY" value="2015-08-09">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="toDate" class="col-sm-2 col-form-label">Sampai</label>
                                <div class="col-sm-10">
                                    <input type="date" readonly class="form-control-plaintext" id="toDate" data-date-format="DD MMMM YYYY" value="2015-08-09">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">tutup</button>
                        <button type="button" class="btn btn-dark">terapkan</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import $ from 'jquery'

export default {
    name: "sales_report",
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
        openModalFilter(){
            $("#modal-filter").modal('show')
        }
    },
    filters: {
        formatMoney(val){
            let formatter = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
            });

            return formatter.format(val);
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
    margin-bottom: 5%;
    min-height: 100%;
    max-height: 100%;
}

.card-head{
    border-radius: 10px;
}

</style>
