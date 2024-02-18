import axios from 'axios'
import router from '../../router'
import asyncHandler from '@/utils/async_handler'
import { SET_PAYMENT_METHOD, SET_PAYMENT_METHODS, SET_ERRORMSG } from '../mutation_types'
import { GET_PAYMENT_METHOD, GET_PAYMENT_METHODS, ADD_PAYMENT_METHOD, EDIT_PAYMENT_METHOD, CLEAR_PAYMENT_METHOD_ISLOADING, TOGGLE_PAYMENT_METHOD_ACTIVE_STATUS } from '../action_types'
import { PAYMENT_METHODS_URL, ADD_PAYMENT_METHOD_URL, EDIT_PAYMENT_METHOD_URL, TOGGLE_PAYMENT_METHOD_ACTIVE_STATUS_URL } from '../../utils/urls'

const paymentMethod = {
    state: {
        paymentMethod: {
            data: null,
            isLoading: false
        },
        paymentMethods: {
            data: null,
            isLoading: false,
            metaData: null
        }
    },
    getters: {
        paymentMethod: state => state.paymentMethod,
        paymentMethods: state => state.paymentMethods
    },
    mutations: {
        [SET_PAYMENT_METHOD]: (state, payload) => { payload.data != null ? state.paymentMethod.data = payload.data : null, state.paymentMethod.isLoading = payload.isLoading },
        [SET_PAYMENT_METHODS]: (state, payload) => { payload.data != null ? state.paymentMethods.data = payload.data : null, state.paymentMethods.isLoading = payload.isLoading, payload.metaData != null ? state.paymentMethods.metaData = payload.metaData : null }
    },
    actions: {
        [GET_PAYMENT_METHODS]: asyncHandler(async({ commit }) => {
            commit(SET_PAYMENT_METHODS, { data: null, isLoading: true })
            const result = await axios.get(PAYMENT_METHODS_URL)
            if (result.data.status) {
                commit(SET_PAYMENT_METHODS, { data: result.data.data, isLoading: false, metaData: result.data.metaData })
                return
            }
            commit(SET_PAYMENT_METHODS, { isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)
        }),
        [GET_PAYMENT_METHOD]: asyncHandler(async({ commit }, payload) => {
            commit(SET_PAYMENT_METHOD, { isLoading: true })
            const result = await axios.get(PAYMENT_METHODS_URL, {
                params: {
                    _id: payload.id,
                }
            })
            if (result.data.status) {
                commit(SET_PAYMENT_METHOD, { data: result.data.data[0], isLoading: false })
                return
            }
            commit(SET_PAYMENT_METHOD, { isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)
        }),
        [ADD_PAYMENT_METHOD]: asyncHandler(async({ commit }, payload) => {
            commit(SET_PAYMENT_METHOD, { isLoading: true })
            const result = await axios.post(ADD_PAYMENT_METHOD_URL, {
                ...payload
            })
            if (result.data.status) {
                commit(SET_PAYMENT_METHOD, { data: result.data.data, isLoading: false })
                router.go(-1)
                return
            }
            commit(SET_PAYMENT_METHOD, { isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)
        }),
        [EDIT_PAYMENT_METHOD]: asyncHandler(async({ commit }, payload) => {
            commit(SET_PAYMENT_METHOD, { isLoading: true })
            const result = await axios.put(EDIT_PAYMENT_METHOD_URL, {
                ...payload
            })
            if (result.data.status) {
                commit(SET_PAYMENT_METHOD, { data: result.data.data, isLoading: false })
                router.go(-1)
                return
            }
            commit(SET_PAYMENT_METHOD, { isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)
        }),
        [TOGGLE_PAYMENT_METHOD_ACTIVE_STATUS]: asyncHandler(async({ commit, state }, payload) => {
            commit(SET_PAYMENT_METHOD, { data: payload, isLoading: true })
            const result = await axios.put(TOGGLE_PAYMENT_METHOD_ACTIVE_STATUS_URL, {
                _id: payload._id
            })

            if (result.data.status) {
                let index
                state.paymentMethods.data.forEach((e, i) => {
                    if (e._id == result.data.data._id) {
                        index = i
                    }
                })
                state.paymentMethods.data[index].isActive = result.data.data.isActive
                commit(SET_PAYMENT_METHOD, { data: result.data.data, isLoading: false })
                return
            }
            commit(SET_PAYMENT_METHOD, { isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)
        }),
        [CLEAR_PAYMENT_METHOD_ISLOADING]: asyncHandler(async({ commit }) => {
            commit(SET_PAYMENT_METHOD, { isLoading: false })
            commit(SET_PAYMENT_METHODS, { isLoading: false })
        })
    }
}

export default paymentMethod