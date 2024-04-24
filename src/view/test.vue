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

// 创建一个 ref 来管理表单数据
const formData = ref(new FormData());

// 添加表单字段
formData.value.append('title', '');
formData.value.append('content', '');

// 处理表单提交
const handleSubmit = async () => {
  try {
    // 调用 API 方法提交表单数据
    const response = await articlePortApi(formData.value);
    console.log('Article uploaded:', response);
    // 重置表单数据
    formData.value = new FormData();
    // 添加表单字段
    formData.value.append('title', '');
    formData.value.append('content', '');
  } catch (error) {
    console.error('Error uploading article:', error);
  }
};

// 处理文件上传
const handleFileUpload = (event) => {
  // 将文件添加到 FormData 对象中
  formData.value.append('coverPhoto', event.target.files[0]);
};
</script>

<style lang="less">
</style>