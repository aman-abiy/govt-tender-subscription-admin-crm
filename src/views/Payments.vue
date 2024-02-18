<template>
    <div class="dashboard-body">
        <errorNav/>
        <div class="row">
            <sidenav class="col-2"/>
            <div class="col-10 content-section admin-dashboard-title">
                <div class="card title-card">
                    <div class="card-body">
                        <div class="row">
                            <h4 class="col-3">Payments <span v-if="paymentsMetaData" class="count">({{ paymentsMetaData.total }})</span></h4>
                            <h6 class="amount-paid ml-auto">{{ total | formatPrice('ETB') }} </h6>
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
                        <div v-if="paymentsIsLoading" class="alert loading-alert" role="alert">
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
                                    <th scope="col" class="title">Transaction Id</th>
                                    <th scope="col" class="title">Payment Method</th>
                                    <th scope="col" class="title">Amount</th>
                                    <th scope="col" class="title">Bank</th>
                                    <th scope="col" class="title">Paid</th>
                                    <th scope="col" class="title">Payment Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(payment, index) in payments">
                                    <tr v-bind:key="index">
                                        <th scope="row">{{ index + 1 }}</th>
                                        <td><strong class="text-secondary">{{ payment.transactionRef }}</strong></td>
                                        <td>{{ payment.paymentMethod.name }}</td>
                                        <td>{{ payment.price | formatPrice('ETB') }}</td>
                                        <td><strong class="text-secondary">{{ payment.bank != null ? payment.bank.iso3 : '-' }}</strong></td>
                                        <td><span v-if="payment.isPaid" class="badge badge-success">Paid</span><span v-else class="badge badge-info">Pending</span></td>
                                        <td>{{ payment.paymentDate | getDateOnly }}</td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
                <v-pagination v-if="paymentsMetaData" v-model="currentPage" :page-count="Math.ceil((paymentsMetaData != null ? paymentsMetaData.total : 1)/(paymentsMetaData != null ? paymentsMetaData.limit : 1))" :classes="bootstrapPaginationClasses" :labels="paginationAnchorTexts"></v-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import sidenav from '../components/Sidenav.vue'
import errorNav from '../components/Error_Nav.vue'
import { GET_PAYMENTS } from '../store/action_types'
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
            }
        }
    },
    watch: {
        paymentsMetaData: {
            handler() {
                this.currentPage = this.paymentsMetaData != null ? this.paymentsMetaData.currentPage : 1
            }
        },
        currentPage: {
            handler() {
                this.getPayments()
                this.$route.query.page = this.currentPage
                this.$router.replace({ ...this.$router.currentRoute, query: this.$route.query });
                this.scrollToTop()
            }
        },
    },
    computed: {
        payments() {
            return this.$store.getters.payments.data != null ? this.$store.getters.payments.data.payments : {} 
        },
        total() {
            return this.$store.getters.payments.data != null ? this.$store.getters.payments.data.total : {} 
        },
        paymentsIsLoading() {
            return this.$store.getters.payments.isLoading
        },
        paymentsMetaData() {
            return this.$store.getters.payments.metaData
        },
        // totalPaidAmount() {
        //     return this.payments.map((e) => parseFloat(e.price)).reduce(
        //         (prev, curr) => prev + curr
        //     )
        // }, 
    },
    methods: {
        scrollToTop() {
            window.scrollTo(0,0);
        },
        setCurrentPage() {
            this.currentPage = (this.$route.query.page != null && parseInt(this.$route.query.page) > 0) ? this.$route.query.page : 1
        },
        getPayments() {
            this.$route.query.page = this.currentPage
            console.log('this.$route.query', this.$route.query)
            this.$store.dispatch(GET_PAYMENTS, this.$route.query)
        }
    },
    mounted() {
        this.setCurrentPage()
        this.getPayments()
    }
}
</script>