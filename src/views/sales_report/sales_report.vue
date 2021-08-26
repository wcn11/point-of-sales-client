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
                    <date-picker v-model="date" type="date" class="w-100" format='YYYY-MM-DD' range placeholder="Pilih Jarak Tanggal"></date-picker>
                </div>

            </div>

            <div class="text-center row m-3">
                <div class="col m-2">
                    <button class="btn btn-secondary m-auto" @click="getProductsByDate"><i class="fad fa-search"></i> Cari</button>
                </div>
                <div class="col m-2" v-if="date">
                    <button class="btn btn-default m-auto border" @click="print"><i class="fad fa-print"></i> Print</button>
                </div>
            </div>
        </aside>

        <div class="row mt-4">
            <div class="col-sm-6 m-auto">
                <div class="card card-head bg-success mb-3">
                    <div class="card-body text-white">
                        <h5 class="card-title">Pendapatan</h5>
                        <p class="card-text">{{ commission | formatMoney }}</p>
                        <small>Pendapatan Bersih</small>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 m-auto">
                <div class="card card-head bg-warning mb-3">
                    <div class="card-body text-white">
                        <h5 class="card-title">Piutang</h5>
                        <p class="card-text">{{ debt | formatMoney }}</p>
                        <small>Nominal Yang Harus Di Berikan Kepada Pusat Setiap Minggu</small>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-2">

            <div class="card w-100">
                <div class="row no-gutters card-body">
                    <div class="col-md-6">
                        <form>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Dari :</label>
                                <p>{{ date[0] | formatDate }}</p>
                            </div>
                            <div class="form-group">
                                <label>Sampai :</label>
                                <p>{{ date[1] | formatDate}}</p>
                            </div>
                        </form>
                        
                    </div>
                    <div class="col-md-6">
                        Laporan: <button class="btn btn-success" @click="print"><i class="fad fa-file"></i> Cetak Laporan</button>
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
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import moment from 'moment'
moment.locale('id');  

export default {
    name: "sales_report",
    components: { DatePicker },
    data(){
        return {
            products: [],
            commission: 0,
            debt: 0,
            date: [
                    new Date(),
                    new Date()
                ],
        }
    },
    methods: {
        print(){

            let from = moment(this.date[0]).format("Do-MM-YYYY");
            let to = moment(this.date[1]).format("Do-MM-YYYY");

            this.$router.push({
                name:'sales_report_download',
                query:{
                        from: from, 
                        to: to
                    }
            })

        },
        getProducts(){
            let today = moment(this.data).format("Do/MM/YYYY");

            return axios.get(`${process.env.VUE_APP_BASE_HOST_API}/sales-report?from=${today}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    }
                })
                .then(results => {
                    console.log(results)
                    this.commission = results['data']['data']['commission']
                    this.debt = results['data']['data']['debt']
                    // this.products = results.data
                })
        },
        getProductsByDate(){

            let from = moment(this.date[0]).format("Do-MM-YYYY");
            let to = moment(this.date[1]).format("Do-MM-YYYY");

            return axios.get(`${process.env.VUE_APP_BASE_HOST_API}/sales-report?from=${from}&to=${to}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    }
                })
                .then(results => {
                    this.commission = results['data']['data']['commission']
                    this.debt = results['data']['data']['debt']
                    // this.products = results.data
                })
        },
        openModalFilter(){
            $("#modal-filter").modal('show')
        },
    },
    filters: {
        formatMoney(val){
            let formatter = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
            });

            return formatter.format(val);
        },
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
    margin-bottom: 5%;
    min-height: 100%;
    max-height: 100%;
}

.card-head{
    border-radius: 10px;
}

</style>
