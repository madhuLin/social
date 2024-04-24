import { request } from "../utils/request.js";



export function articlePortApi(data) {
    return request({
        'url': 'article/upload',
        'method': 'post',
        data
      })
}


// export function signUpApi(data) {
//   return request({
//     'url': '/user/signUp',
//     'method': 'post',
//     data
//   })
// }

// // 建立IPFS實例
// // const ipfs = ipfsClient('ipfs.infura.io', '5001', { protocol: 'https' }); // 使用Infura節點
// // 或使用本機節點
// const ipfs = ipfsClient('localhost', '5001', { protocol: 'http' });

// //上傳檔案
// export const uploadFileToIPFS = async (file) => {
//     try {
//         const added = await ipfs.add(file);
//         const ipfsHash = added.path;
//         return ipfsHash;
//     } catch (error) {
//         console.error('Error uploading file to IPFS:', error);
//         throw error;
//     }
// };

// // 取得檔案
// export const getFileFromIPFS = async (ipfsHash) => {
//     try {
//         const fileBuffer = await ipfs.cat(ipfsHash);
//         return fileBuffer;
//     } catch (error) {
//         console.error('Error loading file from IPFS:', error);
//         throw error;
//     }
// };


// //先get一下我下载下来的公共网关列表
// Axios.get('./gateways.json').then((res) => {
//     //添加3个本地网关
//     let gateways = res.data;
//     const host1 = window.location.host;
//     const host2 = document.domain;
//     gateways = [
//         "http://127.0.0.1:8080/ipfs/:hash",
//         "http://" + host1 + "/ipfs/:hash",
//         "http://" + host2 + ":8080/ipfs/:hash"
//     ].concat(gateways);
//     //定义用于测试的hash和文本
//     const hashToTest = 'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a';
//     const hashString = 'Hello from IPFS Gateway Checker';
//     //定义在线的网关列表
//     const gatewayOnline = [];
//     gateways.forEach((value) => {
//         //拼接hash到网关url里
//         const gatewayAndHash = value.replace(':hash', hashToTest);
//         Axios.get(gatewayAndHash, { timeout: 5000 }).then((res) => {
//             const matched = res.data.trim() === hashString.trim();
//             if (matched) {
//                 //重新把hash替换成占位符
//                 const url = res.config.url.replace(hashToTest, ':hash');
//                 //把在线的网关添加到列表
//                 gatewayOnline.push(url);
//                 //把第一个返回的网关记录到全局变量中。
//                 if (this.$store.state.gateway == '') this.$store.commit('setGateWay', url);
//             }
//         }).catch((err) => {
//             //捕获到异常，无需处理
//         })
//     });
// })