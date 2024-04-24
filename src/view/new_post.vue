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


const userInfo = JSON.parse(localStorage.getItem('userInfo'));

// 创建一个 ref 来管理表单数据
const formData = ref(new FormData());

// 添加表单字段
formData.value.append('title', '');
formData.value.append('content', '');

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

// 处理表单提交
const handleSubmit = async () => {
  try {
    // console.log(formData.value);
    // for (const [key, value] of formData.value.entries()) {
    //   formDataJSON[key] = value;
    // }
    let data = {
      username: userInfo.username,
      address: userInfo.address,
      title: formData.value.title,
      content: formData.value.content,
      coverPhoto: image.value
    }
    console.log(data);
    const response = await articlePortApi(data);
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
  }
};
</script>

<style lang="less">
</style>
