import axios from 'axios'
import asyncHandler from '@/utils/async_handler'
import { SET_EMAILS_SENT, SET_USER_ALERT_EMAILS, SET_ERRORMSG } from '../mutation_types'
import { GET_EMAILS_SENT, GET_USER_ALERT_EMAILS, CLEAR_EMAILS_SENT_ISLOADING } from '../action_types'
import { EMAILS_SENT_URL } from '../../utils/urls'

const emailsSent = {
    state: {
        emailsSent: {
            data: null,
            isLoading: false,
            metaData: null
        },
        userAlertEmails: {
            data: null,
            isLoading: false,
            metaData: null
        }
    },
    getters: {
        emailsSent: state => state.emailsSent,
        userAlertEmails: state => state.userAlertEmails
    },
    mutations: {
        [SET_EMAILS_SENT]: (state, payload) => { payload.data != null ? state.emailsSent.data = payload.data : null, state.emailsSent.isLoading = payload.isLoading, payload.metaData != null ? state.emailsSent.metaData = payload.metaData : null },
        [SET_USER_ALERT_EMAILS]: (state, payload) => { payload.data != null ? state.userAlertEmails.data = payload.data : null, state.userAlertEmails.isLoading = payload.isLoading, payload.metaData != null ? state.userAlertEmails.metaData = payload.metaData : null }
    },
    actions: {
        [GET_EMAILS_SENT]: asyncHandler(async({ commit }, payload) => {
            commit(SET_EMAILS_SENT, { isLoading: true })
            const result = await axios.get(EMAILS_SENT_URL, {
                params: {
                    page: payload.page || 1,
                    sort: '-createdAt'
                }
            })
            if (result.data.status) {
                commit(SET_EMAILS_SENT, { data: result.data.data, isLoading: false, metaData: result.data.metaData })
                return
            }
            commit(SET_EMAILS_SENT, { isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)
        }),
        [GET_USER_ALERT_EMAILS]: asyncHandler(async({ commit }, payload) => {
            commit(SET_USER_ALERT_EMAILS, { isLoading: true })
            const result = await axios.get(EMAILS_SENT_URL, {
                params: {
                    type: 'alert',
                    account: payload.account,
                    page: payload.page || 1,
                    sort: '-createdAt'
                }
            })
            if (result.data.status) {
                commit(SET_USER_ALERT_EMAILS, { data: result.data.data, isLoading: false, metaData: result.data.metaData })
                return
            }
            commit(SET_USER_ALERT_EMAILS, { isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)
        }),
        [CLEAR_EMAILS_SENT_ISLOADING]: asyncHandler(async({ commit }) => {
            commit(SET_EMAILS_SENT, { isLoading: false })
            commit(SET_USER_ALERT_EMAILS, { isLoading: false })
        })
    }
}

export default emailsSent