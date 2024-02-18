import axios from 'axios'
import asyncHandler from '@/utils/async_handler'
import { SET_COMMISSIONS, SET_ERRORMSG } from '../mutation_types'
import { GET_COMMISSIONS, CLEAR_COMMISSIONS_ISLOADING } from '../action_types'
import { COMMISSIONS_URL } from '../../utils/urls'
import { COMMISSIONS_PERCENTAGE } from '../../utils/const'

const commissions = {
    state: {
        commissions: {
            data: null,
            isLoading: false,
            metaData: null
        }
    },
    getters: {
        commissions: state => state.commissions
    },
    mutations: {
        [SET_COMMISSIONS]: (state, payload) => { payload.data != null ? state.commissions.data = payload.data : null, state.commissions.isLoading = payload.isLoading, payload.metaData != null ? state.commissions.metaData = payload.metaData : null }
    },
    actions: {
        [GET_COMMISSIONS]: asyncHandler(async({ commit }, payload) => {
            commit(SET_COMMISSIONS, { data: null, isLoading: true })
            const result = await axios.get(COMMISSIONS_URL, {
                params: {
                    ...payload,
                    page: payload.page || 1,
                    commissionPercentage: COMMISSIONS_PERCENTAGE
                }
            })
            if (result.data.status) {
                commit(SET_COMMISSIONS, { data: result.data.data, isLoading: false, metaData: result.data.metaData })
                return
            }
            commit(SET_COMMISSIONS, { isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)
        }),
        [CLEAR_COMMISSIONS_ISLOADING]: asyncHandler(async({ commit }) => {
            commit(SET_COMMISSIONS, { isLoading: false })
        })
    }
}

export default commissions