import { request } from "../utils/request.js";

export function articleChainListApi() {
  return request({
      url: `article/chainList`,
      method: 'get',
  });
}

export function articleChainInfoApi(id) {
  return request({
      url: `article/chainInfo/${id}`,
      method: 'get',
  });
}

export function articleGetApi(id) {
  return request({
      url: `article/${id}`,
      method: 'get',
  });
}

export function commentListApi(){
  return request({
    url : `article/commentList`,
    method : 'get',
  });
}
export function addCommentApi(data) {
  return request({
    url : `article/addComment`,
    method : 'post',
    data : data
  });

}