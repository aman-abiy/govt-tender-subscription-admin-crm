import store from '../store';
import router from '../router'
import { LOGIN_ROUTE } from '../utils/routes'
import {
    UPDATE_ACCOUNT,
    CLEAR_ERRORMSG,
    CLEAR_ACCOUNT_ISLOADING,
    CLEAR_USERS_ISLOADING,
    CLEAR_SUBSCRIPTIONS_ISLOADING,
    CLEAR_TENDERS_ISLOADING,
    CLEAR_SUBSCRIPTION_PLANS_ISLOADING,
    CLEAR_BANK_ISLOADING,
    CLEAR_PAYMENTS_ISLOADING,
    CLEAR_PAYMENT_METHOD_ISLOADING,
    CLEAR_EMAILS_SENT_ISLOADING
} from '../store/action_types'

export const ifNotAuthDeny = (to, from, next) => {
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
    store.dispatch(CLEAR_EMAILS_SENT_ISLOADING)

    if (store.getters.sessionToken == null || store.getters.account.data == null) {
        router.push({ name: LOGIN_ROUTE })
        return
    }
    // if user is logged in make a call to update user account on each authorized route visit
    store.dispatch(UPDATE_ACCOUNT)
    next();
}


export const ifAuthDeny = (to, from, next) => {
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
    store.dispatch(CLEAR_EMAILS_SENT_ISLOADING)

    if (store.getters.sessionToken != null && store.getters.account.data != null) {
        router.push(from.fullPath)
        return
    }
    next();
}