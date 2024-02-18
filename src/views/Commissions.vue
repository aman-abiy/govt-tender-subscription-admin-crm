<template>
    <div class="dashboard-body">
        <errorNav/>
        <div class="row">
            <sidenav class="col-2"/>
            <div class="col-10 content-section admin-dashboard-title">
                <div class="card title-card">
                    <div class="card-body">
                        <div class="row">
                            <h4 class="col-3">Commissions <span v-if="commissionsMetaData" class="count">({{ commissionsMetaData.total }})</span></h4>
                            <!-- <h6 class="amount-paid ml-auto">{{ totalPaidAmount  | formatPrice('ETB') }} </h6> -->
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex flex-wrap date-filter">
                            <div class="filter-options">
                                <label for="startDate">From: </label>
                                <input v-model="startDate" class="datePicker" type="date" name="startDate" id="startDate">
                            </div>
                            <div class="filter-options">
                                <label for="endDate">To: </label>
                                <input v-model="endDate" class="datePicker" type="date" name="endDate" id="endDate">
                            </div>
                        </div>
                        <div class="row col-2 ml-auto control-btns">
                            <button v-on:click="getCommissions" type="submit" class="btn col-6 filter-btn">Filter</button>
                            <button  v-on:click="reset" type="submit" class="btn col-6 reset-btn">Reset</button>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <div v-if="commissionsIsLoading" class="alert loading-alert" role="alert">
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
                                    <th scope="col" class="title">First Name</th>
                                    <th scope="col" class="title">Last Name</th>
                                    <th scope="col" class="title">Sales Count</th>
                                    <th scope="col" class="title">Amount</th>
                                    <th scope="col" class="title">Bonus</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(commission, index) in commissions">
                                    <tr v-bind:key="index">
                                        <th scope="row">{{ index + 1 }}</th>
                                        <td>{{ commission._id.fname }}</td>
                                        <td>{{ commission._id.lname }}</td>
                                        <td>{{ commission.count }}</td>
                                        <td><strong class="text-secondary">{{ commission.total | formatPrice('ETB') }}</strong></td>
                                        <td><strong class="text-secondary">{{ commission.bonus | formatPrice('ETB') }}</strong></td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
                <v-pagination v-if="commissionsMetaData" v-model="currentPage" :page-count="Math.ceil((commissionsMetaData != null ? commissionsMetaData.total : 1)/(commissionsMetaData != null ? commissionsMetaData.limit : 1))" :classes="bootstrapPaginationClasses" :labels="paginationAnchorTexts"></v-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import sidenav from '../components/Sidenav.vue'
import errorNav from '../components/Error_Nav.vue'
import { GET_COMMISSIONS } from '../store/action_types'
import  { START_DATE, END_DATE } from '../utils/const'
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
            },
            startDate: null,
            endDate: null
        }
    },
    watch: {
        commissionsMetaData: {
            handler() {
                this.currentPage = this.commissionsMetaData != null ? this.commissionsMetaData.currentPage : 1
            }
        },
        currentPage: {
            handler() {
                this.getCommissions()
                this.$router.replace({ ...this.$router.currentRoute, query: { page: this.currentPage } });
                this.scrollToTop()
            }
        },
    },
    computed: {
        commissions() {
            return this.$store.getters.commissions.data
        },
        commissionsIsLoading() {
            return this.$store.getters.commissions.isLoading
        },
        commissionsMetaData() {
            return this.$store.getters.commissions.metaData
        }, 
    },
    methods: {
        scrollToTop() {
            window.scrollTo(0,0);
        },
        setCurrentPage() {
            this.currentPage = (this.$route.query.page != null && parseInt(this.$route.query.page) > 0) ? this.$route.query.page : 1
        },
        // receives date in yyyy-mm--dd format and converts to epoch milliseconds
        convertDate(dateString, type) {
            console.log('dateString =>', dateString)
            // const d = dateString.split('-');
            if(type == START_DATE) {
                const date = new Date(dateString);
                date.setUTCHours(0, 0, 0, 999);
                return date.valueOf()
            } else if (type == END_DATE) {
                const date = new Date(dateString);
                date.setUTCHours(23, 59, 59, 999);
                return date.valueOf()
            }
            // return (new Date(d[0], d[1] - 1, d[2])).valueOf();
        },
        getCommissions() {
            const filters = {
                ...(this.startDate != null ? { startDate: this.convertDate(this.startDate, START_DATE) } : {}),
                ...(this.endDate != null ? { endDate: this.convertDate(this.endDate, END_DATE) } : {}),
            }
            console.log('filters', filters)
            this.$store.dispatch(GET_COMMISSIONS, { page: this.currentPage, ...filters })
        },
        reset() {
            this.startDate = null
            this.endDate = null
            this.$router.replace({ ...this.$router.currentRoute, query: null })
            this.$store.dispatch(GET_COMMISSIONS, { page: 1 })
        },
    },
    mounted() {
        this.setCurrentPage()
        this.getCommissions()
    }
}
</script>