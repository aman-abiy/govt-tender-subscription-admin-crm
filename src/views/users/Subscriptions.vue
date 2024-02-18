<template>
    <div class="dashboard-body">
        <errorNav/>
        <div class="row">
            <sidenav class="col-2"/>
            <div class="col-10 content-section admin-dashboard-title">
                <div class="card title-card">
                    <div class="card-body">
                        <div class="row">
                            <h4 class="col-12">{{ user.fname | capitalize }} {{ user.lname | capitalize }}</h4>
                        </div>
                    </div>
                </div>
                <usersNav/>
                <div class="card">
                    <div class="card-body">
                        <div v-if="userIsLoading" class="alert loading-alert" role="alert">
                            <div class="row">
                                <div class="spinner-border" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <div class="col-3">
                                    Loading...
                                </div>
                            </div>
                        </div>
                        <router-link v-if="(user.hasActiveSubscription && user.pendingSubscription == null)" :to="{ name: USERS_ADD_SUBSCRIPTIONS_ROUTE }" class="btn btn-outline-secondary add-subscription-btn">Add Pending Subscription</router-link>
                        <router-link v-if="(!user.hasActiveSubscription && user.pendingSubscription == null)" :to="{ name: USERS_ADD_SUBSCRIPTIONS_ROUTE }" class="btn btn-outline-primary add-subscription-btn">Add Subscription</router-link>
                        <br>
                        <hr>
                        <table v-if="user.subscriptions.length > 0" class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th scope="col" class="title">#</th>
                                    <th scope="col" class="title">Invoice Id</th>
                                    <th scope="col" class="title"></th>
                                    <th scope="col" class="title">Payment Method</th>
                                    <th scope="col" class="title">Paid</th>
                                    <th scope="col" class="title">Bank</th>
                                    <th scope="col" class="title">Status</th>
                                    <th scope="col" class="title">Plan</th>
                                    <th scope="col" class="title">Start Date</th>
                                    <th scope="col" class="title">End Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(subscription, index) in user.subscriptions">
                                    <tr v-bind:key="index">
                                        <th scope="row">{{ index + 1 }}</th>
                                        <td><a :href="`${SERVER_URL}/${SERVER_INVOICE_DIR}/${subscription.invoicePDF}`" target="_blank">{{ subscription.invoiceId }}</a></td>
                                        <td><router-link :to="{ name: EDIT_USERS_SUBSCRIPTIONS_ROUTE, params: { userId: user._id, subscriptionId: subscription._id } }" class="edit-btn" href="">Edit</router-link></td>
                                        <td>{{ subscription.payment.paymentMethod.name }}</td>
                                        <td><span v-if="subscription.payment.isPaid" class="badge badge-success">Paid</span><span v-else class="badge badge-info">Pending</span></td>
                                        <td>{{ subscription.payment.bank != null ? subscription.payment.bank.iso3 : '-' }}</td>
                                        <td><span :class="[subscription.isActive ? 'badge-success' : subscription.isPending ? 'badge-secondary' : (!subscription.isActive && !subscription.isPending) ? 'badge-danger' : null, 'badge']">{{ getUserSubscriptionStatus(subscription.isActive, subscription.isPending) }}</span></td>
                                        <td>{{ subscription.subscriptionPlan.name }}</td>
                                        <td>{{ subscription.startDate | formatDate  | getDateOnly }}</td>
                                        <td>{{ subscription.endDate | formatDate  | getDateOnly }}</td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                        <emptyList message="User has no subscription" v-else/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import sidenav from '../../components/Sidenav.vue'
import errorNav from '../../components/Error_Nav.vue'
import usersNav from '../../components/Users_Nav.vue'
import emptyList from '../../components/Empty_List.vue'
import { USERS_ADD_SUBSCRIPTIONS_ROUTE, EDIT_USERS_SUBSCRIPTIONS_ROUTE } from '../../utils/routes'
import { GET_USER, TOGGLE_USER_ACTIVE_STATUS } from '../../store/action_types'
import { USER_SUBSCRIPTION_ACTIVE, USER_SUBSCRIPTION_PENDING, USER_SUBSCRIPTION_EXPIRED, SERVER_URL, SERVER_INVOICE_DIR } from '../../utils/const'

export default {
    components: {
        sidenav,
        errorNav,
        usersNav,
        emptyList
    },
    data() {
        return {
            USER_SUBSCRIPTION_ACTIVE,
            USER_SUBSCRIPTION_PENDING,
            USER_SUBSCRIPTION_EXPIRED,
            USERS_ADD_SUBSCRIPTIONS_ROUTE,
            EDIT_USERS_SUBSCRIPTIONS_ROUTE,
            SERVER_URL,
            SERVER_INVOICE_DIR
        }
    },
    computed: {
        user() {
            return this.$store.getters.user.data
        },
        userIsLoading() {
            return this.$store.getters.user.isLoading
        }
    },
    methods: {
        changeUserActiveStatus(id) {
            this.$store.dispatch(TOGGLE_USER_ACTIVE_STATUS, { _id: id })
        },
        getUser() {
            this.$store.dispatch(GET_USER, { id: this.$route.params.id })
        },
        getUserSubscriptionStatus(isActive, isPending) {
            if(isActive) {
                return USER_SUBSCRIPTION_ACTIVE
            } else if (isPending) {
                return USER_SUBSCRIPTION_PENDING
            } else if(!isActive && !isPending) {
                return USER_SUBSCRIPTION_EXPIRED
            }
        }
    },
    mounted() {
        this.getUser()
    }
}
</script>