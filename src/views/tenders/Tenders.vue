<template>
    <div class="dashboard-body">
        <errorNav/>
        <div class="row">
            <sidenav class="col-2"/>
            <div class="col-10 content-section admin-dashboard-title">
                <div class="card title-card">
                    <div class="card-body">
                        <div class="row">
                            <h4 class="col-3">Tenders <span v-if="tendersMetaData" class="count">({{ tendersMetaData.total }})</span></h4>
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
                                        Tender Expiry
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
                                        Tender Status
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
                                        Tender Status
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
                <div class="card tenders-dashboard">
                    <div class="card-body">
                        <div v-if="tendersIsLoading" class="alert loading-alert" role="alert">
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
                                    <th scope="col-3" class="title">Tilte</th>
                                    <th scope="col" class="title"></th>
                                    <th scope="col-1" class="title">Published</th>
                                    <th scope="col-1" class="title">Featured</th>
                                    <th scope="col" class="title">Published By</th>
                                    <th scope="col" class="title">Created At</th>
                                    <th scope="col-1" class="title">Views</th>
                                    <th scope="col" class="title">Last Modified At</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(tender, index) in tenders">
                                    <tr v-bind:key="index">
                                        <th scope="row">{{ index + 1 }}</th>
                                        <td><a href="">{{ tender.title }}</a></td>
                                        <td><router-link :to="{ name: EDIT_TENDERS_ROUTE, params: { id: tender._id } }" class="edit-btn" href="">Edit</router-link></td>
                                        <td><span v-if="(actingTender != null && actingTender._id == tender._id) && actingTenderIsLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span v-else v-on:click="changeTenderPublishedStatus(tender._id)" :class="[tender.isPublished ? 'badge-success' : 'badge-secondary', 'badge']">{{ tender.isPublished ? 'Yes' :  'No' }}</span></td>
                                        <td><span v-if="(actingTender != null && actingTender._id == tender._id) && actingTenderIsLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span v-else v-on:click="changeTenderFeaturedStatus(tender._id)" :class="[tender.isFeatured ? 'badge-success' : 'badge-secondary', 'badge']">{{ tender.isFeatured ? 'Yes' :  'No' }}</span></td>
                                        <td>{{ tender.createdBy.fname | capitalize }}</td>
                                        <td>{{ tender.createdAt | formatDate  | getDateOnly }}</td>
                                        <td><font-awesome-icon icon="fa-solid fa-eye" class="fa"/> {{ tender.views }}</td>
                                        <td>{{ tender.lastUpdatedAt | formatDate  | getDateOnly }}</td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
                <v-pagination v-if="tendersMetaData" v-model="currentPage" :page-count="Math.ceil((tendersMetaData != null ? tendersMetaData.total : 1)/(tendersMetaData != null ? tendersMetaData.limit : 1))" :classes="bootstrapPaginationClasses" :labels="paginationAnchorTexts"></v-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import sidenav from '../../components/Sidenav.vue'
import errorNav from '../../components/Error_Nav.vue'
import { GET_TENDERS, TOGGLE_TENDER_PUBLISHED_STATUS, TOGGLE_TENDER_FEATURED_STATUS } from '../../store/action_types'
import { EDIT_TENDERS_ROUTE } from '../../utils/routes'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye } from '@fortawesome/free-solid-svg-icons'
library.add(faEye)

export default {
    components: {
        sidenav,
        errorNav
    },
    data() {
        return {
            EDIT_TENDERS_ROUTE: EDIT_TENDERS_ROUTE,
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
        tendersMetaData: {
            handler() {
                this.currentPage = this.tendersMetaData != null ? this.tendersMetaData.currentPage : 1
            }
        },
        currentPage: {
            handler() {
                this.getTenders()
                this.$router.replace({ ...this.$router.currentRoute, query: { page: this.currentPage } });
                this.scrollToTop()
            }
        },
    },
    computed: {
        actingTender() {
            return this.$store.getters.tender.data
        },
        actingTenderIsLoading() {
            return this.$store.getters.tender.isLoading
        },
        tenders() {
            return this.$store.getters.tenders.data
        },
        tendersIsLoading() {
            return this.$store.getters.tenders.isLoading
        },
        tendersMetaData() {
            return this.$store.getters.tenders.metaData
        }
    },
    methods: {
        scrollToTop() {
            window.scrollTo(0,0);
        },
        setCurrentPage() {
            this.currentPage = (this.$route.query.page != null && parseInt(this.$route.query.page) > 0) ? this.$route.query.page : 1
        },
        changeTenderPublishedStatus(id) {
            this.$store.dispatch(TOGGLE_TENDER_PUBLISHED_STATUS, { _id: id })
        },
        changeTenderFeaturedStatus(id) {
            this.$store.dispatch(TOGGLE_TENDER_FEATURED_STATUS, { _id: id })
        },
        getTenders() {
            this.$store.dispatch(GET_TENDERS, { page: this.currentPage })
        }
    },
    mounted() {
        this.setCurrentPage()
        this.getTenders()
    }
}
</script>