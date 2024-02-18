<template>
    <div class="dashboard-body">
        <errorNav/>
        <div class="row">
            <sidenav class="col-2"/>
            <div class="col-10 content-section admin-dashboard-title">
                <nameNav :fname="user.fname" :lname="user.lname"/>
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
                <div class="card profile-card">
                    <div class="card-body">
                        <table v-if="user.bookmarks.length > 0" class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th scope="col" class="title">#</th>
                                    <th scope="col-3" class="title">Tilte</th>
                                    <th scope="col" class="title"></th>
                                    <th scope="col-1" class="title">Published</th>
                                    <th scope="col-1" class="title">Featured</th>
                                    <th scope="col" class="title">Published By</th>
                                    <th scope="col" class="title">Created At</th>
                                    <th scope="col" class="title">Last Modified At</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(tender, index) in user.bookmarks">
                                    <tr v-bind:key="index">
                                        <th scope="row">{{ index + 1 }}</th>
                                        <td><a href="">{{ tender.title }}</a></td>
                                        <td><a class="edit-btn" href="">Edit</a></td>
                                        <td><span v-if="(actingTender != null && actingTender._id == tender._id) && actingTenderIsLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span v-else v-on:click="changeTenderActiveStatus(tender._id)" :class="[tender.isActive ? 'badge-success' : 'badge-secondary', 'badge']">{{ tender.isActive ? 'Yes' :  'No' }}</span></td>
                                        <td><span v-if="(actingTender != null && actingTender._id == tender._id) && actingTenderIsLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span v-else v-on:click="changeTenderFeaturedStatus(tender._id)" :class="[tender.isFeatured ? 'badge-success' : 'badge-secondary', 'badge']">{{ tender.isFeatured ? 'Yes' :  'No' }}</span></td>
                                        <td>{{ tender.createdBy.fname | capitalize }}</td>
                                        <td>{{ tender.createdAt | formatDate | getDateOnly }}</td>
                                        <td>{{ tender.lastUpdatedAt | formatDate | getDateOnly }}</td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                        <emptyList message="User has no Bookmarked Tenders" v-else/>
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
import emptyList from '../../components/Empty_List.vue'
import { GET_USER, TOGGLE_USER_ACTIVE_STATUS, TOGGLE_TENDER_PUBLISHED_STATUS, TOGGLE_TENDER_ACTIVE_STATUS } from '../../store/action_types'
export default {
    components: {
        sidenav,
        errorNav,
        usersNav,
        nameNav,
        emptyList
    },
    data() {
        return {
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
        changeTenderActiveStatus(id) {
            this.$store.dispatch(TOGGLE_TENDER_PUBLISHED_STATUS, { _id: id })
        },
        changeTenderFeaturedStatus(id) {
            this.$store.dispatch(TOGGLE_TENDER_ACTIVE_STATUS, { _id: id })
        },
        getUser() {
            this.$store.dispatch(GET_USER, { id: this.$route.params.id })
        }
    },
    mounted() {
        this.getUser()
    }
}
</script>