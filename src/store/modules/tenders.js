import axios from 'axios'
import asyncHandler from '../../utils/async_handler'
import { SET_TENDER, SET_TENDERS, SET_ERRORMSG } from '../mutation_types'
import { GET_TENDER, GET_TENDERS, CLEAR_TENDER, EDIT_TENDER, TOGGLE_TENDER_PUBLISHED_STATUS, TOGGLE_TENDER_ACTIVE_STATUS, TOGGLE_TENDER_FEATURED_STATUS, CLEAR_TENDERS_ISLOADING } from '../action_types'
import { TENDERS_URL, EDIT_TENDER_URL, TOGGLE_TENDER_PUBLISHED_STATUS_URL, TOGGLE_TENDER_ACTIVE_STATUS_URL, TOGGLE_TENDER_FEATURED_STATUS_URL } from '../../utils/urls'
import { getDeviceInfo } from '../../utils/device'
import { DEFAULT_TENDERS_LIMIT, DEFAULT_TENDER_MINIMAL_FILEDS } from '../../utils/const'

const tenders = {
    state: {
        tender: {
            data: null,
            isLoading: false
        },
        tenders: {
            data: null,
            isLoading: false,
            metaData: null
        }
    },
    getters: {
        tender: state => state.tender,
        tenders: state => state.tenders
    },
    mutations: {
        [SET_TENDER]: (state, payload) => { payload.data != null ? state.tender.data = payload.data : null, state.tender.status = payload.status, state.tender.isLoading = payload.isLoading },
        [SET_TENDERS]: (state, payload) => { payload.data != null ? state.tenders.data = payload.data : null, state.tenders.status = payload.status, state.tenders.isLoading = payload.isLoading, payload.metaData != null ? state.tenders.metaData = payload.metaData : null },
    },
    actions: {
        [GET_TENDERS]: asyncHandler(async({ commit, dispatch }, payload) => {
            commit(SET_TENDERS, { isLoading: true })
            const result = await axios.get(TENDERS_URL, {
                params: {
                    page: payload.page || 1,
                    limit: DEFAULT_TENDERS_LIMIT,
                    selectFields: DEFAULT_TENDER_MINIMAL_FILEDS,
                    sort: '-createdAt'
                }
            })
            console.log('result.data.data', result.data.data)

            if (result.data.status) {
                commit(SET_TENDERS, { data: result.data.data, isLoading: false, metaData: result.data.metaData })
                return
            }
            commit(SET_TENDERS, { data: result.data.data, isLoading: false })
            dispatch(SET_ERRORMSG, result.data.msg)
        }),
        [GET_TENDER]: asyncHandler(async({ commit }, payload) => {
            console.log('_id: payload.id', { _id: payload.id })
            commit(SET_TENDER, { data: null, isLoading: true })
            let result = await axios.get(TENDERS_URL, {
                params: {
                    _id: payload.id
                }
            })
            if (result.data.status) {
                commit(SET_TENDER, { data: result.data.data[0], isLoading: false })
                return
            }
            commit(SET_ERRORMSG, result.data.msg)
            commit(SET_TENDER, { isLoading: false })
        }),
        [EDIT_TENDER]: asyncHandler(async({ commit, state }, payload) => {
            commit(SET_TENDER, { data: payload, isLoading: true })
            const deviceInfo = await getDeviceInfo()
            const result = await axios.put(EDIT_TENDER_URL, {
                ...payload,
                deviceInfo: deviceInfo
            })

            if (result.data.status) {
                let index
                state.tenders.data.forEach((e, i) => {
                    if (e._id == result.data.data._id) {
                        index = i
                    }
                })
                state.tenders.data[index] = result.data.data
                commit(SET_TENDER, { isLoading: false })
                return
            }
            commit(SET_TENDER, { isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)
        }),
        [TOGGLE_TENDER_PUBLISHED_STATUS]: asyncHandler(async({ commit, state }, payload) => {
            commit(SET_TENDER, { data: payload, isLoading: true })
            const result = await axios.put(TOGGLE_TENDER_PUBLISHED_STATUS_URL, {
                _id: payload._id,
            })

            if (result.data.status) {
                let index
                state.tenders.data.forEach((e, i) => {
                    if (e._id == result.data.data._id) {
                        index = i
                    }
                })
                state.tenders.data[index] = result.data.data
                commit(SET_TENDER, { isLoading: false })
                return
            }
            commit(SET_TENDER, { isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)
        }),
        [TOGGLE_TENDER_FEATURED_STATUS]: asyncHandler(async({ commit, state }, payload) => {
            commit(SET_TENDER, { data: payload, isLoading: true })
            const result = await axios.put(TOGGLE_TENDER_FEATURED_STATUS_URL, {
                _id: payload._id,
            })

            if (result.data.status) {
                let index
                state.tenders.data.forEach((e, i) => {
                    if (e._id == result.data.data._id) {
                        index = i
                    }
                })
                state.tenders.data[index] = result.data.data
                commit(SET_TENDER, { isLoading: false })
                return
            }
            commit(SET_TENDER, { isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)
        }),
        [TOGGLE_TENDER_ACTIVE_STATUS]: asyncHandler(async({ commit, state }, payload) => {
            commit(SET_TENDER, { data: payload, isLoading: true })
            const result = await axios.put(TOGGLE_TENDER_ACTIVE_STATUS_URL, {
                _id: payload._id,
            })
            if (result.data.status) {
                let index
                state.tenders.data.forEach((e, i) => {
                    if (e._id == result.data.data._id) {
                        index = i
                    }
                })
                state.tenders.data[index] = result.data.data
                commit(SET_TENDER, { isLoading: false })
                return
            }
            commit(SET_TENDER, { isLoading: false })
            commit(SET_ERRORMSG, result.data.msg)
        }),
        [CLEAR_TENDER]: asyncHandler(async({ commit }) => {
            commit(SET_TENDER, { data: null, isLoading: false })
        }),
        [CLEAR_TENDERS_ISLOADING]: asyncHandler(async({ commit }) => {
            commit(SET_TENDER, { isLoading: false })
            commit(SET_TENDERS, { isLoading: false })
        })
    }
}

export default tenders