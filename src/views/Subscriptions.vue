<template>
    <div class="dashboard-body">
        <errorNav/>
        <div class="row">
            <sidenav class="col-2"/>
            <div class="col-10 content-section admin-dashboard-title">
                <div class="card title-card">
                    <div class="card-body">
                        <div class="row">
                            <h4 class="col-3">Subscriptions <span v-if="subscriptionsMetaData" class="count">({{ subscriptionsMetaData.total }})</span></h4>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex flex-wrap">
                            <div class="filter-options">
                                <input class="form-control" type="email" placeholder="Name" aria-label="Search">
                            </div>
                            <div class="filter-options">
                                <input class="form-control" type="email" placeholder="Email" aria-label="Search">
                            </div>
                            <div class="filter-options">
                                <div class="dropdown">
                                    <button class="btn text-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Role
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item" href="#">User</a>
                                        <a class="dropdown-item" href="#">Admin</a>
                                        <a class="dropdown-item" href="#">Sales Coordinator</a>
                                        <a class="dropdown-item" href="#">Encoder</a>
                                    </div>
                                </div>
                            </div>
                            <div class="filter-options">
                                <div class="dropdown">
                                    <button class="btn text-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Subscription Expiry
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item" href="#">User</a>
                                        <a class="dropdown-item" href="#">Admin</a>
                                        <a class="dropdown-item" href="#">Sales Coordinator</a>
                                        <a class="dropdown-item" href="#">Encoder</a>
                                    </div>
                                </div>
                            </div>
                            <div class="filter-options">
                                <div class="dropdown">
                                    <button class="btn text-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Subscription Status
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item" href="#">User</a>
                                        <a class="dropdown-item" href="#">Admin</a>
                                        <a class="dropdown-item" href="#">Sales Coordinator</a>
                                        <a class="dropdown-item" href="#">Encoder</a>
                                    </div>
                                </div>
                            </div>
                            <div class="filter-options">
                                <div class="dropdown">
                                    <button class="btn text-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Subscription Status
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item" href="#">User</a>
                                        <a class="dropdown-item" href="#">Admin</a>
                                        <a class="dropdown-item" href="#">Sales Coordinator</a>
                                        <a class="dropdown-item" href="#">Encoder</a>
                                    </div>
                                </div>
                            </div>
                            <div class="filter-options">
                                <div class="dropdown">
                                    <button class="btn text-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Alert Status
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item" href="#">User</a>
                                        <a class="dropdown-item" href="#">Admin</a>
                                        <a class="dropdown-item" href="#">Sales Coordinator</a>
                                        <a class="dropdown-item" href="#">Encoder</a>
                                    </div>
                                </div>
                            </div>
                            <div class="row col-2 ml-auto control-btns">
                                <button type="submit" class="btn col-6 filter-btn">Filter</button>
                                <button type="submit" class="btn col-6 reset-btn">Reset</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <div v-if="subscriptionsIsLoading" class="alert loading-alert" role="alert">
                            <div class="row">
                                <div class="spinner-border" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <div class="col-3">
                                    Loading...
                                </div>
                            </div>
                        </div>
                        <table class="table table-bordered table-hover">
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
                                    <th scope="col" class="title">User</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(subscription, index) in subscriptions">
                                    <tr v-bind:key="index">
                                        <th scope="row">{{ index + 1 }}</th>
                                        <td><a :href="`${SERVER_URL}/${SERVER_INVOICE_DIR}/${subscription.invoicePDF}`" target="_blank">{{ subscription.invoiceId }}</a></td>
                                        <td><a class="view-btn" href="">View</a></td>
                                        <td>{{ subscription.payment.paymentMethod.name }}</td>
                                        <td><span v-if="subscription.payment.isPaid" class="badge badge-success">Paid</span><span v-else class="badge badge-info">Pending</span></td>
                                        <td>{{ subscription.payment.bank != null ? subscription.payment.bank.iso3 : '-' }}</td>
                                        <td><span :class="[subscription.isActive ? 'badge-success' : subscription.isPending ? 'badge-secondary' : (!subscription.isActive && !subscription.isPending) ? 'badge-danger' : null, 'badge']">{{ getUserSubscriptionStatus(subscription.isActive, subscription.isPending) }}</span></td>
                                        <td>{{ subscription.subscriptionPlan.name }}</td>
                                        <td>{{ subscription.startDate | getDateOnly }}</td>
                                        <td>{{ subscription.endDate | getDateOnly }}</td>
                                        <td>{{ subscription.account.fname | capitalize }} {{ subscription.account.lname | capitalize }} <br> <small class="text-secondary">{{ subscription.account.email }}</small> </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
                <v-pagination v-if="subscriptionsMetaData" v-model="currentPage" :page-count="Math.ceil((subscriptionsMetaData != null ? subscriptionsMetaData.total : 1)/(subscriptionsMetaData != null ? subscriptionsMetaData.limit : 1))" :classes="bootstrapPaginationClasses" :labels="paginationAnchorTexts"></v-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import sidenav from '../components/Sidenav.vue'
import errorNav from '../components/Error_Nav.vue'
import { GET_SUBSCRIPTIONS, EDIT_SUBSCRIPTION } from '../store/action_types'
import { USER_SUBSCRIPTION_ACTIVE, USER_SUBSCRIPTION_PENDING, USER_SUBSCRIPTION_EXPIRED, SERVER_URL, SERVER_INVOICE_DIR } from '../utils/const'
export default {
    components: {
        sidenav,
        errorNav
    },
    data() {
        return {
            currentPage: 1,
            bootstrapPaginationClasses: {
                ul: 'pagination',
                li: 'page-item',
                liActive: 'active',
                liDisable: 'disabled',
                button: 'page-link'  
            },
            paginationAnchorTexts: {
                first: 'First',
                prev: 'Previous',
                next: 'Next',
                last: 'Last'
            },
            SERVER_URL,
            SERVER_INVOICE_DIR
        }
    },
    watch: {
        subscriptionsMetaData: {
            handler() {
                this.currentPage = this.subscriptionsMetaData != null ? this.subscriptionsMetaData.currentPage : 1
            }
        },
        currentPage: {
            handler() {
                this.getSubscriptions()
                this.$router.replace({ ...this.$router.currentRoute, query: { page: this.currentPage } });
                this.scrollToTop()
            }
        },
    },
    computed: {
        actingSubscription() {
            return this.$store.getters.subscription.data
        },
        actingSubscriptionIsLoading() {
            return this.$store.getters.subscription.isLoading
        },
        subscriptions() {
            return this.$store.getters.subscriptions.data
        },
        subscriptionsIsLoading() {
            return this.$store.getters.subscriptions.isLoading
        },
        subscriptionsMetaData() {
            return this.$store.getters.subscriptions.metaData
        }
    },
    methods: {
        scrollToTop() {
            window.scrollTo(0,0);
        },
        setCurrentPage() {
            this.currentPage = (this.$route.query.page != null && parseInt(this.$route.query.page) > 0) ? this.$route.query.page : 1
        },
        changeSubscriptionActiveStatus(id, isActive) {
            this.$store.dispatch(EDIT_SUBSCRIPTION, { _id: id, isActive: !isActive})
        },
        getSubscriptions() {
            this.$store.dispatch(GET_SUBSCRIPTIONS, { page: this.currentPage })
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
        this.setCurrentPage()
        this.getSubscriptions()
    }
}
</script>