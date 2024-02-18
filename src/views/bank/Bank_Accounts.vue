<template>
    <div class="dashboard-body">
        <errorNav/>
        <div class="row">
            <sidenav class="col-2"/>
            <div class="col-10 content-section admin-dashboard-title">
                <div class="card title-card">
                    <div class="card-body">
                        <div class="row">
                            <h4 class="col-6">Bank Accounts <span v-if="bankAccountsMetaData" class="count">({{ bankAccountsMetaData.total }})</span></h4>
                            <router-link :to="{ name: ADD_BANK_ACCOUNT_ROUTE }" class="btn col-1 ml-auto add-user-btn">Add Account</router-link>
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
                        <div v-if="bankAccountsIsLoading" class="alert loading-alert" role="alert">
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
                                    <th scope="col" class="title">ISO3</th>
                                    <th scope="col" class="title"></th>
                                    <th scope="col" class="title">Account Number</th>
                                    <th scope="col" class="title">Status</th>
                                    <th scope="col" class="title">Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(bank, index) in bankAccounts">
                                    <tr v-bind:key="index">
                                        <th scope="row">{{ index + 1 }}</th>
                                        <td><strong>{{ bank.name }}</strong></td>
                                        <td><strong>{{ bank.iso3 }}</strong></td>
                                        <td><router-link :to="{ name: EDIT_BANK_ACCOUNT_ROUTE, params: { id: bank._id } }">Edit</router-link></td>
                                        <td><strong class="text-secondary">{{ bank.accountNumber }}</strong></td>
                                        <td><span v-if="(bankAccountIsLoading && (bankAccount._id == bank._id))" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span v-else v-on:click="changeBankAccountActiveStatus(bank._id)" :class="[ bank.isActive ? 'badge-success' : 'badge-secondary', 'badge status-badge']">{{ bank.isActive ? 'ACTIVE' : 'DISABLED' }}</span></td>
                                        <td>{{ bank.createdAt | formatDate  | getDateOnly }}</td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
                <v-pagination v-if="bankAccountsMetaData" v-model="currentPage" :page-count="Math.ceil((bankAccountsMetaData != null ? bankAccountsMetaData.total : 1)/(bankAccountsMetaData != null ? bankAccountsMetaData.limit : 1))" :classes="bootstrapPaginationClasses" :labels="paginationAnchorTexts"></v-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import sidenav from '../../components/Sidenav.vue'
import errorNav from '../../components/Error_Nav.vue'
import { ADD_BANK_ACCOUNT_ROUTE, EDIT_BANK_ACCOUNT_ROUTE } from '../../utils/routes'
import { GET_BANK_ACCOUNTS, TOGGLE_BANK_ACCOUNT_ACTIVE_STATUS } from '../../store/action_types'
export default {
    components: {
        sidenav,
        errorNav
    },
    data() {
        return {
            ADD_BANK_ACCOUNT_ROUTE: ADD_BANK_ACCOUNT_ROUTE,
            EDIT_BANK_ACCOUNT_ROUTE: EDIT_BANK_ACCOUNT_ROUTE,
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
        bankAccountsMetaData: {
            handler() {
                this.currentPage = this.bankAccountsMetaData != null ? this.bankAccountsMetaData.currentPage : 1
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
        bankAccount() {
            return this.$store.getters.bankAccount.data
        },
        bankAccountIsLoading() {
            return this.$store.getters.bankAccount.isLoading
        },
        bankAccounts() {
            return this.$store.getters.bankAccounts.data
        },
        bankAccountsIsLoading() {
            return this.$store.getters.bankAccounts.isLoading
        },
        bankAccountsMetaData() {
            return this.$store.getters.bankAccounts.metaData
        }
    },
    methods: {
        scrollToTop() {
            window.scrollTo(0,0);
        },
        setCurrentPage() {
            this.currentPage = (this.$route.query.page != null && parseInt(this.$route.query.page) > 0) ? this.$route.query.page : 1
        },
        changeBankAccountActiveStatus(id) {
            this.$store.dispatch(TOGGLE_BANK_ACCOUNT_ACTIVE_STATUS, { _id: id })
        },
        getBankAccounts() {
            this.$store.dispatch(GET_BANK_ACCOUNTS)
        }
    },
    mounted() {
        this.setCurrentPage()
        this.getBankAccounts()
    }
}
</script>