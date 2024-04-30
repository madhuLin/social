<script setup>
import {ref} from "vue";
import { articleListApi, boardListApi } from "../api/home.js";
import { useStore } from '../store/index.js';

const store = useStore();
//定義articles變量，使用reactive使其成為響應式對象
//文章內容
const ellipsis = ref(true);
const articles = ref([]);

// 呼叫後端介面取得文章列表數據
articleListApi()
  .then((res) => {
    // console.log(res.data.data);
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
  return `${date.getFullYear()}-${date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};


// // 定义 props 中的 selectedType
// const props = defineProps({
//   selectedType: String
// });

// // 通过 props.selectedType 来访问父组件传递的 selectedType
// const selectedType = ref(props.selectedType);

// if(selectedType == 'all') {

// }


</script>

<template>
    <!-- 文章 -->
    <!-- <div class="flex flex-col w-1/2 mx-4"> -->
      <h2 class="text-xl font-bold mb-4">文章列表</h2>
      <div class="articles">
        <!-- 渲染文章清單 -->
        <div class="article text-social-font-second hover:bg-social-c3" v-for="article in articles"
          :key="article.articleId">
          <div class="flex justify-between mb-2">
            <p class="font-bold">作者：{{ article.articleAuthorName }}</p>
            <p>發佈日期：{{ formatDate(article.publicationDate) }}</p>
          </div>
          <h3 class="text-lg font-bold mb-2 text-social-font">{{ article.articleTitle }}</h3>
          <p class="mb-2 text-social-font-second">
            {{ ellipsis && article.articleContent.length > 100 ? article.articleContent.slice(0, 100) + '...' :
              article.articleContent }}
          </p>

          <div class="flex">
            <p class="mr-4">按讚數：{{ article.likeCount }}</p>
            <p class="mr-4">評論數：{{ article.commentCount }}</p>
            <p class="mr-4">收藏數：{{ article.bookmarkCount }}</p>
            <p v-if="store.$isLoggedIn" @click="StartVerification">發起驗證</p>
          </div>
          <hr class="my-4 border-t border-gray-300" />
        </div>
      </div>
    <!-- </div> -->

</template>

<style lang="less"></style>
