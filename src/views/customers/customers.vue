<template>
    <div>

        <header class="card-header header-category">
            <h2>
                Pelanggan
            </h2>
        </header>

        <aside class="card-header header-category">
            <div class="form-group row m-auto">
                <label for="inputPassword" class="col-sm-2 col-form-label">Cari Pelanggan...</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" v-model="search" id="inputPassword" placeholder="Cari Pelanggan...">
                </div>
            </div>
        </aside>

        <div class="row mt-5">

            <div class="col-md-3 col-sm-4 resource-container" v-for="(customer, index) in customers" :key="index">
                <div class="resource">

                    <div class="row no-gutters">
                        <div class="left col-md-3">
                            <a href="javascript:void(0)"><img :src="customer" alt="Foto Customer" class="img-fluid rounded"></a>
                        </div>
                        <div class="right col-md-8">
                            <h5>{{ customer['username'] }}</h5>
                            <h6>{{ customer['email'] }}</h6>
                            <p>{{ customer['phone'] }}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="button-add-user">
            <button class="btn btn-info rounded-circle"><i class="fad fa-user-plus"></i></button>
        </div>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "product",
    data(){
        return {
            products: [],
            customers: [],
            search: ""
        }
    },
    methods: {
        getCustomers(){
            return axios.get('https://fakestoreapi.com/users')
                .then(results => {
                    this.customers = results.data
                })
        },
    },
    created() {
        this.getCustomers()
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
    .button-add-user{
        position: fixed;
        bottom: 5%;
        right: 5%;
    }

</style>
