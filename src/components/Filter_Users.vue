<template>
    <div class="card">
        <div class="card-body">
            <div class="d-flex flex-wrap">
                <div class="filter-options">
                    <input v-model="fname" class="form-control" type="text" placeholder="Name" aria-label="Search">
                </div>
                <div class="filter-options">
                    <input v-model="email" class="form-control" type="email" placeholder="Email" aria-label="Search">
                </div>
                <div class="filter-options">
                    <input v-model="mobile" class="form-control" type="tel" placeholder="Phone No." aria-label="Search">
                </div>
                <div class="filter-options">
                    <div class="input-group mb-3">
                        <select v-model="roles" class="custom-select" id="roles">
                            <option disabled :value="[]">- Role -</option>
                            <option :value="[ROLES[0]]">Root</option>
                            <option :value="[ROLES[1]]">Admin</option>
                            <option :value="[ROLES[2]]">Sales Coordinator</option>
                            <option :value="[ROLES[3]]">Encoder</option>
                            <option :value="[ROLES[4]]">Editor</option>
                            <option :value="[ROLES[5]]">User</option>
                        </select>
                    </div>
                </div>
                <div class="filter-options">
                    <div class="input-group mb-3">
                        <select v-model="subscriptionEndDate" class="custom-select" id="roles">
                            <option disabled :value="null">- Subscription Expiry -</option>
                            <option value="1">Today</option>
                            <option value="2">In 3 days</option>
                            <option value="3">In 1 week</option>
                            <option value="3">In a month</option>
                        </select>
                    </div>
                </div>
                <div class="filter-options">
                    <div class="input-group mb-3">
                        <select v-model="subscriptionStatus" class="custom-select" id="roles">
                            <option disabled :value="null">- Subscription Status -</option>
                            <option :value="USER_SUBSCRIPTION_ACTIVE">Active</option>
                            <option :value="USER_SUBSCRIPTION_PENDING">Pending</option>
                            <option :value="USER_SUBSCRIPTION_EXPIRED">Expired</option>
                        </select>
                    </div>
                </div>
                <div class="filter-options">
                    <div class="input-group mb-3">
                        <select v-model="alertStatus" class="custom-select" id="roles">
                            <option disabled :value="null">- Alert Status -</option>
                            <option :value="true">Active</option>
                            <option :value="false">Disabled</option>
                        </select>
                    </div>
                </div>
                <div class="filter-options">
                    <div class="input-group mb-3">
                        <select v-model="createdBy" class="custom-select" id="roles">
                            <option disabled :value="null">- Created By -</option>
                            <template v-for="(admin, index) in admins">
                                <option v-bind:key="index" :value="admin._id">{{ admin.fname }}</option>
                            </template>
                        </select>
                    </div>
                </div>
                <div class="row col-2 ml-auto control-btns">
                    <button v-on:click="filterUsers" type="submit" class="btn col-6 filter-btn">Filter</button>
                    <button v-on:click="reset" type="submit" class="btn col-6 reset-btn">Reset</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { GET_USERS, GET_ADMINS } from '../store/action_types'
import { ROLES, USER_SUBSCRIPTION_ACTIVE, USER_SUBSCRIPTION_PENDING, USER_SUBSCRIPTION_EXPIRED } from '../utils/const'

export default {
    data() {
        return {
            ROLES,
            USER_SUBSCRIPTION_ACTIVE,
            USER_SUBSCRIPTION_PENDING,
            USER_SUBSCRIPTION_EXPIRED,
            fname: null,
            email: null,
            mobile: null,
            roles: [],
            subscriptionEndDate: null,
            subscriptionStatus: null,
            hasActiveSubscription: null,
            alertStatus: null,
            createdBy: null
        }
    },
    computed: {
        admins() {
            return this.$store.getters.admins.data
        }
    },
    methods: {
        filterUsers() {
            const filters = {
                ...(this.fname != null ? { fname: this.fname } : {}),
                ...(this.email != null ? { email: this.email } : {}),
                ...(this.mobile != null ? { mobile: this.mobile } : {}),
                ...(this.roles.length > 0 ? { roles: JSON.stringify(this.roles) } : {}),
                // ...(this.subscriptionEndDate != null ? { subscriptionEndDate: this.subscriptionEndDate } : {}),
                ...(this.subscriptionStatus != null ? 
                        this.subscriptionStatus == USER_SUBSCRIPTION_ACTIVE ? { hasActiveSubscription: true } 
                        : this.subscriptionStatus == USER_SUBSCRIPTION_PENDING ? { hasActiveSubscription: false, lastActiveSubscription: JSON.stringify({ $eq: null }) }
                        : this.subscriptionStatus == USER_SUBSCRIPTION_EXPIRED ? { hasActiveSubscription: false, lastActiveSubscription: JSON.stringify({ $ne: null }) } : {} : {}),
                ...(this.alertStatus != null ? { alertStatus: this.alertStatus } : {}),
                ...(this.createdBy != null ? { createdBy: this.createdBy } : {})
            }
            console.log('filters', filters)
            this.$router.replace({ ...this.$router.currentRoute, query: { page: 1, ...filters } })
            this.$store.dispatch(GET_USERS, filters)
        },
        reset() {
            this.fname = null
            this.email = null
            this.mobile = null
            this.roles = []
            this.subscriptionStatus = null
            this.alertStatus = null
            this.createdBy = null
            this.$router.replace({ ...this.$router.currentRoute, query: null })
            this.$store.dispatch(GET_USERS, { page: 1 })
        },
        getAdmins() {
            this.$store.dispatch(GET_ADMINS)
        }
    },
    mounted() {
        this.getAdmins()
    }
}
</script>