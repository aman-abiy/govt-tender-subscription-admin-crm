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
                        <div v-if="userAlertEmailsIsLoading" class="alert loading-alert" role="alert">
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
                                    <!-- <th scope="col" class="title">#</th> -->
                                    <th scope="col" class="title">Email</th>
                                    <th scope="col" class="title">Tenders</th>
                                    <th scope="col" class="title">Is Sent</th>
                                    <th scope="col" class="title">Is Read</th>
                                    <th scope="col" class="title">Sent At</th>
                                    <th scope="col" class="title">Opened At</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(email, index) in userAlertEmails">
                                    <tr v-bind:key="index">
                                        <!-- <th scope="row">{{ index + 1 }}</th> -->
                                        <td>{{ email.sentToEmail }}</td>
                                        <td><router-link :to="{ name: '' }">{{ email.tenders.length }}</router-link></td>
                                        <td><span v-if="email.isSent" class="badge badge-secondary">Sent</span><span v-else class="badge badge-danger">Not-Sent</span></td>
                                        <td><span v-if="email.isOpened" class="badge badge-success">Read</span><span v-else class="badge badge-secondary">Unread</span></td>
                                        <td>{{ email.createdAt | formatDate  | getDateAndTime }}</td>
                                        <td><span v-if="email.openedAt">{{ email.openedAt | formatDate  | getDateAndTime }}</span><span v-else class="text-center">-</span></td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
                <v-pagination v-if="userAlertEmailsMetaData" v-model="currentPage" :page-count="Math.ceil((userAlertEmailsMetaData != null ? userAlertEmailsMetaData.total : 1)/(userAlertEmailsMetaData != null ? userAlertEmailsMetaData.limit : 1))" :classes="bootstrapPaginationClasses" :labels="paginationAnchorTexts"></v-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import sidenav from '../../components/Sidenav.vue'
import errorNav from '../../components/Error_Nav.vue'
import usersNav from '../../components/Users_Nav.vue'
import nameNav from '../../components/Name_Nav.vue'
import { GET_USER, GET_USER_ALERT_EMAILS } from '../../store/action_types'

export default {
    components: {
        sidenav,
        errorNav,
        usersNav,
        nameNav
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
        userAlertEmailsMetaData: {},
        currentPage: {
            handler() {
                this.getUserAlertEmails()
                this.$router.replace({ ...this.$router.currentRoute, query: { page: this.currentPage } });
                this.scrollToTop()
            }
        },
    },
    computed: {
        userAlertEmails() {
            return this.$store.getters.userAlertEmails.data
        },
        userAlertEmailsMetaData() {
            return this.$store.getters.userAlertEmails.metaData
        },
        user() {
            return this.$store.getters.user.data
        },
        userAlertEmailsIsLoading() {
            return this.$store.getters.userAlertEmails.isLoading
        }
    },
    methods: {
        scrollToTop() {
            window.scrollTo(0,0);
        },
        setCurrentPage() {
            this.currentPage = (this.$route.query.page != null && parseInt(this.$route.query.page) > 0) ? this.$route.query.page : 1
        },
        getUserAlertEmails() {
            this.$store.dispatch(GET_USER_ALERT_EMAILS, { account: this.$route.params.id, page: this.currentPage })
        },
        getUser() {
            this.$store.dispatch(GET_USER, { id: this.$route.params.id })
        }
    },
    mounted() {
        this.getUser()
        this.setCurrentPage()
        this.getUserAlertEmails()
    }
}
</script>