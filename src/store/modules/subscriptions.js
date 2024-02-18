import axios from 'axios'
import router from '../../router'
import asyncHandler from '../../utils/async_handler'
import { SET_SUBSCRIPTION, SET_SUBSCRIPTIONS, SET_ERRORMSG } from '../mutation_types'
import { GET_SUBSCRIPTION, GET_SUBSCRIPTIONS, EDIT_SUBSCRIPTION, CLEAR_SUBSCRIPTIONS_ISLOADING, ADD_SUBSCRIPTION, ADD_PENDING_SUBSCRIPTION } from '../action_types'
import { SUBSCRIPTIONS_URL, EDIT_SUBSCRIPTION_URL, ADD_SUBSCRIPTION_URL, ADD_PENDING_SUBSCRIPTION_URL } from '../../utils/urls'
import { getDeviceInfo } from '../../utils/device'

const subscriptions = {
    state: {
        subscription: {
            data: null,
            isLoading: false
        },
        subscriptions: {
            data: null,
            isLoading: false,
            metaData: null
        }
    },
    getters: {
        subscription: state => state.subscription,
        subscriptions: state => state.subscriptions
    },
    mutations: {
        [SET_SUBSCRIPTION]: (state, payload) => { payload.data != null ? state.subscription.data = payload.data : null, state.subscription.status = payload.status, state.subscription.isLoading = payload.isLoading },
        [SET_SUBSCRIPTIONS]: (state, payload) => { payload.data != null ? state.subscriptions.data = payload.data : null, state.subscriptions.status = payload.status, state.subscriptions.isLoading = payload.isLoading, payload.metaData != null ? state.subscriptions.metaData = payload.metaData : null },
    },
    actions: {
        [GET_SUBSCRIPTIONS]: asyncHandler(async({ commit }, payload) => {
            commit(SET_SUBSCRIPTIONS, { isLoading: true })
            const result = await axios.get(SUBSCRIPTIONS_URL, {
                params: {
                    page: payload.page || 1,
                    sort: '-createdAt'
                }
            })
            if (result.data.status) {
                commit(SET_SUBSCRIPTIONS, { data: result.data.data, isLoading: false, metaData: result.data.metaData })
                return
            }
            commit(SET_SUBSCRIPTIONS, { data: result.data.data, isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)
        }),
        [GET_SUBSCRIPTION]: asyncHandler(async({ commit }, payload) => {
            commit(SET_SUBSCRIPTION, { data: null, isLoading: true })
            const result = await axios.get(SUBSCRIPTIONS_URL, {
                params: {
                    _id: payload.id
                }
            })
            if (result.data.status) {
                commit(SET_SUBSCRIPTION, { data: result.data.data[0], isLoading: false, metaData: result.data.metaData })
                return
            }
            commit(SET_SUBSCRIPTION, { data: result.data.data, isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)
        }),
        [EDIT_SUBSCRIPTION]: asyncHandler(async({ commit, state }, payload) => {
            commit(SET_SUBSCRIPTION, { isLoading: true })
            const deviceInfo = await getDeviceInfo()
            const result = await axios.put(EDIT_SUBSCRIPTION_URL, {
                ...payload,
                deviceInfo: deviceInfo
            })

            if (result.data.status) {
                let index
                state.subscriptions.data.forEach((e, i) => {
                    if (e._id == result.data.data._id) {
                        index = i
                    }
                })
                state.subscriptions.data[index] = result.data.data
                commit(SET_SUBSCRIPTION, { data: result.data.data, isLoading: false })
                router.go(-1)
                return
            }
            commit(SET_SUBSCRIPTION, { isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)
        }),
        [ADD_SUBSCRIPTION]: asyncHandler(async({ commit, state }, payload) => {
            commit(SET_SUBSCRIPTION, { isLoading: true })
            const result = await axios.post(ADD_SUBSCRIPTION_URL, {
                ...payload
            })

            if (result.data.status) {
                state.subscriptions.data.push(result.data.data)
                commit(SET_SUBSCRIPTION, { data: result.data.data, isLoading: false })
                router.go(-1)
                return
            }
            commit(SET_SUBSCRIPTION, { isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)
        }),
        [ADD_PENDING_SUBSCRIPTION]: asyncHandler(async({ commit, state }, payload) => {
            commit(SET_SUBSCRIPTION, { isLoading: true })
            const result = await axios.post(ADD_PENDING_SUBSCRIPTION_URL, {
                ...payload
            })

            if (result.data.status) {
                state.subscriptions.data.push(result.data.data)
                commit(SET_SUBSCRIPTION, { data: result.data.data, isLoading: false })
                router.go(-1)
                return
            }
            commit(SET_SUBSCRIPTION, { isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)
        }),
        [CLEAR_SUBSCRIPTIONS_ISLOADING]: asyncHandler(async({ commit }) => {
            commit(SET_SUBSCRIPTION, { isLoading: false })
            commit(SET_SUBSCRIPTIONS, { isLoading: false })
        })
    }
}

export default subscriptions