<template>
    <div class="">

        <header class="card-header header-category" v-if="products">
            <h2 class="headline">
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

            <!-- <div class="col-md-3 col-sm-4 resource-container">
                <div class="card card-container">
                    <div class="text-center">
                        <VueContentLoading :width="210" :height="130" class="shrimmer-container p-2">
                            <rect width="210" height="130"/>
                        </VueContentLoading>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title card-title-product">{{ product['name'] }}</h5>
                        <h6 class="price">{{ product['unitPrice'] | formatMoney }}</h6>
                        <div class="d-flex justify-content-center" v-if="isProductOnCart(product['id']) == false">
                            <div class="btn-group w-100" role="group">
                                <button type="button" :disabled="product['stock'] <= 0" class="btn btn-secondary" @click="addProduct($event, product)"><i class="fad fa-cart-plus"></i> Tambahkan</button>
                            </div>
                        </div>
                        <div class="w-100 counter-cart text-center" v-else>
                            <span @click="updateCart(product['id'])" class="counter"><i class="fad fa-minus-circle"></i></span>
                            <span>{{ getQuantity(product['id']) }}</span>
                            <span @click="updateCart(product['id'], 'plus')" class="counter"><i class="fad fa-plus-circle"></i></span>
                        </div>
                    </div>
                </div>
            </div> -->

            <div class="col-md-3 col-sm-4 resource-container" v-for="(product, index) in products" :key="index">

                <div class="card card-container">
                    <div class="text-center">
                        <img :src="require('./../../assets/images/categories/default.jpg')" class="card-img-top" alt="Gambar Ayam">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title card-title-product">{{ product['name'] }}</h5>

                        <h6 class="price">{{ product['unitPrice'] | formatMoney }}</h6>

                        <div class="d-flex justify-content-center" v-if="isProductOnCart(product) == false">
                            <div class="btn-group w-100" role="group">
                                <button type="button" :disabled="product['stock'] <= 0" class="btn btn-secondary" @click="addProduct($event, product)"><i class="fad fa-cart-plus"></i> Tambahkan</button>
                            </div>
                        </div>

                        <div class="w-100 counter-cart text-center" v-else>
                            <span @click="updateCart(product['id'])" class="counter"><i class="fad fa-minus-circle"></i></span>
                            <span>{{ getQuantity(product['id']) }}</span>
                            <span @click="updateCart(product['id'], 'plus')" class="counter"><i class="fad fa-plus-circle"></i></span>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="modal fade" id="openModalRemoveProduct" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered modal-static">
                <div class="modal-content modal-bottom">
                    <div class="modal-body">
                        <div class="text-center">
                            <h3>
                                Hapus Produk ?
                            </h3>
                        </div>
                        <button class="btn btn-danger w-100" @click="removeProduct(selectedProduct)">Hapus</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import $ from "jquery"
// import { VueContentLoading } from 'vue-content-loading';
export default {
    name: "product",
    metaInfo: {
      titleTemplate: 'Produk',
      htmlAttrs: {
        lang: 'en',
        amp: true
      }
    },
    components: {
        // VueContentLoading
    },
    data(){
        return {
            products: [],
            search: "",
            selectedProduct: 0,
            cart: this.getCart(),
        }
    },
    methods: {
        getProducts(){
          return axios.get(`${process.env.VUE_APP_BASE_HOST_API}/products/${this.$route.params['categoryId']}`,{
              headers: {
                  "Authorization": "Bearer " + localStorage.getItem("jwt")
              }
          })
            .then(results => {
                this.products = results['data'].map(value => {
                    value['quantity'] = 1
                    value['stock'] = 1
                    value['selected'] = false
                    document.querySelector('.headline').innerHTML = value['itemCategory']['name']
                    return value
                })
            }).catch(error => {
                        this.$alertify.error(error.response['data']['message'])
                        if(error.response['data']['redirect']){
                            window.location = "/not-found"
                        }
                    })
        },
        openModalRemoveProduct(type = "show"){
          $("#openModalRemoveProduct").modal(type)
        },
        addProduct(event, product){
          axios.get(`${process.env.VUE_APP_BASE_HOST_API}/add-product/${product['no']}`,{
              headers: {
                  "Authorization": "Bearer " + localStorage.getItem("jwt")
              }
          })
            .then(results => {
                if(results['data']['s']){
                    if(results['data']['d']['availableStock'] <= 0){
                        return this.products.filter(valueproduct => {
                            if(valueproduct['id'] === product['id']){
                                event.target.innerHTML = "Stok Habis"
                                event.target.className += " bg-danger";
                                return valueproduct['stock'] = 0
                            }
                            
                        })
                        
                    }else{
                            this.products.map(valueProduct => {
                            if(valueProduct['id'] === product['id']){
                                product['additionalPrice'] = 0
                                product['price'] = product['unitPrice']
                                product['stock'] = results['data']['d']['availableStock'] - 1
                                this.$store.dispatch('addProductToCart', product)
                                valueProduct['selected'] = true
                                console.log(product)
                                return 
                            }
                            return 
                        })
                    }
                }
            }).catch(error => {
                console.error(error)
                        // this.$alertify.error(error.response['data']['message'])
                    })
        },
        removeProduct(id){
            this.cart.filter(value => {
                if (value['id'] === id){
                    return value['selected'] = false
                }
            })
            this.openModalRemoveProduct('hide')
            this.$store.dispatch('setRemoveProductOnCart', id)
        },
        updateCart(id, type = "minus"){
            if (type === "minus"){
                 return this.cart.filter(value => {
                     
                    if (value['id'] === id){
                        if (value['quantity'] > 1){
                            value['stock']++
                            return value['quantity']--
                        }
                        if (value['quantity'] === 1){
                            this.selectedProduct = id
                            this.openModalRemoveProduct()
                            return
                        }
                    }
                })
            }
            return this.cart.filter(value => {
                if (value['id'] === id){
                    if (value['stock'] > 0){
                        value['stock']--
                        return value['quantity']++
                    }
                }
            })
        },
        getCart(){
        
            return this.cart = this.$store.getters['getCart']
        
        },
        isProductOnCart(product){
            return this.cart.filter(value => {
                return value['id'] === product.id
            })
        },
        getQuantity(id){
            let quantity = this.cart.filter(value => {
                if(value['id'] === id){
                    return value['quantity']
                }
            })
            return quantity[0]['quantity']
        },
        clearCarts(){
            this.cart = []
        }
    },
    computed: {
        searchInput(){
            if(this.search){
                return this.products.filter((item)=>{
                    console.log(item.name.toLowerCase().includes(this.search.toLowerCase()))
                })
            }else{
                return this.search;
            }
        },
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
        this.$root.$on('clearCarts', this.clearCarts)
    },
    created() {
        this.getProducts()
    }
}
</script>

<style scoped>
    .shrimmer-container{
        border-radius: 10px;
    }
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
    .counter:hover{
        cursor: pointer;
    }
    .counter-cart{
        font-size: 25px;
    }
    .card-container{
        min-height: 100%;
        max-height: 100%;
        border-radius: 10px;
    }
    .card-img-top{
        width: 100%;
        object-fit: cover;
        height: 155px; 
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
    .card-title-product{
        white-space: pre-wrap;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        min-height: 48px;
        max-height: 48px;
        -webkit-box-orient: vertical;
    }
    .price{
        font-size: 25px;
        font-weight: bold;
    }
    @media only screen and (max-width: 600px) {
        .modal-bottom{
            position: fixed;
            bottom: 0;
        }
        .modal-dialog{
            margin: 0;
        }
    }
</style>