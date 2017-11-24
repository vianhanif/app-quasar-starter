import axios from 'axios'
import config from '@/config'
require('es6-promise').polyfill()

const baseUrl = config.api.url.paymentaux
const timeout = config.api.timeout

class Api {
  static http (header) {
    return axios.create({
      timeout: timeout,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  static url () {
    return {
      LOGIN: `${baseUrl}/reset/ldapLogin`,
      RESET_PIN: `${baseUrl}/reset/generateOTP`,
      DATA_RESET_PIN: `${baseUrl}/reset/showTicket`,
      TOPUP_LIST: `${baseUrl}/topup/topupList`,
      EXECUTE_TOPUP: `${baseUrl}/topup/executeTopup`
    }
  }

  static get (header, url, success, error) {
    return setTimeout(() => {
      Api.http(header).get(url)
        .then(response => { success(response) })
        .catch(response => { error(response) })
    }, 500)
  }

  static post (header, url, body, success, error) {
    return setTimeout(() => {
      Api.http(header).post(url, body)
        .then(response => { success(response) })
        .catch(response => { error(response) })
    }, 500)
  }

  static executeTopup (header, body, success, error) {
    let url = Api.url().EXECUTE_TOPUP
    return Api.post(header, url, body, success, error)
  }

  static loadTopupList (header, body, success, error) {
    let params = Object.keys(body).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(body[key])
    }).join('&')
    let url = `${Api.url().TOPUP_LIST}?${params}`
    return Api.get(header, url, success, error)
  }

  static userLogin (header, body, success, error) {
    let url = Api.url().LOGIN
    return Api.post(header, url, body, success, error)
  }

  static resetPin (header, body, success, error) {
    let url = Api.url().RESET_PIN
    return Api.post(header, url, body, success, error)
  }

  static loadResetData (header, body, success, error) {
    let url = Api.url().DATA_RESET_PIN
    return Api.post(header, url, body, success, error)
  }
}

export default Api
