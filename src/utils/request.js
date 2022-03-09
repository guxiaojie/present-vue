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
    this.config = config
    this.config.baseURL = host + '/api',
    this.token()
  }

  token () {
    // const token = generateToken(this.config.issuer, this.config.bid, this.config.kid, this.config.privateKey);
    const token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ5MDc0MTEzLCJqdGkiOiJkZjI0MWY3NGUzMDA0NWQ5ODEyZTViZWQzYTk5NWIwYiIsInVzZXJfaWQiOjF9.BMA9VKU8ewI6V9Sr9DRTkZ3s3eJHQvSG72GvqhL-brA'

    this.axios = axios.create({ baseURL: this.config.baseURL })
    this.axios.defaults.headers.common.Authorization = token
  }

  async roles () {
    const response = await this.axios.get(`topics/${this.storyId}/roles/`)
    console.log('response', response)
    return response.data
  }

  async home () {
    const response = await this.axios.get(`topics/${this.storyId}/home/`)
    console.log('response', response)
    return response.data
  }

  async fragments (f) {
    const response = await this.axios.get(`fragments/${f}/`)
    console.log('response', response)
    return response.data
  }

  async home () {
    const response = await this.axios.get(`topics/${this.storyId}/home/`)
    console.log('response', response)
    return response.data
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
