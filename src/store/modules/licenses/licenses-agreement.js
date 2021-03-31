import axiosDefault from '@/axios/axios-default.js'
import axiosNoLoading from '@/axios/axios-no-loading.js'
import _ from 'lodash'

export const state = () => ({
  licensesAgreement: []
})

export const getters = {
  getLicenseAgreementHostAssociated: state => id => {
    const findHostAssociated = _.find(state.licensesAgreement, val => {
      return val.id === id
    })
    const hostsAssociated = findHostAssociated.hosts
    return hostsAssociated
  },
  returnLicensesAgreement: state => {
    return state.licensesAgreement
  },
  returnAgreeNumbers: state => {
    const agreeNumbers = []

    _.map(state.licensesAgreement, val => {
      agreeNumbers.push(val.agreementID)
    })
    return agreeNumbers
  },
  returnCsiNumbers: state => {
    const csiNumbers = []

    _.map(state.licensesAgreement, val => {
      csiNumbers.push(val.csi)
    })
    return csiNumbers
  },
  returnReferenceNumbers: state => {
    const referenceNumbers = []

    _.map(state.licensesAgreement, val => {
      referenceNumbers.push(val.referenceNumber)
    })
    return referenceNumbers
  }
}

export const mutations = {
  SET_LICENSE_AGREEMENT: (state, payload) => {
    state.licensesAgreement = payload
  }
}

export const actions = {
  async getLicensesAgreement({ commit }, noLoading = null) {
    let agreementList = null

    if (noLoading) {
      agreementList = await axiosNoLoading.get('/agreements/oracle/database')
    } else {
      agreementList = await axiosDefault.get('/agreements/oracle/database')
    }

    const response = await agreementList.data

    commit('SET_LICENSE_AGREEMENT', response)
  }
}