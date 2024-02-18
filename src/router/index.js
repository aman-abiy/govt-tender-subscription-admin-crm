import Vue from 'vue'
import Router from 'vue-router'
import {
    LOGIN_ROUTE,
    DASHBOARD_ROUTE,
    USERS_ROUTE,
    SUBSCRIPTIONS_ROUTE,
    TENDERS_ROUTE,
    USERS_PROFILE_ROUTE,
    USERS_SUBSCRIPTIONS_ROUTE,
    USERS_BOOKMARKS_ROUTE,
    USERS_ACTIVITIES_ROUTE,
    USERS_BILLING_HISTORY_ROUTE,
    USERS_ALERT_EMAILS_ROUTE,
    USERS_ADD_SUBSCRIPTIONS_ROUTE,
    ADD_USER_ROUTE,
    USERS_SETTINGS_ROUTE,
    EDIT_USER_ROUTE,
    EDIT_USERS_SUBSCRIPTIONS_ROUTE,
    EDIT_TENDERS_ROUTE,
    SUBSCRIPTION_PLANS_ROUTE,
    ADD_SUBSCRIPTION_PLAN_ROUTE,
    BANK_ACCOUNTS_ROUTE,
    ADD_BANK_ACCOUNT_ROUTE,
    EDIT_SUBSCRIPTION_PLAN_ROUTE,
    EDIT_BANK_ACCOUNT_ROUTE,
    PAYMENT_METHODS_ROUTE,
    ADD_PAYMENT_METHOD_ROUTE,
    EDIT_PAYMENT_METHOD_ROUTE,
    PAYMENTS_ROUTE,
    COMMISSIONS_ROUTE,
    EMAILS_SENT_ROUTE,
} from '../utils/routes'
import { ifAuthDeny, ifNotAuthDeny } from './auth_guard'
import Dashboard from '../views/Dashboard'

Vue.use(Router)

