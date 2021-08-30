<template>
  <div>


  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6 login-section-wrapper">
          <div class="brand-wrapper">
            <img :src="require('../../assets/images/logo_navbar.png')" alt="Beliayam.com" class="logo">
          </div>
          <div class="login-wrapper my-auto">
            <h1 class="login-title text-center">Masuk</h1>
            <form action="#!">
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" name="email" v-model="email" id="email" class="form-control" placeholder="email@example.com">
              </div>
              <div class="form-group mb-4">
                <label for="password">Password</label>
                <input type="password" v-model="password" name="password" id="password" class="form-control" placeholder="masukan password anda">
              </div>
              <input name="login" id="login" @click="submit" class="btn btn-block login-btn" type="button" value="Login">
              
            </form>
            <!-- <a href="#!" class="forgot-password-link">Forgot password?</a>
            <p class="login-wrapper-footer-text">Don't have an account? <a href="#!" class="text-reset">Register here</a></p> -->
          </div>
        </div>
        <div class="col-sm-6 px-0 d-none d-sm-block image-container">
          <img :src="require('../../assets/logo.png')" alt="login image" class="login-img">
        </div>
      </div>
    </div>
  </main>

  </div>

</template>

<script>
import axios from 'axios';
require('../../assets/css/login.css')

export default {
    name: "login.vue",
    metaInfo: {
      titleTemplate: 'Masuk',
      htmlAttrs: {
        lang: 'en',
        amp: true
      }
    },
    data(){
        return {
            email: "",
            password: "",
        }
    },
    methods: {
        submit() {
            axios.post(`${process.env.VUE_APP_BASE_HOST_API}/login`,{
                "email": this.email,
                "password": this.password,
            }).then(result => {

                let data = result.data

                localStorage.setItem('jwt', data['token']['access_token'])

                        if (localStorage.getItem('jwt') != null){

                            if(this.$route.params.nextUrl != null){
                                this.$router.push(this.$route.params.nextUrl)
                            }
                            else {
                                window.location = "/"
                            }
                        }
            }).catch(error => {
                console.log(error.response)
                this.$alertify.error(error.response['data']['message'])

                this.email = ""
                this.password = ""
            })

        },
        removeNav(){
            document.querySelector("nav").style.display = "none"
        }
    },
    mounted() {
        this.removeNav()
    }
}
</script>

<style>
    nav {
        display: none;
    }
    .image-container{
        background-color: red;
    }
    .login-img{
        object-fit: contain;
    }
    .main-content{
        width: 50%;
        border-radius: 20px;
        box-shadow: 0 5px 5px rgba(0,0,0,.4);
        margin: 5em auto;
        display: flex;
    }
    .company__info{
        background-color: #008080;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #fff;
    }
    .fa-android{
        font-size:3em;
    }
    .row > h2{
        color:#008080;
    }
    .login_form{
        background-color: #fff;
        border-top-right-radius:20px;
        border-bottom-right-radius:20px;
        border-top:1px solid #ccc;
        border-right:1px solid #ccc;
    }
    form{
        padding: 0 2em;
    }
    .form__input{
        width: 100%;
        border:0px solid transparent;
        border-radius: 0;
        border-bottom: 1px solid #aaa;
        padding: 1em .5em .5em;
        padding-left: 2em;
        outline:none;
        margin:1.5em auto;
        transition: all .5s ease;
    }
    .form__input:focus{
        border-bottom-color: #008080;
        box-shadow: 0 0 5px rgba(0,80,80,.4);
        border-radius: 4px;
    }
    .btn{
        transition: all .5s ease;
        width: 70%;
        border-radius: 30px;
        color:#008080;
        font-weight: 600;
        background-color: #fff;
        border: 1px solid #008080;
        margin-top: 1.5em;
        margin-bottom: 1em;
    }
    .btn:hover, .btn:focus{
        background-color: #008080;
        color:#fff;
    }
    @media screen and (max-width: 640px) {
        .main-content{width: 90%;}
        .company__info{
            display: none;
        }
        .login_form{
            border-top-left-radius:20px;
            border-bottom-left-radius:20px;
        }
    }
    @media screen and (min-width: 642px) and (max-width:800px){
        .main-content{width: 70%;}
    }
</style>
