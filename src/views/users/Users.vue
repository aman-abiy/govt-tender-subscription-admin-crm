<template>
    <div class="dashboard-body">
        <errorNav/>
        <div class="row">
            <sidenav class="col-2"/>
            <div class="col-10 content-section admin-dashboard-title">
                <div class="card title-card">
                    <div class="card-body">
                        <div class="row">
                            <h4 class="col-2">Users <span v-if="usersMetaData" class="count">({{ usersMetaData.total }})</span></h4>
                            <router-link :to="{ name: ADD_USER_ROUTE }" class="btn col-1 ml-auto add-user-btn">Add User</router-link>
                        </div>
                    </div>
                </div>
                <filterUsers/>
                <div class="card">
                    <div class="card-body">
                        <div v-if="usersIsLoading" class="alert loading-alert" role="alert">
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
                                    <th scope="col" class="title">Full Name</th>
                                    <th scope="col" class="title"></th>
                                    <th scope="col" class="title"></th>
                                    <th scope="col" class="title">Role</th>
                                    <th scope="col" class="title">Subscription</th>
                                    <th scope="col" class="title">Account</th>
                                    <th scope="col" class="title">App</th>
                                    <th scope="col" class="title">Email</th>
                                    <th scope="col" class="title">Mobile</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(user, index) in users">
                                    <tr v-bind:key="index">
                                        <th scope="row">{{ index + 1 }}</th>
                                        <td>{{ user.fname | capitalize }} {{ user.lname | capitalize }}</td>
                                        <td><router-link :to="{ name: EDIT_USER_ROUTE, params: { id: user._id } }" class="edit-btn">Edit</router-link></td>
                                        <td><router-link :to="{ name: USERS_PROFILE_ROUTE, params: { id: user._id } }" class="profile-btn">Profile</router-link></td>
                                        <td>
                                            <template v-for="(role, index) in user.roles">
                                                <span v-bind:key="index" class="badge badge-secondary">{{ role | capitalize }}</span>
                                            </template>
                                        </td>
                                        <td><span :class="[ getUserSubscriptionStatus(user.hasActiveSubscription, user.lastActiveSubscription) == USER_SUBSCRIPTION_ACTIVE ? 'badge-success' : 
                                                            getUserSubscriptionStatus(user.hasActiveSubscription, user.lastActiveSubscription) == USER_SUBSCRIPTION_PENDING ? 'badge-secondary' : 
                                                            'badge-danger', 'badge']">{{ getUserSubscriptionStatus(user.hasActiveSubscription, user.lastActiveSubscription) }}</span></td>
                                        <td><span v-if="(actingUser != null && actingUser._id == user._id) && actingUserIsLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span v-else v-on:click="changeUserActiveStatus(user._id, user.isActive)" :class="[ user.isActive ? ' badge-success' : ' badge-danger', 'badge toggle-badge']">{{ user.isActive ? 'Enabled' : 'Disabled' }}</span></td>
                                        <td class="appversion"><span v-if="user.mobileDeviceInfo">{{ user.mobileDeviceInfo.buildInfo.version }}+{{ user.mobileDeviceInfo.buildInfo.buildNumber }}</span><span v-else> - </span></td>
                                        <td class="email"><a :href="`mailto:${user.email}`">{{ user.email }}</a></td>
                                        <td class="phoneNumber"><a :href="`tel:${user.mobile.e164}`">{{ user.mobile.formatInternational }}</a></td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
                <v-pagination v-if="usersMetaData" v-model="currentPage" :page-count="Math.ceil((usersMetaData != null ? usersMetaData.total : 1)/(usersMetaData != null ? usersMetaData.limit : 1))" :classes="bootstrapPaginationClasses" :labels="paginationAnchorTexts"></v-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import sidenav from '../../components/Sidenav.vue'
import errorNav from '../../components/Error_Nav.vue'
import filterUsers from '../../components/Filter_Users.vue'
import { USERS_PROFILE_ROUTE, ADD_USER_ROUTE, EDIT_USER_ROUTE } from '../../utils/routes'
import { GET_USERS, TOGGLE_USER_ACTIVE_STATUS } from '../../store/action_types'
import { USER_SUBSCRIPTION_ACTIVE, USER_SUBSCRIPTION_PENDING, USER_SUBSCRIPTION_EXPIRED } from '../../utils/const'
export default {
    components: {
        sidenav,
        errorNav,
        filterUsers
    },
    data() {
        return {
            USER_SUBSCRIPTION_ACTIVE: USER_SUBSCRIPTION_ACTIVE,
            USER_SUBSCRIPTION_PENDING: USER_SUBSCRIPTION_PENDING,
            USER_SUBSCRIPTION_EXPIRED: USER_SUBSCRIPTION_EXPIRED,
            USERS_PROFILE_ROUTE: USERS_PROFILE_ROUTE,
            ADD_USER_ROUTE: ADD_USER_ROUTE,
            EDIT_USER_ROUTE: EDIT_USER_ROUTE,
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
        usersMetaData: {
            handler() {
                this.currentPage = this.usersMetaData != null ? this.usersMetaData.currentPage : 1
            }
        },
        currentPage: {
            handler() {
                this.getUsers()
                this.$route.query.page = this.currentPage
                this.$router.replace({ ...this.$router.currentRoute, query: this.$route.query });
                this.scrollToTop()
            }
        },
    },
    computed: {
        actingUser() {
            return this.$store.getters.user.data
        },
        actingUserIsLoading() {
            return this.$store.getters.user.isLoading
        },
        users() {
            return this.$store.getters.users.data
        },
        usersIsLoading() {
            return this.$store.getters.users.isLoading
        },
        usersMetaData() {
            return this.$store.getters.users.metaData
        }
    },
    methods: {
        scrollToTop() {
            window.scrollTo(0,0);
        },
        setCurrentPage() {
            this.currentPage = (this.$route.query.page != null && parseInt(this.$route.query.page) > 0) ? this.$route.query.page : 1
        },
        changeUserActiveStatus(id) {
            this.$store.dispatch(TOGGLE_USER_ACTIVE_STATUS, { _id: id })
        },
        getUsers() {
            this.$route.query.page = this.currentPage
            this.$store.dispatch(GET_USERS, this.$route.query)
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
        this.setCurrentPage()
        this.getUsers()
    }
}
</script>