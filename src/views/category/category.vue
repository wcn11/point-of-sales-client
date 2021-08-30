
<template>
    <div class="animate__animated animate__fadeInRight">

        <header class="card-header header-category">
            <h2>
                Kategori Ayam
            </h2>
        </header>

        <div class="row mt-5" v-if="loading">

            <div class="col-md-3 col-sm-4" v-for="(count, index) in 8" :key="index">
                <div class="resource">

                    <VueContentLoading :width="210" :height="190" class="shrimmer-container">
                                    
                        <rect width="210" height="190"/>
                        <rect width="210" height="50" class="p-2"/>

                    </VueContentLoading>

                    <VueContentLoading :width="210" :height="50" class="shrimmer-container p-2">

                        <rect width="210" height="50" class="p-2"/>

                    </VueContentLoading>
                </div>
            </div>
        </div>

        <div class="row mt-5" v-else>

            <div class="col-md-3 col-sm-4" v-for="(category, index) in categories" :key="index">
                <div class="resource">

                    <div class="no-gutters">
                        <div class="w-100">
                            <router-link :to="{ name: 'products', params: {categoryId: category['id']}}">

                                <!-- <VueContentLoading :width="210" :height="150" class="shrimmer-container" v-if="loadingImageCategory">

                                    <rect width="210" height="150" class="p-2"/>

                                </VueContentLoading> -->

                                <img :src="getImage(category['slug'])" :alt="category['name']" class="img-fluid rounded w-100">

                            </router-link>
                        </div>
                        <div class="w-100">
                                <router-link class="text-decoration-none text-dark" :to="{ name: 'products', params: {categoryId: category['id']}}">
                                    <h5 class="p-2 category-title nowrap">{{ category['name'] }} </h5>
                                </router-link>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import axios from "axios"
import { VclFacebook, VclInstagram, VueContentLoading } from 'vue-content-loading';


    export default {
        name: "category",
        components: {
            VueContentLoading
        },
        data(){
            return {
                categories: [],
                loading: false,
                loadingImageCategory: false,
            }
        },
        methods: {
            getImage(slug){

                    this.loadingImageCategory = true

                try {

                    let image = require(`./../../assets/images/categories/${slug}.jpeg`)

                    this.loadingImageCategory = false

                    return image

                }catch (e) {

                    let image = require(`./../../assets/images/categories/default.jpg`)

                    this.loadingImageCategory = false

                    return image
                }

                
            },
            getCategory() {
                
                this.loading = !this.loading;

                if(this.loading){


                    axios.get(`${process.env.VUE_APP_BASE_HOST_API}/categories`,{
                            headers: {
                                "Authorization": "Bearer " + localStorage.getItem("jwt"),
                                "Content-type": "application/json",
                            }
                        }).then(result => {

                            this.categories = result.data
                            if(result.data){
                                this.result = result.data.filter(value => {
                                    switch (value['name']) {
                                        case "PARTING":
                                            value['slug'] = "parting"
                                            break;
                                        case "Ayam Broiler":
                                            value['slug'] = "broiler"
                                            break;
                                        case "Ayam Kampung":
                                            value['slug'] = "kampung"
                                            break;
                                        case "Ayam Pejantan":
                                            value['slug'] = "pejantan"
                                            break;
                                    
                                        default:
                                            value['slug'] = "merah"
                                            break;
                                    }
                                })

                                this.loading = !this.loading
                            }
                        }).catch(error => {
                            this.$alertify.error(error.response['data']['message'])
                        })

                }
            }
        },
        mounted() {
            this.getCategory()
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


    .header-category{
        text-align: center;
        background-color: white;
        border-radius: 10px;
        margin: auto;
        margin-top: 2%;
    }
    .resource {
        text-align: center;
        box-shadow: 0 2 px 10 px 0 rgba(0, 0, 0, 0.1);
        background-color: white;
        border-radius: 12px;
        justify-content: center;
        margin: auto;
        margin-bottom: 5%;
    }

    .no-gutters{
        box-shadow: 0px 2px 6px 0px grey;
        border-radius: 7px;
    }

    .shrimmer-container{
        border-radius: 10px;
    }

    .category-title{
        font-size: 3vh;
        white-space: nowrap;
    }

    .img-fluid{
        max-height: 150px;
    }

    @media only screen and (max-width: 576px) {

        .img-fluid{
            max-height: 150px;
        }
    }

    @media only screen and (max-width: 768px) {

        .img-fluid{
            max-height: 150px;
        }
    }

    @media only screen and (max-width: 992px) {

        .img-fluid{
            max-height: 150px;
        }
    }

    @media only screen and (max-width: 1200px) {

        .img-fluid{
            max-height: 230px;
        }
    }

</style>
