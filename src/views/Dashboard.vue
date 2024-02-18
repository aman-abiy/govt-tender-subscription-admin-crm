<template>
    <div class="dashboard-body">
        <errorNav/>
        <div class="row">
            <sidenav class="col-2"/>
            <div class="col-10 content-section admin-dashboard-title">
                <div class="card title-card">
                    <div class="card-body">
                        <div class="row">
                            <h4 class="col-2">Dashboard <span class="count"></span></h4>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-8">
                        <usersChart/>
                    </div>
                    <div class="col-lg-4">
                        <div class="row">
                            <div class="col-6">
                                <div class="card app-users-info-card">
                                    <div class="card-body">
                                        <h5 class="title">App Users</h5>
                                        <hr>
                                        <h5><strong class="text-secondary">{{ usersByService.mobileApp }}</strong></h5>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="card app-users-info-card">
                                    <div class="card-body">
                                        <h5 class="title">Web Users</h5>
                                        <hr>
                                        <h5><strong class="text-secondary">{{ usersByService.webApp }}</strong></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card app-users-subs-info-card">
                                    <div class="card-body">
                                        <h5 class="title">User Subscriptions</h5>
                                        <hr>
                                        <div class="row justify-content-between">
                                            <span class="badge badge-success">ACTIVE</span>
                                            <span class="value"><strong>{{ usersBySubscriptionStatus.active }}</strong> ({{ usersBySubscriptionStatus.active | calcPercentage(usersBySubscriptionStatus.total) }})</span>
                                        </div>
                                        <br>
                                        <div class="row justify-content-between">
                                            <span class="badge badge-secondary">PENDING</span>
                                            <span class="value"><strong>{{ usersBySubscriptionStatus.pending }}</strong> ({{ usersBySubscriptionStatus.pending | calcPercentage(usersBySubscriptionStatus.total) }})</span>
                                        </div>
                                        <br>
                                        <div class="row justify-content-between">
                                            <span class="badge badge-danger">EXPIRED</span>
                                            <span class="value"><strong>{{ usersBySubscriptionStatus.expired }}</strong> ({{ usersBySubscriptionStatus.expired | calcPercentage(usersBySubscriptionStatus.total) }})</span>
                                        </div>
                                        <br>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-8">
                        <salesChart/>
                    </div>
                    <div class="col-lg-4">
                        <div class="card app-users-subs-info-card">
                            <div class="card-body">
                                <h5 class="title">Monthly Sales <span class="text-danger">{{ currentMonthSales.saleAmount | calcPercentage(87120) }}</span> <span class="count"> {{ currentMonthSales.currentMonth }}</span></h5>
                                <hr>
                                <div class="row justify-content-between">
                                    <h6 class="text-secondary"><strong>Sales Amount</strong></h6>
                                    <h6><strong>{{ currentMonthSales.saleAmount | formatPrice('ETB') }} </strong> <span class="text-danger"> ({{ currentMonthSales.saleAmount - 87120 | formatPrice('ETB') }})</span></h6>
                                </div>
                                <br>
                                <div class="row justify-content-between">
                                    <h6 class="text-secondary"><strong>Sales Count</strong></h6>
                                    <h6><strong>{{ currentMonthSales.count }} Sales</strong> <span class="text-danger"> ({{ currentMonthSales.count - 88 }})</span></h6>
                                </div>
                                <hr>
                                <div class="row justify-content-between">
                                    <h6 class="text-secondary"><strong>Sales Target Amount</strong></h6>
                                    <h6><strong>{{ 87120 | formatPrice('ETB') }}</strong></h6>
                                </div>
                                <br>
                                <div class="row justify-content-between">
                                    <h6 class="text-secondary"><strong>Sales Target Count</strong></h6>
                                    <h6><strong>88 Sales</strong></h6>
                                </div>
                                <br>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import sidenav from '../components/Sidenav'
import errorNav from '../components/Error_Nav.vue'
import usersChart from '../components/Dashboard/users_chart'
import usersByService from '../components/Dashboard/users_by_service'
import salesChart from '../components/Dashboard/sales_chart'
import { GET_USERS_BY_SERVICE, GET_USERS_BY_SUBSCIPTION_STATUS, GET_CURRENT_MONTH_SALES } from '../store/action_types'

export default {
    components: {
        sidenav,
        errorNav,
        usersChart,
        usersByService,
        salesChart
    },
    data() {
        return  {
        }
    },
    computed: {
        usersByService() {
            return this.$store.getters.usersByService.data
        },
        usersBySubscriptionStatus() {
            return this.$store.getters.usersBySubscriptionStatus.data
        },
        currentMonthSales() {
            return this.$store.getters.currentMonthSales.data
        }
    },
    methods: {
        getUsersByService()  {
            this.$store.dispatch(GET_USERS_BY_SERVICE)
        },
        getUsersBySubscriptionStatus()  {
            this.$store.dispatch(GET_USERS_BY_SUBSCIPTION_STATUS)
        },
        getCurrentMonthSales()  {
            this.$store.dispatch(GET_CURRENT_MONTH_SALES)
        },
    },
    mounted() {
        this.getUsersByService()
        this.getUsersBySubscriptionStatus()
        this.getCurrentMonthSales()
    }
    
}
</script>