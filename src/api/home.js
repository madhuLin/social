import { request } from "../utils/request.js";


export function articleListApi() {
    return request({
        'url': 'article/list',
        'method': 'get',
      })
}

export function boardListApi() {
  return request({
      'url': '/board',
      'method': 'get',
    })
}
