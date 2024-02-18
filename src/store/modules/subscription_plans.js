import axios from 'axios'
import router from '../../router'
import asyncHandler from '../../utils/async_handler'
import { SET_SUBSCRIPTION_PLAN, SET_SUBSCRIPTION_PLANS, SET_ERRORMSG } from '../mutation_types'
import { SUBSCRIPTION_PLANS_URL, ADD_SUBSCRIPTION_PLAN_URL, EDIT_SUBSCRIPTION_PLAN_URL, TOGGLE_SUBSCRIPTION_PLAN_ACTIVE_STATUS_URL } from '../../utils/urls'
import {
    GET_SUBSCRIPTION_PLANS,
    GET_SUBSCRIPTION_PLAN,
    ADD_SUBSCRIPTION_PLAN,
    EDIT_SUBSCRIPTION_PLAN,
    CLEAR_SUBSCRIPTION_PLANS_ISLOADING,
    TOGGLE_SUBSCRIPTION_PLAN_ACTIVE_STATUS
} from '../action_types'

const subscriptionPlan = {
    state: {
        subscriptionPlan: {
            data: null,
            isLoading: false
        },
        subscriptionPlans: {
            data: null,
            isLoading: false,
            metaData: null
        }
    },
    getters: {
        subscriptionPlan: state => state.subscriptionPlan,
        subscriptionPlans: state => state.subscriptionPlans,
    },
    mutations: {
        [SET_SUBSCRIPTION_PLAN]: (state, payload) => { payload.data != null ? state.subscriptionPlan.data = payload.data : null, state.subscriptionPlan.isLoading = payload.isLoading },
        [SET_SUBSCRIPTION_PLANS]: (state, payload) => { payload.data != null ? state.subscriptionPlans.data = payload.data : null, state.subscriptionPlans.isLoading = payload.isLoading, payload.metaData != null ? state.subscriptionPlans.metaData = payload.metaData : null }
    },
    actions: {
        [GET_SUBSCRIPTION_PLANS]: asyncHandler(async({ commit }) => {
            commit(SET_SUBSCRIPTION_PLANS, { isLoading: true })
            const result = await axios.get(SUBSCRIPTION_PLANS_URL)

            if (result.data.status) {
                commit(SET_SUBSCRIPTION_PLANS, { data: result.data.data, isLoading: false, metaData: result.data.metaData })
                return
            }
            commit(SET_SUBSCRIPTION_PLANS, { isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)
        }),
        [GET_SUBSCRIPTION_PLAN]: asyncHandler(async({ commit }, payload) => {
            commit(SET_SUBSCRIPTION_PLAN, { isLoading: true })
            const result = await axios.get(SUBSCRIPTION_PLANS_URL, {
                params: {
                    _id: payload.id
                }
            })

            if (result.data.status) {
                commit(SET_SUBSCRIPTION_PLAN, { data: result.data.data[0], isLoading: false })
                return
            }
            commit(SET_SUBSCRIPTION_PLAN, { isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)
        }),
        [ADD_SUBSCRIPTION_PLAN]: asyncHandler(async({ commit }, payload) => {
            commit(SET_SUBSCRIPTION_PLAN, { isLoading: true })
            const result = await axios.post(ADD_SUBSCRIPTION_PLAN_URL, {
                ...payload
            })
            if (result.data.status) {
                commit(SET_SUBSCRIPTION_PLAN, { data: result.data.data, isLoading: false })
                router.go(-1)
                return
            }
            commit(SET_SUBSCRIPTION_PLAN, { isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)
        }),
        [EDIT_SUBSCRIPTION_PLAN]: asyncHandler(async({ commit }, payload) => {
            commit(SET_SUBSCRIPTION_PLAN, { isLoading: true })
            const result = await axios.put(EDIT_SUBSCRIPTION_PLAN_URL, {
                ...payload
            })
            if (result.data.status) {
                commit(SET_SUBSCRIPTION_PLAN, { data: result.data.data, isLoading: false })
                router.go(-1)
                return
            }
            commit(SET_SUBSCRIPTION_PLAN, { isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)
        }),
        [TOGGLE_SUBSCRIPTION_PLAN_ACTIVE_STATUS]: asyncHandler(async({ commit, state }, payload) => {
            commit(SET_SUBSCRIPTION_PLAN, { data: payload, isLoading: true })
            const result = await axios.put(TOGGLE_SUBSCRIPTION_PLAN_ACTIVE_STATUS_URL, {
                _id: payload._id
            })

            if (result.data.status) {
                let index
                state.subscriptionPlans.data.forEach((e, i) => {
                    if (e._id == result.data.data._id) {
                        index = i
                    }
                })
                state.subscriptionPlans.data[index].isActive = result.data.data.isActive
                commit(SET_SUBSCRIPTION_PLAN, { data: result.data.data, isLoading: false })
                return
            }
            commit(SET_SUBSCRIPTION_PLAN, { isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)
        }),
        [CLEAR_SUBSCRIPTION_PLANS_ISLOADING]: asyncHandler(async({ commit }) => {
            commit(SET_SUBSCRIPTION_PLAN, { isLoading: false })
            commit(SET_SUBSCRIPTION_PLANS, { isLoading: false })
        })
    }
}

export default subscriptionPlan