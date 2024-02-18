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
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th scope="col" class="title">#</th>
                                    <th scope="col" class="title">Type</th>
                                    <th scope="col" class="title">Device</th>
                                    <th scope="col" class="title">IP Address</th>
                                    <th scope="col" class="title">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(activity, index) in user.sessionActivity">
                                    <tr v-bind:key="index">
                                        <th scope="row">{{ index + 1 }}</th>
                                        <td>- {{ activity.type }} -</td>
                                        <td>{{ activity.deviceInfo ? activity.deviceInfo.device.platform : '-' }}</td>
                                        <td>{{ activity.deviceInfo ? activity.deviceInfo.ip : '-' }}</td>
                                        <td>{{ activity.timestamp | formatDate  | getDateAndTime }}</td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
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
import { GET_USER, TOGGLE_USER_ACTIVE_STATUS } from '../../store/action_types'

export default {
    components: {
        sidenav,
        errorNav,
        usersNav,
        nameNav
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
        getUser() {
            this.$store.dispatch(GET_USER, { id: this.$route.params.id })
        }
    },
    mounted() {
        this.getUser()
    }
}
</script>