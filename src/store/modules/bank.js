import axios from 'axios'
import router from '../../router'
import asyncHandler from '@/utils/async_handler'
import { SET_BANK_ACCOUNT, SET_BANK_ACCOUNTS, SET_ERRORMSG } from '../mutation_types'
import { GET_BANK_ACCOUNT, GET_BANK_ACCOUNTS, ADD_BANK_ACCOUNT, EDIT_BANK_ACCOUNT, CLEAR_BANK_ISLOADING, TOGGLE_BANK_ACCOUNT_ACTIVE_STATUS } from '../action_types'
import { BANK_ACCOUNTS_URL, ADD_BANK_ACCOUNT_URL, EDIT_BANK_ACCOUNT_URL, TOGGLE_BANK_ACCOUNT_ACTIVE_STATUS_URL } from '../../utils/urls'

const bank = {
    state: {
        bankAccount: {
            data: null,
            isLoading: false
        },
        bankAccounts: {
            data: null,
            isLoading: false,
            metaData: null
        }
    },
    getters: {
        bankAccount: state => state.bankAccount,
        bankAccounts: state => state.bankAccounts
    },
    mutations: {
        [SET_BANK_ACCOUNT]: (state, payload) => { payload.data != null ? state.bankAccount.data = payload.data : null, state.bankAccount.isLoading = payload.isLoading },
        [SET_BANK_ACCOUNTS]: (state, payload) => { payload.data != null ? state.bankAccounts.data = payload.data : null, state.bankAccounts.isLoading = payload.isLoading, payload.metaData != null ? state.bankAccounts.metaData = payload.metaData : null }
    },
    actions: {
        [GET_BANK_ACCOUNTS]: asyncHandler(async({ commit }) => {
            commit(SET_BANK_ACCOUNTS, { data: null, isLoading: true })
            const result = await axios.get(BANK_ACCOUNTS_URL)
            if (result.data.status) {
                commit(SET_BANK_ACCOUNTS, { data: result.data.data, isLoading: false, metaData: result.data.metaData })
                return
            }
            commit(SET_BANK_ACCOUNTS, { isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)
        }),
        [GET_BANK_ACCOUNT]: asyncHandler(async({ commit }, payload) => {
            commit(SET_BANK_ACCOUNT, { isLoading: true })
            const result = await axios.get(BANK_ACCOUNTS_URL, {
                params: {
                    _id: payload.id,
                    selectField: '+accountName'
                }
            })
            if (result.data.status) {
                commit(SET_BANK_ACCOUNT, { data: result.data.data[0], isLoading: false })
                return
            }
            commit(SET_BANK_ACCOUNT, { isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)
        }),
        [ADD_BANK_ACCOUNT]: asyncHandler(async({ commit }, payload) => {
            commit(SET_BANK_ACCOUNT, { isLoading: true })
            const result = await axios.post(ADD_BANK_ACCOUNT_URL, {
                ...payload
            })
            if (result.data.status) {
                commit(SET_BANK_ACCOUNT, { data: result.data.data, isLoading: false })
                router.go(-1)
                return
            }
            commit(SET_BANK_ACCOUNT, { isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)
        }),
        [EDIT_BANK_ACCOUNT]: asyncHandler(async({ commit }, payload) => {
            commit(SET_BANK_ACCOUNT, { isLoading: true })
            const result = await axios.put(EDIT_BANK_ACCOUNT_URL, {
                ...payload
            })
            if (result.data.status) {
                commit(SET_BANK_ACCOUNT, { data: result.data.data, isLoading: false })
                router.go(-1)
                return
            }
            commit(SET_BANK_ACCOUNT, { isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)
        }),
        [TOGGLE_BANK_ACCOUNT_ACTIVE_STATUS]: asyncHandler(async({ commit, state }, payload) => {
            commit(SET_BANK_ACCOUNT, { data: payload, isLoading: true })
            const result = await axios.put(TOGGLE_BANK_ACCOUNT_ACTIVE_STATUS_URL, {
                _id: payload._id
            })

            if (result.data.status) {
                let index
                state.bankAccounts.data.forEach((e, i) => {
                    if (e._id == result.data.data._id) {
                        index = i
                    }
                })
                state.bankAccounts.data[index].isActive = result.data.data.isActive
                commit(SET_BANK_ACCOUNT, { data: result.data.data, isLoading: false })
                return
            }
            commit(SET_BANK_ACCOUNT, { isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)
        }),
        [CLEAR_BANK_ISLOADING]: asyncHandler(async({ commit }) => {
            commit(SET_BANK_ACCOUNT, { isLoading: false })
            commit(SET_BANK_ACCOUNTS, { isLoading: false })
        })
    }
}

export default bank