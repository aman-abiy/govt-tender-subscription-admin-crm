<template>
    <div class="dashboard-body">
        <errorNav/>
        <div class="row">
            <sidenav class="col-2"/>
            <div class="col-10 content-section admin-dashboard-title">
                <div class="card title-card">
                    <div class="card-body">
                        <div class="row">
                            <h4 class="col-6">Subscription Plans <span v-if="subscriptionPlansMetaData" class="count">({{ subscriptionPlansMetaData.total }})</span></h4>
                            <router-link :to="{ name: ADD_SUBSCRIPTION_PLAN_ROUTE }" class="btn col-1 ml-auto add-user-btn">Add Plan</router-link>
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
                        <div v-if="subscriptionPlansIsLoading" class="alert loading-alert" role="alert">
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
                                    <th scope="col" class="title">Price</th>
                                    <th scope="col" class="title">Vat</th>
                                    <th scope="col" class="title">Total Price</th>
                                    <th scope="col" class="title">Duration (ms)</th>
                                    <th scope="col" class="title">Status</th>
                                    <th scope="col" class="title">Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(plan, index) in subscriptionPlans">
                                    <tr v-bind:key="index">
                                        <th scope="row">{{ index + 1 }}</th>
                                        <td><strong>{{ plan.name }}</strong></td>
                                        <td><router-link :to="{ name: EDIT_SUBSCRIPTION_PLAN_ROUTE, params: { id: plan._id } }">Edit</router-link></td>
                                        <td><strong class="text-secondary">{{ plan.price | formatPrice('ETB') }}</strong></td>
                                        <td><strong class="text-secondary">{{ plan.vat | formatPrice('ETB') }}</strong></td>
                                        <td><strong class="text-secondary">{{ plan.totalPrice | formatPrice('ETB') }}</strong></td>
                                        <td>{{ plan.duration }}</td>
                                        <td><span v-if="(subscriptionPlanIsLoading && (subscriptionPlan._id == plan._id))" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span v-else v-on:click="changeSubscriptionPlanActiveStatus(plan._id)" :class="[ plan.isActive ? 'badge-success' : 'badge-secondary', 'badge status-badge']">{{ plan.isActive ? 'ACTIVE' : 'DISABLED' }}</span></td>
                                        <td>{{ plan.createdAt | formatDate  | getDateOnly }}</td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
                <v-pagination v-if="subscriptionPlansMetaData" v-model="currentPage" :page-count="Math.ceil((subscriptionPlansMetaData != null ? subscriptionPlansMetaData.total : 1)/(subscriptionPlansMetaData != null ? subscriptionPlansMetaData.limit : 1))" :classes="bootstrapPaginationClasses" :labels="paginationAnchorTexts"></v-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import sidenav from '../../components/Sidenav.vue'
import errorNav from '../../components/Error_Nav.vue'
import { ADD_SUBSCRIPTION_PLAN_ROUTE, EDIT_SUBSCRIPTION_PLAN_ROUTE } from '../../utils/routes'
import { GET_SUBSCRIPTION_PLANS, TOGGLE_SUBSCRIPTION_PLAN_ACTIVE_STATUS } from '../../store/action_types'
export default {
    components: {
        sidenav,
        errorNav
    },
    data() {
        return {
            ADD_SUBSCRIPTION_PLAN_ROUTE: ADD_SUBSCRIPTION_PLAN_ROUTE,
            EDIT_SUBSCRIPTION_PLAN_ROUTE: EDIT_SUBSCRIPTION_PLAN_ROUTE,
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
        subscriptionPlansMetaData: {
            handler() {
                this.currentPage = this.subscriptionPlansMetaData != null ? this.subscriptionPlansMetaData.currentPage : 1
            }
        },
        currentPage: {
            handler() {
                this.getSubscriptionPlans()
                this.$router.replace({ ...this.$router.currentRoute, query: { page: this.currentPage } });
                this.scrollToTop()
            }
        },
    },
    computed: {
        subscriptionPlan() {
            return this.$store.getters.subscriptionPlan.data
        },
        subscriptionPlanIsLoading() {
            return this.$store.getters.subscriptionPlan.isLoading
        },
        subscriptionPlans() {
            return this.$store.getters.subscriptionPlans.data
        },
        subscriptionPlansIsLoading() {
            return this.$store.getters.subscriptionPlans.isLoading
        },
        subscriptionPlansMetaData() {
            return this.$store.getters.subscriptionPlans.metaData
        }
    },
    methods: {
        scrollToTop() {
            window.scrollTo(0,0);
        },
        setCurrentPage() {
            this.currentPage = (this.$route.query.page != null && parseInt(this.$route.query.page) > 0) ? this.$route.query.page : 1
        },
        changeSubscriptionPlanActiveStatus(id) {
            this.$store.dispatch(TOGGLE_SUBSCRIPTION_PLAN_ACTIVE_STATUS, { _id: id })
        },
        getSubscriptionPlans() {
            this.$store.dispatch(GET_SUBSCRIPTION_PLANS)
        }
    },
    mounted() {
        this.setCurrentPage()
        this.getSubscriptionPlans()
    }
}
</script>