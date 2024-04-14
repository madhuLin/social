<template>
  <div class="flex justify-center">
    <!-- 看板 -->
    <div class="flex flex-col w-1/4 bg-social-primary">
      <h2 class="text-xl font-bold mb-4">精選看板</h2>
      <ul class="list-none">
        <li v-for="(name, id) in boards" :key="id" class="mb-2">
          <a :href="`/board/${id}`" class="text-blue-600 hover:text-blue-800">{{ name }}</a>
        </li>
      </ul>
    </div>
    <!-- 文章 -->
    <div class="flex flex-col w-3/4">
      <h2 class="text-xl font-bold mb-4">文章列表</h2>
      <div class="articles">
        <!-- 渲染文章清單 -->
        <div class="article" v-for="article in articles" :key="article.articleId">
          <div class="flex justify-between mb-2">
            <p class="font-bold">作者：{{ article.articleAuthorName }}</p>
            <p>發佈日期：{{ formatDate(article.publicationDate) }}</p>
          </div>
          <h3 class="text-lg font-bold mb-2">{{ article.articleTitle }}</h3>
          <a-typography-paragraph
            :ellipsis="ellipsis ? { rows: 2, expandable: true, symbol: 'more' } : false"
            :content="article.articleContent"
            class="mb-2"
          />
          <div class="flex">
            <p class="mr-4">按讚數：{{ article.likeCount }}</p>
            <p class="mr-4">評論數：{{ article.commentCount }}</p>
            <p>收藏數：{{ article.bookmarkCount }}</p>
          </div>
          <hr class="my-4 border-t border-gray-300" />
        </div>
      </div>
    </div>

    <!-- 右側內容 -->
    <div class="flex flex-col w-1/4"></div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { articleListApi, boardListApi } from "../api/home.js";

const boards = ref([]);
boardListApi()
  .then((res) => {
    console.log(res.data.code);
    if (res.data.code === 1) {
      // 如果請求成功，將文章列表資料賦值給articles
      boards.value = res.data.data || [];
    } else {
      // 如果請求失敗，列印錯誤訊息
      console.error("請求出錯:", res.data.msg);
    }
  })
  .catch((err) => {
    console.error("請求出錯:", err);
  });
//文章內容
const ellipsis = ref(true);

// 定義articles變量，使用reactive使其成為響應式對象
const articles = ref([]);

// 呼叫後端介面取得文章列表數據
articleListApi()
  .then((res) => {
    console.log(res.data.data);
    if (res.data.code === 1) {
      // 如果請求成功，將文章列表資料賦值給articles
      articles.value = res.data.data || [];
      // res.data.data.forEach(item => {
      //   articles.push(item); // 将每个元素添加到 articles 数组中
      // });
      // articles.splice(0, articles.length, ...res.data.data);
    } else {
      // 如果請求失敗，列印錯誤訊息
      console.error("請求出錯:", res.data.msg);
    }
  })
  .catch((err) => {
    console.error("請求出錯:", err);
  });

// 格式化日期函數
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};
</script>
