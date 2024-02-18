<template>
    <div class="sidenav">
        <br>
        <h5 class="logo">Alpha Tenders</h5>
        <hr>
        <ul class="">
            <li :class="[ route == DASHBOARD_ROUTE ? 'selected' : null, 'nav-items']"><router-link :to="{ name: DASHBOARD_ROUTE }" class="router-link"><font-awesome-icon icon="fa-solid fa-gauge" class="fa"/>Dashboard</router-link></li>
            <li :class="[ [USERS_ROUTE, USERS_PROFILE_ROUTE, USERS_SUBSCRIPTIONS_ROUTE, USERS_BOOKMARKS_ROUTE, USERS_SUBSCRIPTIONS_ROUTE, USERS_ADD_SUBSCRIPTIONS_ROUTE, ADD_USER_ROUTE, USERS_ACTIVITIES_ROUTE, USERS_SETTINGS_ROUTE, EDIT_USER_ROUTE, EDIT_USERS_SUBSCRIPTIONS_ROUTE].includes(route) ? 'selected' : null, 'nav-items']"><router-link :to="{ name: USERS_ROUTE }" class="router-link"><font-awesome-icon icon="fa-regular fa-user" class="fa"/>Users</router-link></li>
            <li :class="[ route == SUBSCRIPTIONS_ROUTE ? 'selected' : null, 'nav-items']"><router-link :to="{ name: SUBSCRIPTIONS_ROUTE }" class="router-link"><font-awesome-icon icon="fa-regular fa-id-badge" class="fa"/>Subscriptions</router-link></li>
            <li :class="[ [TENDERS_ROUTE, EDIT_TENDERS_ROUTE].includes(route) ? 'selected' : null, 'nav-items']"><router-link :to="{ name: TENDERS_ROUTE }" class="router-link"><font-awesome-icon icon="fa-regular fa-newspaper" class="fa"/>Tenders</router-link></li>
            <li :class="[ [EMAILS_SENT_ROUTE].includes(route) ? 'selected' : null, 'nav-items']"><router-link :to="{ name: EMAILS_SENT_ROUTE }" class="router-link"><font-awesome-icon icon="fa-solid fa-envelope-circle-check" class="fa"/>Emails Sent</router-link></li>
            <li :class="[ [BANK_ACCOUNTS_ROUTE, ADD_BANK_ACCOUNT_ROUTE, EDIT_BANK_ACCOUNT_ROUTE].includes(route) ? 'selected' : null, 'nav-items']"><router-link :to="{ name: BANK_ACCOUNTS_ROUTE }" class="router-link"><font-awesome-icon icon="fa-solid fa-building-columns" class="fa"/>Bank Accounts</router-link></li>
            <li :class="[ [PAYMENTS_ROUTE].includes(route) ? 'selected' : null, 'nav-items']"><router-link :to="{ name: PAYMENTS_ROUTE }" class="router-link"><font-awesome-icon icon="fa-solid fa-money-check-dollar" class="fa"/>Payments</router-link></li>
            <li :class="[ [COMMISSIONS_ROUTE].includes(route) ? 'selected' : null, 'nav-items']"><router-link :to="{ name: COMMISSIONS_ROUTE }" class="router-link"><font-awesome-icon icon="fa-solid fa-hand-holding-dollar" class="fa"/>Commissions</router-link></li>
            <li class="nav-items"><font-awesome-icon icon="fa-solid fa-code-branch" class="fa"/>Categories</li>
            <li class="nav-items"><font-awesome-icon icon="fa-solid fa-language" class="fa"/>Languages</li>
            <li class="nav-items"><font-awesome-icon icon="fa-solid fa-earth-africa" class="fa"/>Regions</li>
            <li class="nav-items"><font-awesome-icon icon="fa-regular fa-map" class="fa"/>Tender Sources</li>
            <li :class="[ [SUBSCRIPTION_PLANS_ROUTE, ADD_SUBSCRIPTION_PLAN_ROUTE, EDIT_SUBSCRIPTION_PLAN_ROUTE].includes(route) ? 'selected' : null, 'nav-items']"><router-link :to="{ name: SUBSCRIPTION_PLANS_ROUTE }" class="router-link"><font-awesome-icon icon="fa-solid fa-cubes" class="fa"/>Subscription Plans</router-link></li>
            <li :class="[ [PAYMENT_METHODS_ROUTE].includes(route) ? 'selected' : null, 'nav-items']"><router-link :to="{ name: PAYMENT_METHODS_ROUTE }" class="router-link"><font-awesome-icon icon="fa-regular fa-credit-card" class="fa"/>Payment Methods</router-link></li>
        </ul>
        <div class="footer">
            <p class="signed-in-user">{{ account.fname }}</p>
            <p v-on:click="logout"><font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" class="fa"/> Logout</p>
        </div>
    </div>
