import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import './plugins/moment'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import ApexCharts from 'apexcharts'
import VueApexCharts from 'vue-apexcharts'
/* import VueMoment from 'vue-moment'
import moment from 'moment-timezone' */
const request = axios.create({
   /*  baseURL: 'https://hrvec.org/HRvec_api/', */
    baseURL: 'http://localhost:8080/HRvec_api/',
})
Vue.config.productionTip = false
Vue.use(VueAxios, request)
Vue.use(VueLazyLoad)
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

/* Vue.use(VueMoment, {
    moment,
}) */
new Vue({
    router,
    store,
    vuetify,   
    i18n,   
    render: h => h(App),
}).$mount('#app')