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

// module.exports = {
//   host: host,
//   url: host + '/api',
//   check_openid: host + '/api/check_openid',
//   env: env,
//   mapKey: '',
 
// }

export default {
  host: host,
  url: host + '/api',
  check_openid: host + '/api/check_openid',
  env: env,
  mapKey: '',
} 