import Vue from 'vue'
import VueNumeric from 'vue-numeric'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
const request = axios.create({
    baseURL: 'http://localhost:8080/ipa2/',
})
Vue.config.productionTip = false
Vue.use(VueAxios, request)
Vue.use(VueLazyLoad)
Vue.use(VueNumeric)
new Vue({
    router,
    store,
    vuetify,
    i18n,
    render: h => h(App),
}).$mount('#app')