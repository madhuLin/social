import { request } from "../utils/request.js";

export function loginApi(data) {
    return request({
      'url': '/user/login',
      'method': 'post',
      data
    })
  }

  export function signUpApi(data) {
    return request({
      'url': '/user/signUp',
      'method': 'post',
      data
    })
  }

function getPhoneCode(data) {
    return $axios({
        'url': '/user/code',
        'method': 'get',
        params:{...data}
    })
}
function loginoutApi() {
  return $axios({
    'url': '/user/loginout',
    'method': 'post',
  })
}

  