<template>
  <div class="flex justify-center mt-8">
    <!-- 看板 -->
    <Board></Board>
    <div class="flex flex-col w-1/2 mx-4">
      <!-- 文章類型 -->
      <div class="flex">
        <button @click="changeArticleType('all')" :class="{ 'bg-social-c3 text-white': selectedType === 'all', 'bg-social-c2': selectedType !== 'all' }" class="px-4 py-2 rounded">全部</button>
        <button @click="changeArticleType('verify')" :class="{ 'bg-social-c3 text-white': selectedType === 'verify', 'bg-social-c2': selectedType !== 'verify' }" class="px-4 py-2 rounded">驗證</button>
        <button @click="changeArticleType('tutorial')" :class="{ 'bg-social-c3 text-white': selectedType === 'tutorial', 'bg-social-c2': selectedType !== 'tutorial' }" class="px-4 py-2 rounded">教程</button>
        <!-- 添加更多的文章類型按鈕 -->
      </div>
      <!-- 文章 -->
      <ArticleList v-if="selectedType=='all'" :selectedType="selectedType"></ArticleList>
      <verifyArticleList v-if="selectedType=='verify'" :selectedType="selectedType"></verifyArticleList>
    </div>


    <!-- 右側內容 -->
    <div class="flex flex-col mx-4"></div>
    <!-- 右下角按鈕 -->
    <router-link to="/new-post" v-if="store.$isLoggedIn" class="fixed bottom-4 right-4 bg-social-c2 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
      <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14M5 12h14"></path>
      </svg>
    </router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ArticleList from './articleList.vue';
import verifyArticleList from "./verifyArticleList.vue";
import Board from './board.vue';
import { useStore } from '../store/index.js';



const Verifiable = ref(false);
const store = useStore();
onMounted(() => {
  //增加驗證按鈕
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  Verifiable.value = userInfo ? true : false;
  store.$isLoggedIn = Verifiable.value;
});

function StartVerification() {
  console.log("開始驗證程序");
}

const selectedType = ref('all');

function changeArticleType(type) {
  selectedType.value = type;
  if(type=='all') {

  }
  else if(type == 'verify') {

  }
}
</script>
