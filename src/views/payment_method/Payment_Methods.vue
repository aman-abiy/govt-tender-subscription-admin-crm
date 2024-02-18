<template>
    <div class="dashboard-body">
        <errorNav/>
        <div class="row">
            <sidenav class="col-2"/>
            <div class="col-10 content-section admin-dashboard-title">
                <div class="card title-card">
                    <div class="card-body">
                        <div class="row">
                            <h4 class="col-6">Payment Methods <span v-if="paymentMethodsMetaData" class="count">({{ paymentMethodsMetaData.total }})</span></h4>
                            <router-link :to="{ name: ADD_PAYMENT_METHOD_ROUTE }" class="btn col-1 ml-auto add-user-btn">Add Method</router-link>
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
                        <div v-if="paymentMethodsIsLoading" class="alert loading-alert" role="alert">
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
                                    <th scope="col" class="title">Name</th>
                                    <th scope="col" class="title"></th>
                                    <th scope="col" class="title">Status</th>
                                    <th scope="col" class="title">Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(method, index) in paymentMethods">
                                    <tr v-bind:key="index">
                                        <th scope="row">{{ index + 1 }}</th>
                                        <td><strong>{{ method.name }}</strong></td>
                                        <td><router-link :to="{ name: EDIT_PAYMENT_METHOD_ROUTE, params: { id: method._id } }">Edit</router-link></td>
                                        <td><span v-if="(paymentMethodIsLoading && (paymentMethod._id == method._id))" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span v-else v-on:click="changePaymentMethodActiveStatus(method._id)" :class="[ method.isActive ? 'badge-success' : 'badge-secondary', 'badge status-badge']">{{ method.isActive ? 'ACTIVE' : 'DISABLED' }}</span></td>
                                        <td>{{ method.createdAt | formatDate  | getDateOnly }}</td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
                <v-pagination v-if="paymentMethodsMetaData" v-model="currentPage" :page-count="Math.ceil((paymentMethodsMetaData != null ? paymentMethodsMetaData.total : 1)/(paymentMethodsMetaData != null ? paymentMethodsMetaData.limit : 1))" :classes="bootstrapPaginationClasses" :labels="paginationAnchorTexts"></v-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import sidenav from '../../components/Sidenav.vue'
import errorNav from '../../components/Error_Nav.vue'
import { ADD_PAYMENT_METHOD_ROUTE, EDIT_PAYMENT_METHOD_ROUTE } from '../../utils/routes'
import { GET_PAYMENT_METHODS, TOGGLE_PAYMENT_METHOD_ACTIVE_STATUS } from '../../store/action_types'
export default {
    components: {
        sidenav,
        errorNav
    },
    data() {
        return {
            ADD_PAYMENT_METHOD_ROUTE: ADD_PAYMENT_METHOD_ROUTE,
            EDIT_PAYMENT_METHOD_ROUTE: EDIT_PAYMENT_METHOD_ROUTE,
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
        paymentMethodsMetaData: {
            handler() {
                this.currentPage = this.paymentMethodsMetaData != null ? this.paymentMethodsMetaData.currentPage : 1
            }
        },
        currentPage: {
            handler() {
                this.getBankAccounts()
                this.$router.replace({ ...this.$router.currentRoute, query: { page: this.currentPage } });
                this.scrollToTop()
            }
        },
    },
    computed: {
        paymentMethod() {
            return this.$store.getters.paymentMethod.data
        },
        paymentMethodIsLoading() {
            return this.$store.getters.paymentMethod.isLoading
        },
        paymentMethods() {
            return this.$store.getters.paymentMethods.data
        },
        paymentMethodsIsLoading() {
            return this.$store.getters.paymentMethods.isLoading
        },
        paymentMethodsMetaData() {
            return this.$store.getters.paymentMethods.metaData
        }
    },
    methods: {
        scrollToTop() {
            window.scrollTo(0,0);
        },
        setCurrentPage() {
            this.currentPage = (this.$route.query.page != null && parseInt(this.$route.query.page) > 0) ? this.$route.query.page : 1
        },
        changePaymentMethodActiveStatus(id) {
            this.$store.dispatch(TOGGLE_PAYMENT_METHOD_ACTIVE_STATUS, { _id: id })
        },
        getPaymentMethodsMetaData() {
            this.$store.dispatch(GET_PAYMENT_METHODS)
        }
    },
    mounted() {
        this.setCurrentPage()
        this.getPaymentMethodsMetaData()
    }
}
</script>