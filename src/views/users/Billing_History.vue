<template>
    <div class="dashboard-body">
        <errorNav/>
        <div class="row">
            <sidenav class="col-2"/>
            <div class="col-10 content-section admin-dashboard-title">
                <nameNav :fname="user.fname" :lname="user.lname"/>
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
                        <table v-if="user.subscriptions.length > 0" class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th scope="col" class="title">#</th>
                                    <th scope="col" class="title">Invoice Id</th>
                                    <th scope="col" class="title"></th>
                                    <th scope="col" class="title">Payment Method</th>
                                    <th scope="col" class="title">Amount</th>
                                    <th scope="col" class="title">Paid</th>
                                    <th scope="col" class="title">Bank</th>
                                    <th scope="col" class="title">Plan</th>
                                    <th scope="col" class="title">Payment Date</th>
                                    <th scope="col" class="title">Created By</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(subscription, index) in user.subscriptions">
                                    <tr v-bind:key="index">
                                        <th scope="row">{{ index + 1 }}</th>
                                        <td><a :href="`${SERVER_URL}/${SERVER_INVOICE_DIR}/${subscription.invoicePDF}`" target="_blank">{{ subscription.invoiceId }}</a></td>
                                        <td><a class="edit-btn" href="">Edit</a></td>
                                        <td>{{ subscription.payment.paymentMethod.name }}</td>
                                        <td>{{ subscription.subscriptionPlan.totalPrice | formatPrice(subscription.payment.currency.iso3) }}</td>
                                        <td><span v-if="subscription.payment.isPaid" class="badge badge-success">Paid</span><span v-else class="badge badge-info">Pending</span></td>
                                        <td>{{ subscription.payment.bank != null ? subscription.payment.bank.iso3 : '-' }}</td>
                                        <td>{{ subscription.subscriptionPlan.name }}</td>
                                        <td>{{ subscription.payment.createdAt | formatDate  | getDateOnly }}</td>
                                        <td>{{ subscription.payment.createdBy.fname | capitalize }}</td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                        <emptyList message="User has no Billings" v-else/>
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
import nameNav from '../../components/Name_Nav.vue'
import emptyList from '../../components/Empty_List.vue'
import { GET_USER } from '../../store/action_types'
import { SERVER_URL, SERVER_INVOICE_DIR } from '../../utils/const'

export default {
    components: {
        sidenav,
        errorNav,
        usersNav,
        nameNav,
        emptyList
    },
    data() {
        return {
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
        getUser() {
            this.$store.dispatch(GET_USER, { id: this.$route.params.id })
        }
    },
    mounted() {
        this.getUser()
    }
}
</script>