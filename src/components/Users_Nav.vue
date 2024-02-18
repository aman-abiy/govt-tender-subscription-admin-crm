<template>
    <div class="card users-nav">
        <div class="card-body">
            <div class="d-flex flex-wrap user-profile-btns">
                <router-link :to="{ name: USERS_PROFILE_ROUTE }" :class="[ routeName == USERS_PROFILE_ROUTE ? 'active' : null, 'btn']">Profile</router-link>
                <router-link :to="{ name: USERS_SUBSCRIPTIONS_ROUTE }" :class="[ [USERS_SUBSCRIPTIONS_ROUTE, USERS_ADD_SUBSCRIPTIONS_ROUTE, EDIT_USERS_SUBSCRIPTIONS_ROUTE].includes(routeName) ? 'active' : null, 'btn']">Subscriptions</router-link>
                <router-link :to="{ name: USERS_BILLING_HISTORY_ROUTE }" :class="[ routeName == USERS_BILLING_HISTORY_ROUTE ? 'active' : null, 'btn']">Billing History</router-link>
                <router-link :to="{ name: USERS_ALERT_EMAILS_ROUTE }" :class="[ routeName == USERS_ALERT_EMAILS_ROUTE ? 'active' : null, 'btn']">Alert Emails</router-link>
                <router-link :to="{ name: USERS_BOOKMARKS_ROUTE }" :class="[ routeName == USERS_BOOKMARKS_ROUTE ? 'active' : null, 'btn']">Bookmarks</router-link>
                <router-link :to="{ name: USERS_ACTIVITIES_ROUTE }" :class="[ routeName == USERS_ACTIVITIES_ROUTE ? 'active' : null, 'btn']">Activities</router-link>
                <router-link :to="{ name: USERS_SETTINGS_ROUTE }" :class="[ routeName == USERS_SETTINGS_ROUTE ? 'active' : null, 'btn']">Settings</router-link>
            </div>
        </div>
    </div>
</template>
<script>
import { 
    USERS_PROFILE_ROUTE, 
    USERS_SUBSCRIPTIONS_ROUTE, 
    USERS_BOOKMARKS_ROUTE, 
    USERS_ACTIVITIES_ROUTE, 
    USERS_BILLING_HISTORY_ROUTE,
    USERS_ALERT_EMAILS_ROUTE,
    USERS_ADD_SUBSCRIPTIONS_ROUTE, 
    USERS_SETTINGS_ROUTE,
    EDIT_USERS_SUBSCRIPTIONS_ROUTE
} from '../utils/routes'
export default {
    data() {
        return {
            USERS_PROFILE_ROUTE,
            USERS_SUBSCRIPTIONS_ROUTE,
            USERS_BOOKMARKS_ROUTE,
            USERS_ACTIVITIES_ROUTE,
            USERS_BILLING_HISTORY_ROUTE,
            USERS_ALERT_EMAILS_ROUTE,
            USERS_ADD_SUBSCRIPTIONS_ROUTE,
            USERS_SETTINGS_ROUTE,
            EDIT_USERS_SUBSCRIPTIONS_ROUTE
        }
    },
    computed: {
        routeName() {
            return this.$route.name
        },
    }
}
</script>