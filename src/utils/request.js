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
  constructor (config) {
    this.storyId = 1

    console.log('localStorage.storyId', localStorage.storyId)
    if (!_.isEmpty(localStorage.storyId) && localStorage.storyId !== 'null') {
      this.storyId = localStorage.storyId
      console.log('localStorage.storyId', localStorage.storyId)
    }
    this.config = config
    this.config.baseURL = host + '/api',
    this.token()
  }

  token () {
    // const token = generateToken(this.config.issuer, this.config.bid, this.config.kid, this.config.privateKey);
    var token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ5MDc0MTEzLCJqdGkiOiJkZjI0MWY3NGUzMDA0NWQ5ODEyZTViZWQzYTk5NWIwYiIsInVzZXJfaWQiOjF9.BMA9VKU8ewI6V9Sr9DRTkZ3s3eJHQvSG72GvqhL-brA'
    token = 'Bearer '
    token += localStorage.token

    this.axios = axios.create({ baseURL: this.config.baseURL })
    this.axios.defaults.headers.common.Authorization = token
  }

  async roles () {
    const response = await this.axios.get(`topics/${this.storyId}/roles/`)
    console.log('response', response)
    return response.data
  }

  async home() {
    try {
      const response = await this.axios.get(`topics/${this.storyId}/home/`)
      console.log('response', response)
      return response.data
    } catch (error) {
      console.log('home error: ' + error + error.response.data)
      console.log(error.response.data); 
      console.log('home error: ' , error instanceof Error)
      return error
    }
  }

  async initGame(role_id) {
    try {
      const response = await this.axios.post(`topics/${this.storyId}/init-game/`, {role_id})
      console.log('initGame response', response)
      return response.data
    } catch (error) {
      console.log('initGame error: ' , error)
      console.log('initGame error: ' , error.response.data); 
      return error
    }
  }

  async fragments (f) {
    const response = await this.axios.get(`fragments/${f}/`)
    console.log('response', response)
    return response.data
  }

  async search (q) {
    try {
     const response = await this.axios.get(`topics/${this.storyId}/fragments/?q=${q}`)
     console.log('response', response)
      return response.data
    } catch (error) {
      console.log('response mserrorerrorg', error)
      return null
    }
  }

  async unlock (unlockFragmentId) {
    const response = await this.axios.post(`topics/${this.storyId}/fragments/${unlockFragmentId}/unlock/`)
    console.log('response', response)
    return response.data
  }

  async pricing () {
    const response = await this.axios.get(`topics/${this.storyId}/pricing/`)
    console.log('response', response)
    return response.data
  }

//   這个接獲取驗證碼
  async getCode(phone_no) {
    try {
      const response = await this.axios.post(`phoneno-get-code/`, {phone_no})
      console.log('response', response)
      return response.data
    } catch (error) {
      console.log('response mserrorerrorg', error)
      return null
    }
  }
// 這一个接口用來登錄/注冊
  async phonenoLogin(phone_no, user_input_code) {
    try {
    const response = await this.axios.post(`phoneno-login/`, {phone_no, user_input_code})
      console.log('response', response)
      //save token here  
      localStorage.token = _.get(response.data, 'access')
      localStorage.refresh = _.get(response.data, 'refresh')
      return response.data
    } catch (error) {
      console.log('response mserrorerrorg', error)
      console.log(error.response.data); 
      const res = _.get(error.response.data, 'non_field_errors')
      const res2 = _.get(error.response.data, 'user_input_code')
      if (!_.isEmpty(res)) {
        error.message = res[0]
        return error
      } else if ( !_.isEmpty(res2) ) {
        error.message = res2[0]
        return error
      }
      return error
    }
  }

  async tokenVerify() {
    try {
    const response = await this.axios.post(`token/verify/`, { token: localStorage.token  })
      console.log('verify token response', response)
      return true
    } catch (error) {
      console.log('response mserrorerrorg', error)

       // local refresh is null, login again to get token and refresh token
       if (_.isEmpty(localStorage.refresh)) {
        return false
      } else {
        // refresh token
        // keep login
         const api = new Store({})
        const res = await api.tokenRefresh()
        console.log('tokenRefresh', res)
        return res
       }
      
      
    }
  }

  async tokenRefresh() {
    try {
      //用refresh换取新的access
      const response = await this.axios.post(`token/refresh/`, { refresh: localStorage.refresh })
      console.log('refresh response', response)

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


  async login () {
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
    // if (Session.get('access') !== null) {
    //   access = Session.get('access')
    //   access = 'Bearer ' + access
    // }
    const options = {
      method: 'POST',
      url: this.config.baseURL + '/simple-wechat-login/',
      headers:
            {
              // 'Access-Control-Allow-Origin': 'http://localhost:3001',
              // 'X-WX-PAGES': pageRoutes.join(','),
              Authorization: access,
              // 'X-WX-APP-ID': 'wx1f692d7b9b57066d',
              'Content-Type': 'application/json'
            },
      data: mokeuser
    }
    console.log('------options', options)
    const response = await axios(options)
    return response.data
  }

  handleAxiosError (error) {
    console.log('response err', error)
    console.log('response err', error.msg)
  }

  handleUnexpectedError (error) {
    this.handleAxiosError(error)
  }

  async orders (pricing_id) {
    try {
      const { data, statusCode, msg } = await this.axios.post(`topics/${this.storyId}/orders/`, { pricing_id })
      console.log('response data', data)
      // var success = false
      // if (statusCode === 200 || statusCode === 201 || statusCode === 204) {
      //   success = true
      // }
      // if (!success) {
      //     console.log('response msg', msg)
      // }
      return data
    } catch (error) {
      console.log('response mserrorerrorg', error)
      if (axios.isAxiosError(error)) {
        this.handleAxiosError(error)
      } else {
        this.handleUnexpectedError(error)
      }
    }
  }
}

export default Store
