import Vue from 'vue'
import App from './App.vue'

import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

import router from './router'
import store from './store'

import VueMeta from 'vue-meta'

import jquery from 'jquery'
window.jQuery = jquery
window.$ = window.jQuery
import VueTypedJs from 'vue-typed-js'
import epicSpinner from "epic-spinners"
import bootstrap from 'bootstrap'


import VueAlertify from 'vue-alertify';
require('./plugins/css/bootstrap.min.css')

// css
import styles from './fonts/css/all.min.css'
import animateCss from 'animate.css'

Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})

Vue.use(VueTypedJs)
Vue.use(VueAlertify);
Vue.use(styles)
Vue.use(animateCss)

Vue.config.productionTip = false

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: "2ad75c76131decfaff1d",
  cluster: "mt1",
  forceTLS: false,
});

new Vue({
  router,
  store,
  data: {
    loading: false,
  },
  created() {
    window.Echo.channel('new-order', function (e) {
      console.log('new order')
    })
    // .listen('newOrder', (e) => {
    //   console.log("adaaa")
    //   console.log(e)
    //   alert('123')
    // });
  },
  render: h => h(App),
}).$mount('#app')