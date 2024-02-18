import axios from 'axios'
import router from '../../router'
import asyncHandler from '../../utils/async_handler'
import { SET_USER, SET_USERS, SET_ADMINS, SET_ERRORMSG } from '../mutation_types'
import { GET_USER, GET_USERS, GET_ADMINS, EDIT_USER, TOGGLE_USER_ACTIVE_STATUS, CLEAR_USERS_ISLOADING, ADD_USER, SET_USER_ALERT_SETTINGS } from '../action_types'
import { USERS_URL, EDIT_USER_URL, TOGGLE_USER_ACTIVE_STATUS_URL, ADD_USER_URL } from '../../utils/urls'
import { DEFAULT_USER_MINIMAL_FILEDS, ADMIN_AND_SALES_COORDINATOR_ROLES } from '../../utils/const'
import { USERS_ROUTE } from '../../utils/routes'
import { getDeviceInfo } from '../../utils/device'

const users = {
    state: {
        user: {
            data: null,
            isLoading: false
        },
        users: {
            data: null,
            isLoading: false,
            metaData: null
        },
        admins: {
            data: null,
            isLoading: false,
            metaData: null
        }
    },
    getters: {
        user: state => state.user,
        users: state => state.users,
        admins: state => state.admins
    },
    mutations: {
        [SET_USER]: (state, payload) => { payload.data != null ? state.user.data = payload.data : null, state.user.status = payload.status, state.user.isLoading = payload.isLoading },
        [SET_USERS]: (state, payload) => { payload.data != null ? state.users.data = payload.data : null, state.users.status = payload.status, state.users.isLoading = payload.isLoading, payload.metaData != null ? state.users.metaData = payload.metaData : null },
        [SET_ADMINS]: (state, payload) => { payload.data != null ? state.admins.data = payload.data : null, state.admins.status = payload.status, state.admins.isLoading = payload.isLoading, payload.metaData != null ? state.admins.metaData = payload.metaData : null },
    },
    actions: {
        [GET_USERS]: asyncHandler(async({ commit }, payload) => {
            commit(SET_USERS, { isLoading: true })
            const result = await axios.get(USERS_URL, {
                params: {
                    ...payload,
                    page: payload.page || 1,
                    selectFields: DEFAULT_USER_MINIMAL_FILEDS,
                    sort: '-createdAt'
                }
            })
            if (result.data.status) {
                commit(SET_USERS, { data: result.data.data, isLoading: false, metaData: result.data.metaData })
                return
            }
            commit(SET_USERS, { data: result.data.data, isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)
        }),
        [GET_ADMINS]: asyncHandler(async({ commit }) => {
            commit(SET_ADMINS, { isLoading: true })
            const result = await axios.get(USERS_URL, {
                params: {
                    roles: ADMIN_AND_SALES_COORDINATOR_ROLES,
                }
            })
            if (result.data.status) {
                commit(SET_ADMINS, { data: result.data.data, isLoading: false, metaData: result.data.metaData })
                return
            }
            commit(SET_ADMINS, { data: result.data.data, isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)
        }),
        [GET_USER]: asyncHandler(async({ commit }, payload) => {
            commit(SET_USER, { data: null, isLoading: true })
            const result = await axios.get(USERS_URL, {
                params: {
                    _id: payload.id
                }
            })
            if (result.data.status) {
                commit(SET_USER, { data: result.data.data[0], isLoading: false })
                return
            }
            commit(SET_USER, { isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)
        }),
        [ADD_USER]: asyncHandler(async({ commit }, payload) => {
            commit(SET_USER, { data: null, isLoading: true })
            const result = await axios.post(ADD_USER_URL, {
                ...payload
            })
            console.log('result.data.data', result.data.data[0])
            if (result.data.status) {
                commit(SET_USER, { data: result.data.data, isLoading: false })
                router.push({ name: USERS_ROUTE })
                return
            }
            commit(SET_USER, { isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)
        }),
        [EDIT_USER]: asyncHandler(async({ commit, state }, payload) => {
            commit(SET_USER, { isLoading: true })
            const deviceInfo = await getDeviceInfo()
            const result = await axios.put(EDIT_USER_URL, {
                ...payload,
                deviceInfo: deviceInfo
            })

            if (result.data.status) {
                let index
                state.users.data.forEach((e, i) => {
                    if (e._id == result.data.data._id) {
                        index = i
                    }
                })
                state.users.data[index] = result.data.data
                commit(SET_USER, { data: result.data.data, isLoading: false })
                router.go(-1)
                return
            }
            commit(SET_USER, { isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)
        }),
        [TOGGLE_USER_ACTIVE_STATUS]: asyncHandler(async({ commit, state }, payload) => {
            commit(SET_USER, { data: payload, isLoading: true })
            const deviceInfo = await getDeviceInfo()
            const result = await axios.put(TOGGLE_USER_ACTIVE_STATUS_URL, {
                _id: payload._id,
                deviceInfo: deviceInfo
            })

            if (result.data.status) {
                let index
                state.users.data.forEach((e, i) => {
                    if (e._id == result.data.data._id) {
                        index = i
                    }
                })
                state.users.data[index].isActive = result.data.data.isActive
                commit(SET_USER, { data: result.data.data, isLoading: false })
                return
            }
            commit(SET_USER, { isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)
        }),
        [SET_USER_ALERT_SETTINGS]: asyncHandler(async({ commit }, payload) => {
            commit(SET_USER, { isLoading: true })
            const deviceInfo = await getDeviceInfo()
            const result = await axios.put(EDIT_USER_URL, {
                ...payload.alertSetting,
                deviceInfo: deviceInfo
            })

            if (result.data.status) {
                commit(SET_USER, { data: result.data.data, status: true, isLoading: false })
                return
            }
            commit(SET_USER, { data: null, status: false, isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)
        }),
        [CLEAR_USERS_ISLOADING]: asyncHandler(async({ commit }) => {
            commit(SET_USER, { isLoading: false })
            commit(SET_USERS, { isLoading: false })
        })
    }
}

export default users