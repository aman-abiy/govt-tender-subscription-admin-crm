import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './filter/index'
import { AXIOS_TIMEOUT } from './utils/const';
import { ValidationProvider } from 'vee-validate';
import { ValidationObserver } from 'vee-validate';
import axiosInterceptors from './utils/interceptors';
import MazUi from "maz-ui";
import 'maz-ui/lib/css/index.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { RichTextEditorPlugin } from '@syncfusion/ej2-vue-richtexteditor'
import vPagination from 'vue-plain-pagination'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

console.log('ENV', process.env.NODE_ENV == 'development' ? process.env.VUE_APP_DEV_SERVER_URL : process.env.VUE_APP_SERVER_URL)

axios.defaults.baseURL = `${process.env.NODE_ENV == 'development' ? process.env.VUE_APP_DEV_SERVER_URL : process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_VERSION}`
axios.defaults.headers = {
    "Content-type": "application/json",
    "Authorization": `Bearer ${store.getters.sessionToken}`
}
axios.defaults.timeout = AXIOS_TIMEOUT

axiosInterceptors()

Vue.use(MazUi);
Vue.use(VueToast);
Vue.use(vPagination)
Vue.use(RichTextEditorPlugin);
Vue.component('v-pagination', vPagination)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

Vue.config.productionTip = false
Vue.config.isCustomElement = tag => tag.startsWith('smart-');

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')