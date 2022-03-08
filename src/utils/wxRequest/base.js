// import wepy from 'wepy'
// import Host from '@/utils/host'
// import Session from '@/utils/session'
import axios from 'axios';

// 0 开发环境 1 测试环境 2 生产环境
const env = 2

let host = ''
if (env === 0) {
  host = 'http://storiesmatter.cn:12344'//http://10.165.97.37:12344'
} else if (env == 1) {
  host = ''
} else if (env == 2) {
  host = 'https://www.storiesmatter.cn'
}

// 登录重试次数
let retryCount = 0

const doRequest = async (url, method, params, options = {}, callback) => {
  let cacheKey = ''
  // 是否可以命中缓存
  if (options.cacheKey) {
    // cacheKey = Session.key[options.cacheKey[0]][options.cacheKey[1]]
    const cache = getByCache(cacheKey)
    if (cache) return cache
  }
  let pageRoutes = []
  const pages = ''//getCurrentPages()
  if (pages.length > 0) {
    for (let p of pages) {
      pageRoutes.push(p.route)
    }
  }
  var access = ''
  // if (Session.get('access') !== null) {
  //   access = Session.get('access')
  //   access = 'Bearer ' + access
  // }
  let header = {
    'Content-Type': 'application/json',
    'X-WX-APP-ID': 'wx1f692d7b9b57066d',
    'X-WX-PAGES': pageRoutes.join(','),
    'Authorization': access,
  }

  
  // let a = wepy.request({
  //   url: url,
  //   method: method,
  //   data: params,
  //   header: header,
  // }).then((response) => {
  //   const statusCode = response.statusCode
  //   var success = false
  //   if (statusCode === 200 || statusCode === 201 || statusCode === 204) {
  //     success = true
  //   }
  // //   let logres='';//JSON.stringify(response)
  // //  console.log('-----response', method, url, params,  '\n  response:', logres + '\n\n')
  //   if (!success) {
  //   } else {
  //     return response.data
  //   }
  //   if (cacheKey != '') setByCache(cacheKey, response.data)

  //   if (typeof callback !== 'undefined') {
  //     callback(response.data)
  //   }
  // }, (err) => {
  //   // console.log('-----err', method, url, 'err:',JSON.stringify(err))
  //   if (typeof callback !== 'undefined') {
  //     callback(err)
  //   }
  // })


  // return a;
}
 
 

// 获取缓存,默认缓存时长 1 天
const getByCache = (cacheKey) => {
  const cacheValue = ''//Session.get(cacheKey)
  const onday = 86400
  // console.log((new Date().getTime() - Number.parseInt(cacheValue.createTime))/1000)
  if (cacheValue === null) {
    return false
  } else if ((new Date().getTime() - Number.parseInt(cacheValue.createTime)) / 1000 > onday) {
    return false
  }
  return cacheValue.value
}

// 设置缓存
const setByCache = (cacheKey, cacheVal) => {
  if (typeof cacheKey !== 'undefined') {
    if (Array.isArray(cacheVal) && cacheVal.length == 0) return false
    let localTime = new Date().getTime()
    Session.set(cacheKey, {
      createTime: localTime,
      value: cacheVal
    })
  }
}

export default {
  doRequest
}



