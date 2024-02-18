import axios from 'axios'
import asyncHandler from '@/utils/async_handler'
import { SET_CURRENCIES, SET_ERRORMSG } from '../mutation_types'
import { GET_CURRENCIES, CLEAR_CURRENCIES_ISLOADING } from '../action_types'
import { CURRENCIES_URL } from '../../utils/urls'

const currency = {
    state: {
        currency: {
            data: null,
            isLoading: false
        }
    },
    getters: {
        currency: state => state.currency
    },
    mutations: {
        [SET_CURRENCIES]: (state, payload) => { payload.data != null ? state.currency.data = payload.data : null, state.currency.isLoading = payload.isLoading },
    },
    actions: {
        [GET_CURRENCIES]: asyncHandler(async({ commit }) => {
            commit(SET_CURRENCIES, { data: null, isLoading: true })
            const result = await axios.get(CURRENCIES_URL)
            if (result.data.status) {
                commit(SET_CURRENCIES, { data: result.data.data, isLoading: false })
                return
            }
            commit(SET_CURRENCIES, { isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)
        }),
        [CLEAR_CURRENCIES_ISLOADING]: asyncHandler(async({ commit }) => {
            commit(SET_CURRENCIES, { isLoading: false })
        })
    }
}

export default currency