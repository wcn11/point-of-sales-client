<template>

    <nav class="nav">

        <div class="logo p-2">

            <a class="navbar-brand text-decoration-none text-dark" href="/">
                <img src="./../images/icon.png" width="30" height="30" class="d-inline-block align-top" alt="">
                POS Mitra PT. BELI AYAM COM
            </a>

        </div>

        <div class="select menu" @mouseleave="closeMenu">
            <a href="javascript:void(0)" class="link color-main  dropdown-toggle" id="navigation_2_dropdown_1">{{ menuSelected }}</a>
            <div class="dropdown-menu">
                <router-link :to="{ name: 'category'}" class="m-2">Beranda</router-link>
                <router-link :to="{ name: 'category'}" class="m-2">Produk</router-link>
                <router-link :to="{ name: 'customers'}" class="m-2">Pelanggan</router-link>
                <router-link :to="{ name: 'stock'}" class="m-2">Persediaan</router-link>
                <router-link :to="{ name: 'sale'}" class="m-2">Penjualan</router-link>
                <router-link :to="{ name: 'sales_report'}" class="m-2">Laporan Penjualan</router-link>
            </div>
        </div>

        <div class="login">
            <button @click="openCart"><i class="fad fa-cart-plus"></i>
                <span>{{ carts ? carts.length : 0 }}</span>
            </button>
            <button @click="logout">Logout</button>
        </div>

        <!-- Modal -->
        <div class="modal fade animate__animated animate__fadeInUp" id="modal-cart" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered modal-static modal-dialog-scrollable modal-lg">
                <div class="modal-content modal-bottom">
                    <div class="modal-body">
                        <div class="text-center">
                            <header class="card-header d-flex">
                                <h2><i class="fad fa-cart-arrow-down"></i> Keranjang</h2>
                            </header>

                            <div v-if="carts">
                                <div class="card card-cart m-2 row" v-for="(cart, index) in carts" :key="index">
                                    <div class='container-card-product d-flex'>
                                        <div class="">
                                            <img :src="cart['image'] ? cart['image'] : require('../assets/images/broiler.jpeg')" class='iconDetails' alt="Gambar Ayam">
                                        </div>
                                        <div class="right-cart text-left">
                                            <h4 class="cart-title-product mb-3">
                                                {{ cart['product']['name'] }}
                                            </h4>
                                            <div class="w-100 mb-3 d-flex">

                                                <sup>Rp</sup> <input @change="checkRequestInput(cart['product']['id'])" type="text" class="form-control-borderless w-50 ml-3 text-center" name="quantity" v-model.number="cart['product']['price']" pattern="[0-9]*"/>
                                                <!-- {{ cart['product']['unitPrice'] | formatMoney }} -->
                                            </div>
                                            <div class="w-100 counter-cart">
                                                <span @click="removeProduct(cart['product']['id'])" class="mr-5"><i class="fad fa-trash-alt"></i></span>
                                                <span @click="updateCart(cart['product']['id'])" class="counter-button"><i class="fad fa-minus-circle"></i></span>
                                                <span>
                                                    {{ cart['product']['quantity'] }}
                                                </span>
                                                <span @click="updateCart(cart['product']['id'], 'plus')" class="counter-button"><i class="fad fa-plus-circle"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer justify-content-end">
                            <a href="javascript:void(0)" class="btn btn-outline-dark" data-dismiss="modal"><i class="fad fa-times-circle"></i> Tutup</a>
                            <a href="javascript:void(0)" v-if="carts.length > 0" class="btn btn-outline-dark" @click="openPayment"><i class="fad fa-shopping-basket"></i> Lanjut Ke Pembayaran</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade animate__animated animate__fadeInUp" id="modal-payment" tabindex="-1">
            <div class="modal-dialog modal-static modal-dialog-scrollable">
                <div class="modal-content modal-bottom">
                    <div class="modal-body">
                        <div class="text-center">
                            <header class="card-header d-flex">
                                <h2><i class="fad fa-cart-arrow-down"></i> Pembayaran</h2>
                            </header>

                            <div class="row mt-4">
                                <div class="col-sm-12 m-auto">
                                    <div class="card card-head bg-secondary mb-3 row">
                                        <div class="card-body text-white col-md-9 col-sm-9">
                                            <p>Total Tagihan</p>
                                            <h1 class="card-text">{{ bill | formatMoney }}</h1>
                                        </div>
                                        <div class="card-body col-md-3 col-sm-1">
                                            <a href="javascript:void(0)" @click="openCart" class="pull-right text-white"><i class="fad fa-cart-plus"></i> Lihat Keranjang</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row text-left">
                                <label for="customers" class="col-sm-4 form-control-label">Pelanggan</label>
                                <div class="col-sm-8 d-flex">


                                    <select class="form-control" v-model="selectedCustomer" id="customers" data-header="Pilih Pelanggan" data-show-subtext="true" data-live-search="true">
                                        <option v-for="(customer, index) in customers" :value="customer['id']" :key="index"> 
                                            <p>{{ customer['name'] }}</p>
                                            <small> {{ customer['mobilePhone'] }}</small>
                                        </option>
                                    </select>

                                    <button class="btn btn-success ml-2" @click="openModalAddCustomer"><i class="fad fa-plus-circle" aria-hidden="true"></i></button>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="paymentMethod" class="col-sm-4 form-control-label">Metode Pembayaran</label>
                                <div class="col-sm-8 d-flex">

                                    <select class="form-control" v-model="selectedPayment" id="paymentMethod" data-header="Pilih Metode Pembayaran" data-show-subtext="true" data-live-search="true">
                                        <option value="cash">Tunai</option>
                                        <!-- <option value="transfer">Transfer</option> -->
                                    </select>

                                </div>
                            </div>

                        </div>
                        <div class="modal-footer justify-content-around">
                            <a href="javascript:void(0)" data-dismiss="modal" class="btn btn-outline-dark"><i class="fad fa-times-circle"></i> Batal</a>
                            <a href="javascript:void(0)" class="btn btn-outline-dark" @click="pay"><i class="fad fa-shopping-basket"></i> Bayar</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade animate__animated animate__fadeInUp" id="modal-add-customer" tabindex="-1">
            <div class="modal-dialog modal-static modal-dialog-scrollable">
                <div class="modal-content modal-bottom">
                    <div class="modal-body">
                        <div class="text-center">
                            <header class="card-header d-flex mb-3">
                                <h2><i class="fad fa-cart-arrow-down"></i> Tambah Pelanggan</h2>
                            </header>

                            <div class="form-group row text-left">
                                <label for="customers" class="col-sm-4 form-control-label">Nama Pelanggan <span class="text-danger">*</span></label>
                                <div class="col-sm-8 d-flex">
                                    <input type="text" class="form-control" v-model="addCustomer['name']">
                                </div>
                            </div>

                            <div class="form-group row text-left">
                                <label for="customers" class="col-sm-4 form-control-label">Email</label>
                                <div class="col-sm-8 d-flex">
                                    <input type="text" class="form-control" v-model="addCustomer['email']">
                                </div>
                            </div>

                            <div class="form-group row text-left">
                                <label for="customers" class="col-sm-4 form-control-label">No. Telp</label>
                                <div class="col-sm-8 d-flex">
                                    <input type="text" class="form-control" v-model.number="addCustomer['mobilePhone']">
                                </div>
                            </div>

                            <div class="form-group row text-left">
                                <label for="customers" class="col-sm-4 form-control-label">Alamat </label>
                                <div class="col-sm-8 d-flex">
                                    <textarea type="text" class="form-control" editable="false" v-model="addCustomer['billStreet']"></textarea>
                                </div>
                            </div>


                            <div class="form-group row text-left">
                                <label for="customers" class="col-sm-4 form-control-label">Kota </label>
                                <div class="col-sm-8 d-flex">
                                    <input type="text" class="form-control" v-model="addCustomer['billCity']">
                                </div>
                            </div>
                            <div class="form-group row text-left">
                                <label for="customers" class="col-sm-4 form-control-label">Provinsi </label>
                                <div class="col-sm-8 d-flex">
                                    <input type="text" class="form-control" v-model="addCustomer['billProvince']">
                                </div>
                            </div>

                            <div class="form-group row text-left">
                                <label for="customers" class="col-sm-4 form-control-label">Kode Pos </label>
                                <div class="col-sm-8 d-flex">
                                    <input type="text" class="form-control" v-model.number="addCustomer['billZipCode']">
                                </div>
                            </div>

                            <div class="form-group row text-left">
                                <label for="customers" class="col-sm-4 form-control-label">Catatan Pelanggan </label>
                                <div class="col-sm-8 d-flex">
                                    <textarea type="text" class="form-control" resizable="false" v-model="addCustomer['notes']"></textarea>
                                </div>
                            </div>


                        </div>
                        <div class="modal-footer justify-content-around">
                            <a href="javascript:void(0)" data-dismiss="modal" class="btn btn-outline-dark"><i class="fad fa-times-circle"></i> Batal</a>
                            <a href="javascript:void(0)" class="btn btn-outline-dark" @click="saveCustomer"><i class="fad fa-user-plus"></i> Tambah</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </nav>
