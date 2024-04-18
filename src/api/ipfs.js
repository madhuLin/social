// import ipfsClient from 'ipfs-http-client';

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