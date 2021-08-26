import Vue from 'vue'
import App from './App.vue'

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

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