</template>

<script>
import $ from "jquery"
import axios from "axios"

export default {
    name: "navigation",
    data(){
        return {
            carts: this.getCart,
            customers: [],
            selectedCustomer: {},
            selectedPayment: 0,
            menuSelected: "",
            addCustomer: {
                "name": "",
                "email": "",
                "mobilePhone": "",
                "billStreet": "",
                "billCity": "",
                "billProvince": "",
                "billZipCode": "",
                "notes": "",
            },
            bill: this.getTotalCart
        }
    },
    methods: {
        pay(){

            return axios.post('http://api-pos.beliayam.test/pay',
                {
                    "customerNo": this.selectedCustomer,
                    "paymentAmount": this.bill,
                    "carts": this.carts
                },
                {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("jwt")
                },    
            })
                .then(results => {

                    if(results['data']['s']){

                        $("#modal-payment").modal('hide')

                        this.getCustomers()

                        this.addCustomer = {
                            "name": "",
                            "email": "",
                            "mobilePhone": "",
                            "billStreet": "",
                            "billCity": "",
                            "billProvince": "",
                            "billZipCode": "",
                            "notes": "",
                        }

                        this.$store.dispatch('setClearCarts')
                        this.carts = []


                        this.$root.$emit('clearCarts')

                        this.$alertify.success("Berhasil Dibayarkan")
                    }
                }).catch(error => {
                        this.$alertify.error(error.response['data']['message'])
                    })
        },
        setNav(){

            $('#navigation_2_dropdown_1').on("click", function(){
                $('.dropdown-menu').toggleClass("active");
            });

            $('.dropdown-menu div div').on('click' , function(){	$('#navigation_2_dropdown_1').text($(this).text());
                $('.dropdown-menu').toggleClass("active");
            })

        },

        getCart(){

            return this.carts = this.$store.getters['getCart']

        },
        
        saveCustomer(){
            return axios.post('http://api-pos.beliayam.test/customers',
                {
                    "customer": this.addCustomer,
                },
                {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("jwt")
                },    
            })
                .then(results => {

                    if(results['data']['s']){

                        this.getCustomers()

                        $("#modal-add-customer").modal('hide')

                        this.addCustomer = {
                            "name": "",
                            "email": "",
                            "mobilePhone": "",
                            "billStreet": "",
                            "billCity": "",
                            "billProvince": "",
                            "billZipCode": "",
                            "notes": "",
                        }
                    }
                }).catch(error => {
                        this.$alertify.error(error.response['data']['message'])
                    })
        },
        
        getCustomers(){
            return axios.get('http://api-pos.beliayam.test/customers/52',{
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            })
                .then(results => {
                    this.customers = results.data['d']
                }).catch(error => {
                        this.$alertify.error(error.response['data']['message'])
                    })
        },
        openCart(){

            $("#modal-cart").modal('show')

            $("#modal-payment").modal('hide')

        },
        openModalAddCustomer(){

            $("#modal-add-customer").modal('show')

            $("#modal-payment").modal('hide')

        },
        openPayment(){

            this.getTotalCart()

            $("#modal-cart").modal('hide')

            this.getCustomers()

            $("#modal-payment").modal('show')

        },
        updateCart(id, type = "minus"){

            if (type === "minus"){

                return this.carts.filter(value => {
                    if (value['product']['id'] === id){
                        if (value['product']['quantity'] > 1){

                            value['product']['stock']++
                            return value['product']['quantity']--

                        }
                    }
                })


            }

            return this.carts.filter(value => {
                if (value['product']['id'] === id){
                    if (value['product']['stock'] > 0){

                        value['product']['stock']--
                        return value['product']['quantity']++

                    }
                }
            })

        },
        removeProduct(id){

            this.carts.filter(value => {
                if (value['productId'] === id){
                    return value['selected'] = false
                }
            })

            this.$store.dispatch('setRemoveProductOnCart', id)

        },
        setMenu(){

            let uri = location.pathname.substr(1).toString()

            switch (uri) {
                case "sales_report":
                    this.menuSelected = "Laporan Penjualan"
                    break
                case "customers":
                    this.menuSelected = "Pelanggan"
                    break
                case "stock":
                    this.menuSelected = "Persediaan"
                    break
                case "sale":
                    this.menuSelected = "Persediaan"
                    break
                case "":
                    this.menuSelected = "Beranda"
                    break
                default:
                    this.menuSelected = "Produk"
                    break
            }

        },
        closeMenu(){

            $(".dropdown-menu").removeClass("active")

        },
        logout(){
            
            axios.post('http://api-pos.beliayam.test/logout', {}, {
                
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("jwt")
                    }
                
            }).then( function(result) {

                localStorage.setItem('user', "")
                localStorage.setItem('jwt', "")

                if(result.data.message){
                    window.location.href = "/login"
                }
            })
        },


        checkRequestInput(id){

            return this.carts.filter((value) => {

                if(value['product']['id'] === id) {

                    if (value['product']['price'] === "") {

                        value['product']['price'] = value['product']['unitPrice']
                        alert("Minimal Data Dimasukkan Adalah 0 Rupiah, Tidak Boleh Kosong!")
                        return value['product']['unitPrice']
                    }

                    let data = {
                        "id": id,
                        "price": value['product']['price'],
                    }

                    return this.$store.dispatch('updatePriceOnCart', data)
                }

            })
        },

        getTotalCart(){

            return this.bill = this.$store.getters['getTotalCart']

        }
        
    },
    computed: {
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
    mounted() {
        this.setMenu()
    },

    created() {
        this.setNav()
        this.getCart()
    }
}
</script>

