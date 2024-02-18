import axios from 'axios'
import router from '../../router'
import asyncHandler from '../../utils/async_handler'
import { SET_ACCOUNT, SET_SESSION_TOKEN, SET_ERRORMSG } from '../mutation_types'
import { LOGIN_URL, UPDATE_AUTH_ACCOUNT, LOGOUT_URL } from '../../utils/urls'
import {
    LOGIN,
    LOGOUT,
    LOGOUT_LOCALLY,
    CLEAR_ACCOUNT_ISLOADING,
    UPDATE_ACCOUNT
} from '../action_types'
import { LOGIN_ROUTE } from '../../utils/routes'
// import { getDeviceInfo } from '../../utils/device'
import { AUTH_ALLOWED_ROLES } from '../../utils/const'
import { ROLE_NOT_PERMITTED } from '../../utils/error_msgs'

const account = {
    state: {
        account: {
            data: null,
            status: null,
            isLoading: false
        },
        sessionToken: null
    },
    getters: {
        account: state => state.account,
        sessionToken: state => state.sessionToken
    },
    mutations: {
        [SET_ACCOUNT]: (state, payload) => { payload.data != null ? state.account.data = payload.data : null, state.account.status = payload.status, state.account.isLoading = payload.isLoading },
        [SET_SESSION_TOKEN]: (state, payload) => { state.sessionToken = payload }
    },
    actions: {
        [LOGIN]: asyncHandler(async({ commit }, payload) => {
            commit(SET_ACCOUNT, { data: null, isLoading: true })
                // const deviceInfo = await getDeviceInfo()
            const result = await axios.post(LOGIN_URL, {
                email: payload.email,
                mobile: payload.mobile,
                password: payload.password,
                // deviceInfo: deviceInfo
            })
            if (result.data.status) {
                // check roles
                if (result.data.data.roles.some((e) => AUTH_ALLOWED_ROLES.includes(e))) {
                    commit(SET_SESSION_TOKEN, result.data.sessionToken)
                    commit(SET_ACCOUNT, { data: result.data.data, isLoading: false })
                    router.go()
                    return
                }
                commit(SET_ACCOUNT, { data: null, isLoading: false })
                commit(SET_ERRORMSG, ROLE_NOT_PERMITTED)
                return
            }
            commit(SET_ACCOUNT, { data: null, isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)
        }),
        [LOGOUT]: asyncHandler(async({ commit }) => {
            commit(SET_ACCOUNT, { data: null, isLoading: true })
                // const deviceInfo = await getDeviceInfo()
            const result = await axios.post(LOGOUT_URL, {
                // deviceInfo: deviceInfo
            })

            if (result.data.status) {
                commit(SET_ACCOUNT, { data: null, isLoading: false })
                commit(SET_SESSION_TOKEN, null)
                router.push({ name: LOGIN_ROUTE })
                return
            }
            commit(SET_ACCOUNT, { data: null, isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)
        }),
        [LOGOUT_LOCALLY]: asyncHandler(async({ commit }) => {
            commit(SET_ACCOUNT, { data: null, isLoading: true })
            commit(SET_SESSION_TOKEN, null)
            router.push({ name: LOGIN_ROUTE })
            commit(SET_ACCOUNT, { data: null, isLoading: false })
        }),
        [UPDATE_ACCOUNT]: asyncHandler(async({ commit }) => {
            const result = await axios.get(UPDATE_AUTH_ACCOUNT)

            if (result.data.status) {
                commit(SET_ACCOUNT, { data: result.data.data })
                return
            }
        }),
        [CLEAR_ACCOUNT_ISLOADING]: asyncHandler(async({ commit }) => {
            commit(SET_ACCOUNT, { isLoading: false })
        })
    }
}

export default account