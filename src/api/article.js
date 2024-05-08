import { request } from "../utils/request.js";


export function articleChainInfoApi(id) {
  return request({
      url: `article/chainInfo/${id}`,
      method: 'get',
  });
}