import $axios from '../api.js'

const state = () => ({
    couriers: [],
    page: 1,
    id: ''
})

const mutations = {
    ASSIGN_DATA(state, payload) {
        state.couriers = payload
    },
    SET_PAGE(state, payload) {
        state.page = payload
    },
    SET_ID_UPDATE(state,payload) {
        state.id = payload
    }
}

const actions = {

    getCouriers({ commit, state }, payload) {
        let search = typeof payload != 'undefined' ? payload: ''
        return new Promise((resolve, reject) => {
            $axios.get(`/couriers?page=${state.page}&q=${search}`)
            .then((response) => {
                commit('ASSIGN_DATA', response.data)
                resolve(response.data)
            })
        })
    },

    submitCourier({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            //MENGIRIMKAN PERMINTAAN KE SERVER DENGAN METHOD POST
            $axios.post(`/couriers`, payload, {
                //KARENA TERDAPAT FILE FOTO, MAKA HEADERNYA DITAMBAHKAN multipart/form-data
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((response) => {
                    //KETIKA BERHASIL, MAKA DILAKUKAN REQUEST UNTUK MENGAMBIL DATA KURIR TERBARU
                    dispatch('getCouriers').then(() => {
                        resolve(response.data)
                    })
                })
                .catch((error) => {
                    //JIKA GAGALNYA VALIDASI MAKA ERRONYA AKAN DI ASSIGN
                    if (error.response.status == 422) {
                        commit('SET_ERRORS', error.response.data.errors, { root: true })
                    }
                })
        })
    },

    editCourier({ commit }, payload) {
        return new Promise((resolve, reject) => {
            //FUNGSI UNTUK MELAKUKAN REQUEST SINGLE DATA BERDASARKAN ID KURIR
            $axios.get(`/couriers/${payload}/edit`)
                .then((response) => {
                    //DATA YANG DITERIMA AKAN DIKIRIMKAN KE FORM
                    resolve(response.data)
                })
        })
    },
    
    updateCourier({ state }, payload) {
        return new Promise((resolve, reject) => {
            //FUNGSI UNTUK MELAKUKAN REQUEST DATA PERUBAHAN DATA KURIR BERDASARKAN STATE ID KURIR
            $axios.post(`/couriers/${state.id}`, payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((response) => {
                    resolve(response.data)
                })
        })
    },

    removeCourier({ dispatch }, payload) {
        return new Promise((resolve, reject) => {
            //MELAKUKAN PERMINTAAN KE SERVER DENGAN METHOD DELETE DAN MENGIRIMKAN ID YANG AKAN DIHAPUS
            $axios.delete(`/couriers/${payload}`)
                .then((response) => {
                    //MENGAMBIL DATA TERBARU DARI SERVER
                    dispatch('getCouriers').then(() => resolve(response.data))
                })
        })
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}