<template>
      <!-- 彈窗背景 -->
  <div class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
    <!-- 彈窗內容 -->
    <div class="bg-white rounded-lg shadow-xl w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 overflow-auto p-6">
      <!-- 文章標題 -->
      <h2 class="text-xl font-semibold mb-4">{{ article.title }}</h2>
      <!-- 文章內容 -->
      <p class="mb-4">{{ article.content }}</p>
              <!--          評論區 
<h3 class="text-lg font-semibold mb-2">評論</h3>
        <div class="overflow-y-auto max-h-64 mb-4">
          評論列表
          <div class="border-b border-gray-200 mb-2" v-for="comment in comments" :key="comment.id">
            <p class="text-gray-700">{{ comment.author }}: {{ comment.content }}</p>
          </div>
        </div>  -->
      <!-- 關閉按鈕 -->
      <button @click="$emit('close')" class="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-600">
        關閉
      </button>
    </div>
  </div>
  </template>
  
  <script setup>
  import { ref, defineProps, onMounted, reactive } from 'vue';
  import { articleGetApi } from '../api/article.js';
  const article_id = defineProps(['article_id']);
  const article = reactive({
    title: "",
    content: "",   
  });
  onMounted(async () => {
    const response = await articleGetApi(article_id.value);
    if(response.data.code === 1) {
        article.value = response.data.data;

    }
    else {
        console.log('文章不存在');
    }
    
  });
  
  </script>