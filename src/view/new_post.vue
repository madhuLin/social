<template>
  <div class="space-y-12 bg-white text-gray-700">
    <form @submit.prevent="handleSubmit">
      <div class="space-y-6">
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" id="title" v-model="formData.title" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
        </div>

        <div>
          <label for="content" class="block text-sm font-medium text-gray-700">Content</label>
          <textarea id="content" v-model="formData.content" rows="5" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea>
        </div>

        <div>
          <label for="cover-photo" class="block text-sm font-medium text-gray-700">Cover Photo</label>
          <input type="file" id="cover-photo" @change="handleFileUpload" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
          <img v-if="image" :src="image" width="200"/>
          <p class="mt-2 text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">是否上链</label>
          <div class="flex items-center">
            <input type="radio" @click="changeType(true)" name="Blockchain" value="true" v-model="formData.isOnChain" class="mr-2 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
            <label for="isOnChainYes" class="text-sm text-gray-700">是</label>
          </div>
          <div class="flex items-center">
            <input type="radio" @click="changeType(false)" id="isOnChainNo" name="Blockchain" value="false" v-model="formData.isOnChain" class="mr-2 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" checked>
            <label for="isOnChainNo" class="text-sm text-gray-700">否</label>
          </div>
        </div>


      </div>

      <div class="mt-6 flex justify-end">
        <button type="button" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">Cancel</button>
        <button type="submit" class="ml-3 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">Save</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { articlePortApi } from '../api/ipfs.js';
import useWeb3 from "../hooks/useWeb3";
const {web3, socialContract, getAccount, contractAddress} = useWeb3();

const userInfo = JSON.parse(localStorage.getItem('userInfo'));
function changeType(boolen) {
  formData.value.OnChain = boolen;
}

// 创建一个 ref 来管理表单数据
const formData = ref(new FormData());

// 添加表单字段
formData.value.append('title', '');
formData.value.append('content', '');
formData.value.append('isOnChain', false);

// 创建一个 ref 来管理图片
const image = ref(null);

// 处理文件上传和显示
const handleFileUpload = (event) => {
  const file = event.target.files.item(0);
  formData.value.append('coverPhoto', file);

  // 显示图片
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    image.value = reader.result;
  });
  reader.readAsDataURL(file);
};

const handleSubmit = async () => {
  let response; // 在函数作用域内声明 response 变量
  try {
    let data = {
      username: userInfo.username,
      title: formData.value.title,
      address: userInfo.address,
      title: formData.value.title,
      content: formData.value.content,
      publicationDate: new Date()
    }
    console.log(formData.value.OnChain);
    response = await articlePortApi(data);
    if(response.data.code === 1) {
      console.log("上傳伺服器成功!");
      console.log("上鏈:",formData.value.OnChain, response.data.data);
      if(formData.value.OnChain) {
        data.content = response.data.data;
        await uploadArticleBlockchain(data);
      }
    }
    else {
      console.log("上傳失敗!");
    }
    console.log('Article uploaded:', response);
    // 重置表单数据
    formData.value = new FormData();
    // 添加表单字段
    formData.value.append('title', '');
    formData.value.append('content', '');
    // 重置图片
    image.value = null;
  } catch (error) {
    console.error('Error uploading article:', error);
    console.log('Article uploaded:', response); // 在这里使用 response 变量
  }
};



const uploadArticleBlockchain = async (data) => {
  console.log("uploadArticleBlockchain");
  const account = await getAccount();
  const publicationDate = Math.floor(new Date().getTime() / 1000); // 将当前时间转换为 Unix 时间戳
  const transactionParameters = {
    from: account,
    to: contractAddress,
    value: "0",
    data: socialContract.methods.publish(data.username, data.title, data.content, publicationDate).encodeABI(),
  };
  try {
    const transactionHash = await ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    console.log("交易已提交，交易哈希:", transactionHash);
    // 可以添加額外的邏輯處理，例如等待交易確認或處理交易回執等
  } catch (error) {
    console.error("發送交易時出錯:", error);
  }
};


</script>

<style lang="less">
</style>