</template>
<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGauge, faEnvelopeCircleCheck, faBuildingColumns, faMoneyCheckDollar, faCodeBranch, faLanguage, faEarthAfrica, faCubes, faArrowRightFromBracket, faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons'
import { faUser, faIdBadge, faNewspaper, faMap, faCreditCard } from '@fortawesome/free-regular-svg-icons'
library.add(faGauge, faUser, faIdBadge, faNewspaper, faEnvelopeCircleCheck, faBuildingColumns, faMoneyCheckDollar, faCodeBranch, faLanguage, faEarthAfrica, faMap, faCubes, faCreditCard, faArrowRightFromBracket, faHandHoldingDollar)

import { LOGOUT } from '../store/action_types'
import { 
    DASHBOARD_ROUTE,
    USERS_ROUTE,
    SUBSCRIPTIONS_ROUTE,
    TENDERS_ROUTE,
    USERS_PROFILE_ROUTE,
    USERS_BOOKMARKS_ROUTE,
    USERS_SUBSCRIPTIONS_ROUTE,
    USERS_ADD_SUBSCRIPTIONS_ROUTE,
    ADD_USER_ROUTE,
    USERS_ACTIVITIES_ROUTE,
    USERS_SETTINGS_ROUTE,
    EDIT_USER_ROUTE,
    EDIT_USERS_SUBSCRIPTIONS_ROUTE,
    EDIT_TENDERS_ROUTE,
    SUBSCRIPTION_PLANS_ROUTE,
    ADD_SUBSCRIPTION_PLAN_ROUTE,
    BANK_ACCOUNTS_ROUTE,
    ADD_BANK_ACCOUNT_ROUTE,
    EDIT_BANK_ACCOUNT_ROUTE,
    EDIT_SUBSCRIPTION_PLAN_ROUTE,
    PAYMENT_METHODS_ROUTE,
    PAYMENTS_ROUTE,
    COMMISSIONS_ROUTE,
    EMAILS_SENT_ROUTE
} from '../utils/routes'
export default {
    data() {
        return {
            DASHBOARD_ROUTE,
            USERS_ROUTE,
            SUBSCRIPTIONS_ROUTE,
            TENDERS_ROUTE,
            USERS_PROFILE_ROUTE,
            USERS_BOOKMARKS_ROUTE,
            USERS_SUBSCRIPTIONS_ROUTE,
            USERS_ADD_SUBSCRIPTIONS_ROUTE,
            ADD_USER_ROUTE,
            USERS_ACTIVITIES_ROUTE,
            USERS_SETTINGS_ROUTE,
            EDIT_USER_ROUTE,
            EDIT_USERS_SUBSCRIPTIONS_ROUTE,
            EDIT_TENDERS_ROUTE,
            SUBSCRIPTION_PLANS_ROUTE,
            ADD_SUBSCRIPTION_PLAN_ROUTE,
            BANK_ACCOUNTS_ROUTE,
            ADD_BANK_ACCOUNT_ROUTE,
            EDIT_BANK_ACCOUNT_ROUTE,
            EDIT_SUBSCRIPTION_PLAN_ROUTE,
            PAYMENT_METHODS_ROUTE,
            PAYMENTS_ROUTE,
            COMMISSIONS_ROUTE,
            EMAILS_SENT_ROUTE
        }
    },
    computed: {
        route() {
            return this.$route.name
        },
        account() {
            return this.$store.getters.account.data
        }
    },
    methods: {
        logout() {
            this.$store.dispatch(LOGOUT)
        }
    }
}
</script>