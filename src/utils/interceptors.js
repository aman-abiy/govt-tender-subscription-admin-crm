import axios from 'axios'
import store from '../store'
import {
    CLEAR_ERRORMSG,
    CLEAR_ACCOUNT_ISLOADING,
    CLEAR_USERS_ISLOADING,
    CLEAR_SUBSCRIPTIONS_ISLOADING,
    CLEAR_TENDERS_ISLOADING,
    CLEAR_SUBSCRIPTION_PLANS_ISLOADING,
    CLEAR_BANK_ISLOADING,
    CLEAR_PAYMENTS_ISLOADING,
    CLEAR_PAYMENT_METHOD_ISLOADING,
    CLEAR_STATS_ISLOADING,
    UPDATE_ERRORMSG,
    LOGOUT_LOCALLY
} from '../store/action_types'
import { SERVER_ERR_MSG } from './const'

const axiosInterceptors = () => {
    axios.interceptors.response.use((response) => {
        return response;
    }, function(error) {
        console.log('error => ', error)
        console.log('error.code => ', error.code === 'ECONNABORTED')
            // clear error messages
        store.dispatch(CLEAR_ERRORMSG)
            // clear isLoading states
        store.dispatch(CLEAR_ACCOUNT_ISLOADING)
        store.dispatch(CLEAR_USERS_ISLOADING)
        store.dispatch(CLEAR_SUBSCRIPTIONS_ISLOADING)
        store.dispatch(CLEAR_TENDERS_ISLOADING)
        store.dispatch(CLEAR_SUBSCRIPTION_PLANS_ISLOADING)
        store.dispatch(CLEAR_BANK_ISLOADING)
        store.dispatch(CLEAR_PAYMENTS_ISLOADING)
        store.dispatch(CLEAR_PAYMENT_METHOD_ISLOADING)
        store.dispatch(CLEAR_BANK_ISLOADING)
        store.dispatch(CLEAR_STATS_ISLOADING)

        // Do something with response error
        if (error.code === 'ECONNABORTED') {
            store.dispatch(UPDATE_ERRORMSG, { errorMsg: 'Error! Please check your connection. ECONNABORTED.' })
        }


        if (error.response.status === 401) {
            store.dispatch(UPDATE_ERRORMSG, { errorMsg: error.response.data.message })
            store.dispatch(LOGOUT_LOCALLY)
        }

        if (error.response.status === 403) {
            store.dispatch(UPDATE_ERRORMSG, { errorMsg: error.response.data.message })
        }

        if (error.response.status === 404) {
            store.dispatch(UPDATE_ERRORMSG, { errorMsg: error.response.data.message })
                // router.push({ name: '404' })
        }

        if (error.response.status === 409) {
            store.dispatch(UPDATE_ERRORMSG, { errorMsg: error.response.data.message })
        }

        if (error.response.status === 500) {
            store.dispatch(UPDATE_ERRORMSG, { errorMsg: error.response.data.message || SERVER_ERR_MSG })
        }
    });
}

export default axiosInterceptors