const routes = [{
        path: '/',
        name: DASHBOARD_ROUTE,
        beforeEnter: ifNotAuthDeny,
        component: Dashboard
    },
    {
        path: '/login',
        name: LOGIN_ROUTE,
        beforeEnter: ifAuthDeny,
        component: () =>
            import ('../views/Login.vue')
    },
    {
        path: '/users',
        name: USERS_ROUTE,
        beforeEnter: ifNotAuthDeny,
        component: () =>
            import ('../views/users/Users.vue')
    },
    {
        path: '/users/add',
        name: ADD_USER_ROUTE,
        beforeEnter: ifNotAuthDeny,
        component: () =>
            import ('../views/users/Add_User.vue')
    },
    {
        path: '/users/edit/:id',
        name: EDIT_USER_ROUTE,
        beforeEnter: ifNotAuthDeny,
        component: () =>
            import ('../views/users/Edit_User.vue')
    },
    {
        path: '/users/profile/:id',
        name: USERS_PROFILE_ROUTE,
        beforeEnter: ifNotAuthDeny,
        component: () =>
            import ('../views/users/Profile.vue')
    },
    {
        path: '/users/subscriptions/:id',
        name: USERS_SUBSCRIPTIONS_ROUTE,
        beforeEnter: ifNotAuthDeny,
        component: () =>
            import ('../views/users/Subscriptions.vue')
    },
    {
        path: '/users/subscriptions/add/:id',
        name: USERS_ADD_SUBSCRIPTIONS_ROUTE,
        beforeEnter: ifNotAuthDeny,
        component: () =>
            import ('../views/users/Add_Subscription.vue')
    },
    {
        path: '/users/subscriptions/edit/:userId/:subscriptionId',
        name: EDIT_USERS_SUBSCRIPTIONS_ROUTE,
        beforeEnter: ifNotAuthDeny,
        component: () =>
            import ('../views/users/Edit_Subscription.vue')
    },
    {
        path: '/users/billing-history/:id',
        name: USERS_BILLING_HISTORY_ROUTE,
        beforeEnter: ifNotAuthDeny,
        component: () =>
            import ('../views/users/Billing_History.vue')
    },
    {
        path: '/users/alert-emails/:id',
        name: USERS_ALERT_EMAILS_ROUTE,
        beforeEnter: ifNotAuthDeny,
        component: () =>
            import ('../views/users/Alert_Emails.vue')
    },
    {
        path: '/users/bookmarks/:id',
        name: USERS_BOOKMARKS_ROUTE,
        beforeEnter: ifNotAuthDeny,
        component: () =>
            import ('../views/users/Bookmarks.vue')
    },
    {
        path: '/users/activities/:id',
        name: USERS_ACTIVITIES_ROUTE,
        beforeEnter: ifNotAuthDeny,
        component: () =>
            import ('../views/users/Activities.vue')
    },
    {
        path: '/users/settings/:id',
        name: USERS_SETTINGS_ROUTE,
        beforeEnter: ifNotAuthDeny,
        component: () =>
            import ('../views/users/Settings.vue')
    },
    {
        path: '/subscriptions',
        name: SUBSCRIPTIONS_ROUTE,
        beforeEnter: ifNotAuthDeny,
        component: () =>
            import ('../views/Subscriptions.vue')
    },
    {
        path: '/subscriptions-plans',
        name: SUBSCRIPTION_PLANS_ROUTE,
        beforeEnter: ifNotAuthDeny,
        component: () =>
            import ('../views/subscription_plans/Subscription_Plans.vue')
    },
    {
        path: '/subscriptions-plans/add',
        name: ADD_SUBSCRIPTION_PLAN_ROUTE,
        beforeEnter: ifNotAuthDeny,
        component: () =>
            import ('../views/subscription_plans/Add_Subscription_Plan.vue')
    },
    {
        path: '/subscriptions-plans/edit/:id',
        name: EDIT_SUBSCRIPTION_PLAN_ROUTE,
        beforeEnter: ifNotAuthDeny,
        component: () =>
            import ('../views/subscription_plans/Edit_Subscription_Plan.vue')
    },
    {
        path: '/tenders',
        name: TENDERS_ROUTE,
        beforeEnter: ifNotAuthDeny,
        component: () =>
            import ('../views/tenders/Tenders.vue')
    },
    {
        path: '/tenders/edit/:id',
        name: EDIT_TENDERS_ROUTE,
        beforeEnter: ifNotAuthDeny,
        component: () =>
            import ('../views/tenders/Edit_Tender.vue')
    },
    {
        path: '/bank-accounts',
        name: BANK_ACCOUNTS_ROUTE,
        beforeEnter: ifNotAuthDeny,
        component: () =>
            import ('../views/bank/Bank_Accounts.vue')
    },
    {
        path: '/bank-accounts/add',
        name: ADD_BANK_ACCOUNT_ROUTE,
        beforeEnter: ifNotAuthDeny,
        component: () =>
            import ('../views/bank/Add_Bank_Account.vue')
    },
    {
        path: '/bank-accounts/edit/:id',
        name: EDIT_BANK_ACCOUNT_ROUTE,
        beforeEnter: ifNotAuthDeny,
        component: () =>
            import ('../views/bank/Edit_Bank_Account.vue')
    },
    {
        path: '/payment-methods',
        name: PAYMENT_METHODS_ROUTE,
        beforeEnter: ifNotAuthDeny,
        component: () =>
            import ('../views/payment_method/Payment_Methods.vue')
    },
    {
        path: '/payment-methods/add',
        name: ADD_PAYMENT_METHOD_ROUTE,
        beforeEnter: ifNotAuthDeny,
        component: () =>
            import ('../views/payment_method/Add_Payment_Method.vue')
    },
    {
        path: '/payment-methods/edit/:id',
        name: EDIT_PAYMENT_METHOD_ROUTE,
        beforeEnter: ifNotAuthDeny,
        component: () =>
            import ('../views/payment_method/Edit_Payment_Method.vue')
    },
    {
        path: '/payments',
        name: PAYMENTS_ROUTE,
        beforeEnter: ifNotAuthDeny,
        component: () =>
            import ('../views/Payments.vue')
    },
    {
        path: '/commissions',
        name: COMMISSIONS_ROUTE,
        beforeEnter: ifNotAuthDeny,
        component: () =>
            import ('../views/Commissions.vue')
    },
    {
        path: '/emails-sent',
        name: EMAILS_SENT_ROUTE,
        beforeEnter: ifNotAuthDeny,
        component: () =>
            import ('../views/emails_sent/Emails_Sent.vue')
    },
]

// router.beforeResolve = updateAccount

const router = new Router({
    base: process.env.BASE_URL,
    routes
})

export default router