import axios from 'axios'
import _ from 'lodash'
// import Session from '@/utils/session'

const env = 2

let host = ''
if (env === 0) {
  host = 'http://storiesmatter.cn:12344'// http://10.165.97.37:12344'
} else if (env == 1) {
  host = ''
} else if (env == 2) {
  host = 'https://www.storiesmatter.cn'
}

class Store {
  constructor(config) {
    this.storyId = 1
    if (!_.isEmpty(localStorage.storyId) && localStorage.storyId !== 'null') {
      this.storyId = localStorage.storyId
    }
    this.config = config
    this.config.baseURL = host + '/api',
      this.token()
  }

  token() {
    // const token = generateToken(this.config.issuer, this.config.bid, this.config.kid, this.config.privateKey);
    // var token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ5MDc0MTEzLCJqdGkiOiJkZjI0MWY3NGUzMDA0NWQ5ODEyZTViZWQzYTk5NWIwYiIsInVzZXJfaWQiOjF9.BMA9VKU8ewI6V9Sr9DRTkZ3s3eJHQvSG72GvqhL-brA'
    // token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUwMTkzNDcxLCJqdGkiOiJlZmIzNzJkMjNlNjc0ZmUwOTY3MjEwZTEzZTFlM2VhMyIsInVzZXJfaWQiOjMwNTA3fQ.MPdrp4OxvtLjMu6mNss0ZPObHE3F-Eic1N5u6oStAF0'
    var token = 'Bearer ' + localStorage.token

    this.axios = axios.create({ baseURL: this.config.baseURL,  timeout: 5000 })
    this.axios.defaults.headers.common.Authorization = token
  }

  async roles() {
    const response = await this.axios.get(`topics/${this.storyId}/roles/`)
    return response.data
  }

  async home() {
    try {
      const response = await this.axios.get(`topics/${this.storyId}/home/`)
      return response.data
    } catch (error) {
      return error
    }
  }

  async initGame(role_id) {
    try {
      const response = await this.axios.post(`topics/${this.storyId}/init-game/`, { role_id })
      return response.data
    } catch (error) {
      return error
    }
  }

  async fragments(f) {
    const response = await this.axios.get(`fragments/${f}/`)
    return response.data
  }

  async search(q) {
    try {
      const response = await this.axios.get(`topics/${this.storyId}/fragments/?q=${q}`)
      return response.data
    } catch (error) {
      return null
    }
  }

  async unlock(unlockFragmentId) {
    const response = await this.axios.post(`topics/${this.storyId}/fragments/${unlockFragmentId}/unlock/`)
    return response.data
  }

  async pricing() {
    const response = await this.axios.get(`topics/${this.storyId}/pricing/`)
    return response.data
  }

  async orders(pricing_id, js_code) {
    try {
      const response = await this.axios.post(`topics/${this.storyId}/orders/`, { pricing_id, js_code })
      return response.data
    } catch (error) {
      const res = _.get(error.response.data, 'msg')
     // another type of error
      // {"errcode":"40029","errmsg":"invalid code, rid: 623d8350-5aaf78a5-21548a6c"}
      const errmsg = _.get(error.response.data, 'errmsg')
      if (!_.isEmpty(res)) {
        error.message = res
      }
      else if (!_.isEmpty(errmsg)) {
        error.message = errmsg
      }
      return error
    }
  }

  //   這个接獲取驗證碼
  async getCode(phone_no) {
    try {
      const response = await this.axios.post(`phoneno-get-code/`, { phone_no })
      return response.data
    } catch (error) {
      const res = _.get(error.response.data, 'non_field_errors')
      const res2 = _.get(error.response.data, 'phone_no')
      if (!_.isEmpty(res)) {
        error.message = res[0]
        return error
      } else if (!_.isEmpty(res2)) {
        error.message = res2[0]
        return error
      }
    }
  }
  // 這一个接口用來登錄/注冊
  async phonenoLogin(phone_no, user_input_code) {
    try {
      const response = await this.axios.post(`phoneno-login/`, { phone_no, user_input_code })
      //save token here  
      localStorage.token = _.get(response.data, 'access')
      localStorage.refresh = _.get(response.data, 'refresh')
      return response.data
    } catch (error) {
      const res = _.get(error.response.data, 'non_field_errors')
      const res2 = _.get(error.response.data, 'user_input_code')
      if (!_.isEmpty(res)) {
        error.message = res[0]
        return error
      } else if (!_.isEmpty(res2)) {
        error.message = res2[0]
        return error
      }
      return error
    }
  }

  async tokenVerify() {
    try {
      const response = await this.axios.post(`token/verify/`, { token: localStorage.token })
      return true
    } catch (error) {
      // local refresh is null, login again to get token and refresh token
      if (_.isEmpty(localStorage.refresh)) {
        return false
      } else {
        // refresh token
        // keep login
        const api = new Store({})
        const res = await api.tokenRefresh()
        return res
      }
    }
  }

  async tokenRefresh() {
    try {
      //用refresh换取新的access
      const response = await this.axios.post(`token/refresh/`, { refresh: localStorage.refresh })
      if (!_.isEmpty(response.data)) {
        localStorage.token = _.get(response.data, 'access')
        // get new token
        return true
      }
      return false
    } catch (error) {
      console.log('tokenRefresh', error)
      return false
    }
  }


  async login() {
    const mokeuser = {
      avatar_url: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM6pjAcqAwjE9l9Yc8bex4lrJ2PFE9rnJXvM0oSicxW8liadwT46J3pOMdHJ1scGR2jHiaEnVHWqcdYMA/132',
      city: '',
      country: '',
      gender: 0,
      js_code: '091gvxGa1ypdMC0tOrJa1cOmJQ1gvxG3',
      language: 'zh_CN',
      nick_name: '谷晓洁Sage',
      province: ''
    }
    const pageRoutes = []
    const pages = ''
    if (pages.length > 0) {
      for (const p of pages) {
        pageRoutes.push(p.route)
      }
    }
    const access = ''
    const options = {
      method: 'POST',
      url: this.config.baseURL + '/simple-wechat-login/',
      headers:
      {
        Authorization: access,
        'Content-Type': 'application/json'
      },
      data: mokeuser
    }
    const response = await axios(options)
    return response.data
  }
}

export default Store