<style scoped>
    .nav {
        display: flex;
        padding: 2rem 0.8rem;
        background: white;
        justify-content: space-between;
        align-items: center;
        border-bottom-left-radius: 12%;
        border-bottom-right-radius: 12%;
    }
    .nav .select {
        position: relative;
    }
    .nav .select a {
        padding: 8px 16px;
        width: 150px;
        border: none;
        border-radius: 10px;
        text-decoration: none;
        background: rgba(0, 0, 0, 0.05);
        color: #1e0e62;
        font-weight: 600;
        font-size: 16px;
        display: block;
        transition: all 0.25s;
    }
    .nav .select a:before {
        font-family: "Font Awesome 5 Free";
        font-weight: 900;
        position: absolute;
        right: 10px;
        top: 10px;
        color: #1e0e62;
    }
    .nav .select .dropdown-menu {
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 1000;
        float: left;
        min-width: 10rem;
        padding: 0.5rem 0;
        margin: 0.125rem 0 0;
        font-size: 1rem;
        color: #212529;
        text-align: left;
        list-style: none;
        padding: 8px 16px;
        background: white;
        margin-top: 10px;
        border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.05) -3px 3px 6px, rgba(0, 0, 0, 0.055) -20px 20px 55px, rgba(255, 255, 255, 0.6) -2px 2px 2px 1px inset, rgba(255, 255, 255, 0.4) 2px 2px 3px 0px inset, rgba(0, 0, 0, 0.05) 1px 1px 2px 0px inset;
        display: none;
        transition: 0.25s opacity;
    }
    .nav .select .dropdown-menu.active {
        display: block;
    }
    .nav .select .dropdown-menu div {
        margin-bottom: 1em;
        font-weight: 600;
        color: #1e0e62;
        cursor: pointer;
        padding: 16px;
        border-bottom: 2px solid #1e0e6269;
    }
    .logo img{
        width: 8%;
    }
    .nav .login {
        position: relative;
    }
    .nav .login button {
        display: inline-block;
        height: 40px;
        padding: 0 15px;
        user-select: none;
        background: none;
        border: 2px solid #ebeaed;
        line-height: 36px;
        color: #1e0e62;
        font-size: 16px;
        vertical-align: top;
        border-radius: 50px;
        font-weight: 600;
        text-align: center;
        background: transparent;
        transition: 0.25s all;
        cursor: pointer;
    }
    .nav .login button:focus {
        outline: none;
    }
    .nav .login button:hover {
        border-color: #1e0e62;
    }
    .img-cart-container img{
        min-width: 6%;
        min-height: 6%;
    }
    .card-cart{
        padding: 2%;
        border-radius: 10px;
    }
    .logo a img{
        object-fit: cover;
    }
    .cart-title-product{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .iconDetails {
        margin-left: 2%;
        float: left;
        height: 100px;
        width: 140px;
        border-radius: 5px;
    }
    .container-card-product {
        width: 100%;
        height:auto;
        padding:1%;
        float:left;
    }
    h4{margin:0}
    .left-cart {
        float:left;
    }
    .right-cart {
        float:left;
        margin:0 0 0 20px;
        width: 68%;
    }
    .modal-body-cart{
        background-color: #e4e3e3;
    }
    .counter-cart{
        font-size: 24px;
    }

    .form-control-borderless{
        border-right: none;
        border-top: none;
        border-left: none;
    }

    .counter-button:hover{
        cursor: pointer;
    }

    @media only screen and (max-width: 600px) {
        .iconDetails {
            width: 75px;
            height: auto;
        }
    }

</style>
