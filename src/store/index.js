import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import account from './modules/account'
import error from './modules/error'
import users from './modules/users'
import subscriptions from './modules/subscriptions'
import tenders from './modules/tenders'
import subscriptionPlan from './modules/subscription_plans'
import bank from './modules/bank'
import paymentMethod from './modules/payment_methods'
import currency from './modules/currency'
import category from './modules/category'
import region from './modules/region'
import payment from './modules/payments'
import commissions from './modules/commissions'
import emailsSent from './modules/emails_sent'
import stats from './modules/stats'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        account,
        error,
        users,
        subscriptions,
        tenders,
        subscriptionPlan,
        bank,
        paymentMethod,
        currency,
        category,
        region,
        payment,
        commissions,
        emailsSent,
        stats
    },
    state: {

    },
    mutations: {

    },
    actions: {

    },
    plugins: [createPersistedState()]
})