<template>
    <div class="dashboard-body">
        <errorNav/>
        <div class="row">
            <sidenav class="col-2"/>
            <div class="col-10 content-section admin-dashboard-title">
                <div class="card title-card">
                    <div class="card-body">
                        <div class="row">
                            <h4 class="col-6">Emails Sent <span v-if="emailsSentMetaData" class="count">({{ emailsSentMetaData.total }})</span></h4>
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
                        <div v-if="emailsSentIsLoading" class="alert loading-alert" role="alert">
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
                                    <th scope="col" class="title">Type</th>
                                    <th scope="col" class="title">Is Sent</th>
                                    <th scope="col" class="title">Is Read</th>
                                    <th scope="col" class="title">Sent At</th>
                                    <th scope="col" class="title">Opened At</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(email, index) in emailsSent">
                                    <tr v-bind:key="index">
                                        <!-- <th scope="row">{{ index + 1 }}</th> -->
                                        <td>{{ email.sentToEmail }}</td>
                                        <td><router-link :to="{ name: '' }">{{ email.tenders.length }}</router-link></td>
                                        <td>{{ email.type }}</td>
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
                <v-pagination v-if="emailsSentMetaData" v-model="currentPage" :page-count="Math.ceil((emailsSentMetaData != null ? emailsSentMetaData.total : 1)/(emailsSentMetaData != null ? emailsSentMetaData.limit : 1))" :classes="bootstrapPaginationClasses" :labels="paginationAnchorTexts"></v-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import sidenav from '../../components/Sidenav.vue'
import errorNav from '../../components/Error_Nav.vue'
import { GET_EMAILS_SENT } from '../../store/action_types'
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
        emailsSentMetaData: {},
        currentPage: {
            handler() {
                this.getEmailsSent()
                this.$router.replace({ ...this.$router.currentRoute, query: { page: this.currentPage } });
                this.scrollToTop()
            }
        },
    },
    computed: {
        emailsSent() {
            return this.$store.getters.emailsSent.data
        },
        emailsSentIsLoading() {
            return this.$store.getters.emailsSent.isLoading
        },
        emailsSentMetaData() {
            return this.$store.getters.emailsSent.metaData
        }
    },
    methods: {
        scrollToTop() {
            window.scrollTo(0,0);
        },
        setCurrentPage() {
            this.currentPage = (this.$route.query.page != null && parseInt(this.$route.query.page) > 0) ? this.$route.query.page : 1
        },
        getEmailsSent() {
            this.$store.dispatch(GET_EMAILS_SENT, { page: this.currentPage })
        }
    },
    mounted() {
        this.setCurrentPage()
        this.getEmailsSent()
    }
}
</script>