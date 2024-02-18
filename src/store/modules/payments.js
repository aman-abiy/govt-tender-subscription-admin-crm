import axios from 'axios'
import asyncHandler from '@/utils/async_handler'
import { SET_PAYMENTS, SET_ERRORMSG } from '../mutation_types'
import { GET_PAYMENTS, CLEAR_PAYMENTS_ISLOADING } from '../action_types'
import { PAYMENTS_URL } from '../../utils/urls'

const payment = {
    state: {
        payments: {
            data: null,
            isLoading: false,
            metaData: null
        }
    },
    getters: {
        payments: state => state.payments
    },
    mutations: {
        [SET_PAYMENTS]: (state, payload) => { payload.data != null ? state.payments.data = payload.data : null, state.payments.isLoading = payload.isLoading, payload.metaData != null ? state.payments.metaData = payload.metaData : null }
    },
    actions: {
        [GET_PAYMENTS]: asyncHandler(async({ commit }, payload) => {
            commit(SET_PAYMENTS, { data: null, isLoading: true })
            console.log('payload payments', payload)
            const result = await axios.get(PAYMENTS_URL, {
                params: {
                    ...payload,
                    page: payload.page || 1,
                    sort: '-createdAt'
                }
            })
            if (result.data.status) {
                commit(SET_PAYMENTS, { data: result.data.data, isLoading: false, metaData: result.data.metaData })
                return
            }
            commit(SET_PAYMENTS, { isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)
        }),
        [CLEAR_PAYMENTS_ISLOADING]: asyncHandler(async({ commit }) => {
            commit(SET_PAYMENTS, { isLoading: false })
        })
    }
}

export default payment