<template>
    <div class="dashboard-body">
        <errorNav/>
        <div class="row">
            <sidenav class="col-2"/>
            <div class="col-10 content-section admin-dashboard-title">
                <nameNav v-if="user != null" :fname="user.fname" :lname="user.lname"/>
                <usersNav/>
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
                <div class="row">
                    <div class="col-5">
                        <div class="card profile-card">
                            <div class="card-header">
                                Account
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-5">
                                        <p class="title">First Name</p>
                                        <hr>
                                        <p class="title">Last Name</p>
                                        <hr>
                                        <p class="title">Email</p>
                                        <hr>
                                        <p class="title">Mobile</p>
                                        <hr>
                                        <p class="title">Roles</p>
                                        <hr>
                                        <p class="title">Account Status</p>
                                    </div>
                                    <div v-if="user != null" class="col-7">
                                        <p class="value">{{ user.fname | capitalize }}</p>
                                        <hr>
                                        <p class="value">{{ user.lname | capitalize}}</p>
                                        <hr>
                                        <p class="value"><a :href="`mailto:${user.email}`">{{ user.email }}</a> <span v-if="user.isVerified" class="verified-badge text-success"> <font-awesome-icon icon="fa-solid fa-circle-check" /> </span></p>
                                        <hr>
                                        <p v-if="user.mobile" class="value"><a :href="`tel:${user.mobile.e164}`">{{ user.mobile.formatInternational }}</a></p>
                                        <hr>
                                        <p class="value"><template v-for="(role, index) in user.roles">
                                                <span v-bind:key="index" class="badge badge-secondary">{{ role | capitalize }}</span>
                                            </template>
                                        </p>
                                        <hr>
                                        <p class="value"><span v-if="userIsLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span v-else v-on:click="changeUserActiveStatus(user._id, user.isActive)" :class="[ user.isActive ? ' badge-success' : ' badge-danger', 'badge toggle-badge']">{{ user.isActive ? 'Enabled' : 'Disabled' }}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card profile-card">
                            <div class="card-header">
                                Activities
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-5">
                                        <p class="title">Registered at</p>
                                        <hr>
                                        <p class="title">Last activity</p>
                                        <hr>
                                        <p class="title">Last activity at</p>
                                        <hr>
                                        <p class="title">Last activity IP</p>
                                        <hr>
                                        <p class="title">Last login at</p>
                                        <hr>
                                        <p class="title">Last modified at</p>
                                        <hr>
                                        <p class="title">Last modified by</p>
                                        <hr>
                                        <p class="title">Created by</p>
                                    </div>
                                    <div v-if="user != null" class="col-7">
                                        <p class="value">{{ user.createdAt | formatDate | getDateAndTime }}</p>
                                        <hr>
                                        <p class="value">- {{ (user != null && user.sessionActivity.length > 0) ? user.sessionActivity.at(-1).type : '-' }} -</p>
                                        <hr>
                                        <p class="value">{{ user.sessionActivity.length > 0 ? (user.sessionActivity[user.sessionActivity.length - 1].timestamp)  : '-' }}</p>
                                        <hr>
                                        <p class="value">{{ user.sessionActivity.length > 0 ? (user.sessionActivity[user.sessionActivity.length - 1].deviceInfo != null ? user.sessionActivity[user.sessionActivity.length - 1].deviceInfo.ip : '-') : '-'}}</p>
                                        <hr>
                                        <p class="value">{{ (user != null && user.sessionActivity.length > 0) ? (user.sessionActivity.map((e) => { if(e.type == 'login') return e.timestamp }).at(-1) || '-') : '-' }}  </p>
                                        <hr>
                                        <p class="value">{{ user.lastUpdatedAt | formatDate | getDateAndTime }}</p>
                                        <hr>
                                        <p class="value"><router-link v-if="user.lastUpdatedBy" :to="{ name: USERS_PROFILE_ROUTE, params: { id: user.lastUpdatedBy._id } }">{{ user.lastUpdatedBy.fname }}</router-link><span v-else>-</span></p>
                                        <hr>
                                        <p class="value"><router-link v-if="user.createdBy" :to="{ name: USERS_PROFILE_ROUTE, params: { id: user.createdBy._id } }">{{ user.createdBy.fname }}</router-link><span v-else>Self</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="card profile-card">
                            <div class="card-header">
                                Subscription
                            </div>
                            <div class="card-body">
                                <div v-if="user != null" class="row">
                                    <div class="col-5">
                                        <p class="title">Status</p>
                                        <hr>
                                        <p class="title">Start Date</p>
                                        <br>
                                        <hr>
                                        <p class="title">End Date</p>
                                        <br>
                                        <hr>
                                        <p class="title">Plan</p>
                                    </div>
                                    <div v-if="user.lastActiveSubscription" class="col-7">
                                        <p class="value"><span :class="[ getUserSubscriptionStatus(user.hasActiveSubscription, user.lastActiveSubscription) == USER_SUBSCRIPTION_ACTIVE ? 'badge-success' : 
                                            getUserSubscriptionStatus(user.hasActiveSubscription, user.lastActiveSubscription) == USER_SUBSCRIPTION_PENDING ? 'badge-secondary' : 
                                            'badge-danger', 'badge']">{{ getUserSubscriptionStatus(user.hasActiveSubscription, user.lastActiveSubscription) }}</span>
                                        </p>
                                        <hr>
                                        <p class="value">{{ user.lastActiveSubscription.startDate | getDateOnly }}</p>
                                        <hr>
                                        <p class="value">{{ user.lastActiveSubscription.endDate | getDateOnly }}</p>
                                        <hr>
                                        <p class="value">{{ user.lastActiveSubscription.subscriptionPlan.name }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="card profile-card">
                            <div class="card-header">
                                Alert Settings
                            </div>
                            <div v-if="user != null" class="card-body alert-settings-body">
                                <h6>Alert Status</h6>
                                <p><span v-if="user.alertStatus" class="badge badge-success toggle-badge">ACTIVE</span><span v-else class="badge badge-danger toggle-badge">DISABLED</span></p>
                                <hr>
                                <h6>Selected Regions</h6>
                                <template v-for="(region, index) in user.alertRegions">
                                    <p v-bind:key="index" class="value">{{ index + 1 }}. {{ region.name.en }}</p>
                                </template>
                                <hr>
                                <h6>Selected Categories</h6>
                                <template v-for="(category, index) in user.alertCategories">
                                    <p v-bind:key="index" class="value">{{ index + 1 }}. {{ category.name.en }}</p>
                                </template>
                            </div>
                        </div>
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
import { USERS_PROFILE_ROUTE } from '../../utils/routes'
import { GET_USER, TOGGLE_USER_ACTIVE_STATUS } from '../../store/action_types'
import { USER_SUBSCRIPTION_ACTIVE, USER_SUBSCRIPTION_PENDING, USER_SUBSCRIPTION_EXPIRED } from '../../utils/const'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
library.add(faCheckCircle)

export default {
    components: {
        sidenav,
        errorNav,
        usersNav,
        nameNav
    },
    data() {
        return {
            USER_SUBSCRIPTION_ACTIVE: USER_SUBSCRIPTION_ACTIVE,
            USER_SUBSCRIPTION_PENDING: USER_SUBSCRIPTION_PENDING,
            USER_SUBSCRIPTION_EXPIRED: USER_SUBSCRIPTION_EXPIRED,
            USERS_PROFILE_ROUTE: USERS_PROFILE_ROUTE
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
        getUserSubscriptionStatus(hasActiveSubscription, lastActiveSubscription) {
            if(hasActiveSubscription) {
                return USER_SUBSCRIPTION_ACTIVE
            } else if (!hasActiveSubscription && (lastActiveSubscription == null)) {
                return USER_SUBSCRIPTION_PENDING
            } else if(!hasActiveSubscription && (lastActiveSubscription != null)) {
                return USER_SUBSCRIPTION_EXPIRED
            }
        }
    },
    mounted() {
        this.getUser()
    }
}
</script>