import Vue from 'vue'
import App from './App.vue'

window.$ = window.jQuery = require('./plugins/jquery.min')
require('./plugins/bootstrap.bundle')
import VueAlertify from 'vue-alertify';

import VueMeta from 'vue-meta'

Vue.config.productionTip = false

import router from './router'
import store from './store'

require('./plugins/css/bootstrap.min.css')

import styles from './fonts/css/all.min.css'
import animateCss from 'animate.css'

Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})


Vue.use(VueAlertify);
Vue.use(styles)
Vue.use(animateCss)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
