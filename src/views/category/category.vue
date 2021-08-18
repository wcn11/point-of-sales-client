
<template>
    <div class="animate__animated animate__fadeInRight">

        <header class="card-header header-category">
            <h2>
                Kategori Ayam
            </h2>
        </header>



        <div class="row mt-5">

            <div class="col-md-3 col-sm-4" v-for="(category, index) in categories" :key="index">
                <div class="resource">

                    <div class="no-gutters">
                        <div class="w-100">
                            <router-link :to="{ name: 'products', params: {categoryId: category['id']}}"><img :src="getImage(category['slug'])" :alt="category['name']" class="img-fluid rounded"></router-link>
                        </div>
                        <div class="w100">
                                <router-link class="text-decoration-none text-dark" :to="{ name: 'products', params: {categoryId: category['id']}}">
                                    <h5 class="p-2">{{ category['name'] }} </h5>
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

    export default {
        name: "category",
        data(){
            return {
                categories: []
            }
        },
        methods: {
            getImage(slug){

                try {

                    return require(`./../../assets/images/categories/${slug}.jpeg`)

                }catch (e) {
                    return require(`./../../assets/images/categories/default.jpg`)
                }

                
            },
            getCategory() {
                axios.get(`${process.env.VUE_APP_BASE_HOST_API}/categories`,{
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("jwt")
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
                        }
                    }).catch(error => {
                        this.$alertify.error(error.response['data']['message'])
                    })
            }
        },
        created() {
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

    @media only screen and (max-width: 600px) {

    }

</style>
