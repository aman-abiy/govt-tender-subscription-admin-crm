import axios from 'axios'
import asyncHandler from '@/utils/async_handler'
import { SET_USERS_LAST_10_DAYS, SET_USERS_BY_SERVICE, SET_USERS_BY_SUBSCIPTION_STATUS, SET_SALES_LAST_10_DAYS, SET_CURRENT_MONTH_SALES, SET_ERRORMSG } from '../mutation_types'
import { GET_USERS_LAST_10_DAYS, GET_USERS_BY_SERVICE, GET_USERS_BY_SUBSCIPTION_STATUS, GET_SALES_LAST_10_DAYS, GET_CURRENT_MONTH_SALES, CLEAR_STATS_ISLOADING } from '../action_types'
import { USERS_LAST_10_DAYS_URL, USERS_BY_SERVICE_URL, USERS_BY_SUBSCIPTION_STATUS_URL, SALES_LAST_10_DAYS_URL, CURRENT_MONTH_SALES_URL } from '../../utils/urls'

const stats = {
    state: {
        usersLast10Days: {
            data: null,
            isLoading: false
        },
        usersByService: {
            data: null,
            isLoading: false
        },
        usersBySubscriptionStatus: {
            data: null,
            isLoading: false
        },
        salesLast10Days: {
            data: null,
            isLoading: false
        },
        currentMonthSales: {
            data: null,
            isLoading: false
        }
    },
    getters: {
        usersLast10Days: state => state.usersLast10Days,
        usersByService: state => state.usersByService,
        usersBySubscriptionStatus: state => state.usersBySubscriptionStatus,
        salesLast10Days: state => state.salesLast10Days,
        currentMonthSales: state => state.currentMonthSales
    },
    mutations: {
        [SET_USERS_LAST_10_DAYS]: (state, payload) => { payload.data != null ? state.usersLast10Days.data = payload.data : null, state.usersLast10Days.isLoading = payload.isLoading },
        [SET_USERS_BY_SERVICE]: (state, payload) => { payload.data != null ? state.usersByService.data = payload.data : null, state.usersByService.isLoading = payload.isLoading },
        [SET_USERS_BY_SUBSCIPTION_STATUS]: (state, payload) => { payload.data != null ? state.usersBySubscriptionStatus.data = payload.data : null, state.usersBySubscriptionStatus.isLoading = payload.isLoading },
        [SET_SALES_LAST_10_DAYS]: (state, payload) => { payload.data != null ? state.salesLast10Days.data = payload.data : null, state.salesLast10Days.isLoading = payload.isLoading },
        [SET_CURRENT_MONTH_SALES]: (state, payload) => { payload.data != null ? state.currentMonthSales.data = payload.data : null, state.currentMonthSales.isLoading = payload.isLoading },
    },
    actions: {
        [GET_USERS_LAST_10_DAYS]: asyncHandler(async({ commit }) => {
            commit(SET_USERS_LAST_10_DAYS, { data: null, isLoading: true })
            const result = await axios.get(USERS_LAST_10_DAYS_URL)
            if (result.data.status) {
                commit(SET_USERS_LAST_10_DAYS, { data: result.data.data, isLoading: false })
            }
            commit(SET_USERS_LAST_10_DAYS, { data: result.data.data, isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)

        }),
        [GET_USERS_BY_SERVICE]: asyncHandler(async({ commit }) => {
            commit(SET_USERS_BY_SERVICE, { data: null, isLoading: true })
            const result = await axios.get(USERS_BY_SERVICE_URL)
            if (result.data.status) {
                commit(SET_USERS_BY_SERVICE, { data: result.data.data, isLoading: false })
            }
            commit(SET_USERS_BY_SERVICE, { data: result.data.data, isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)

        }),
        [GET_USERS_BY_SUBSCIPTION_STATUS]: asyncHandler(async({ commit }) => {
            commit(SET_USERS_BY_SUBSCIPTION_STATUS, { data: null, isLoading: true })
            const result = await axios.get(USERS_BY_SUBSCIPTION_STATUS_URL)
            if (result.data.status) {
                commit(SET_USERS_BY_SUBSCIPTION_STATUS, { data: result.data.data, isLoading: false })
            }
            commit(SET_USERS_BY_SUBSCIPTION_STATUS, { data: result.data.data, isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)

        }),
        [GET_SALES_LAST_10_DAYS]: asyncHandler(async({ commit }) => {
            commit(SET_SALES_LAST_10_DAYS, { data: null, isLoading: true })
            const result = await axios.get(SALES_LAST_10_DAYS_URL)
            if (result.data.status) {
                commit(SET_SALES_LAST_10_DAYS, { data: result.data.data, isLoading: false })
            }
            commit(SET_SALES_LAST_10_DAYS, { data: result.data.data, isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)

        }),
        [GET_CURRENT_MONTH_SALES]: asyncHandler(async({ commit }) => {
            commit(SET_CURRENT_MONTH_SALES, { data: null, isLoading: true })
            const result = await axios.get(CURRENT_MONTH_SALES_URL)
            if (result.data.status) {
                commit(SET_CURRENT_MONTH_SALES, { data: result.data.data, isLoading: false })
            }
            commit(SET_CURRENT_MONTH_SALES, { data: result.data.data, isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)

        }),
        [CLEAR_STATS_ISLOADING]: asyncHandler(async({ commit }) => {
            commit(USERS_LAST_10_DAYS_URL, { isLoading: false })
            commit(SET_USERS_BY_SERVICE, { isLoading: false })
            commit(SET_USERS_BY_SUBSCIPTION_STATUS, { isLoading: false })
            commit(SET_SALES_LAST_10_DAYS, { isLoading: false })
            commit(SET_CURRENT_MONTH_SALES, { isLoading: false })
        })
    }
}

export default stats