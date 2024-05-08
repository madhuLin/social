<template>
    <!-- 文章 -->
      <h2 class="text-xl font-bold mb-4">文章列表</h2>
      <div class="articles">
        <!-- 渲染文章清單 -->
        <div class="article text-social-font-second hover:bg-social-c3" v-for="article in articles"
          :key="article.id">
          <div class="flex justify-between mb-2">
            <p class="font-bold">作者：{{ article.authorName }}</p>
            <p>發佈日期：{{ formatDate(article.publicationDate) }}</p>
          </div>
          <h3 class="text-lg font-bold mb-2 text-social-font">{{ article.title }}</h3>
          <p class="mb-2 text-social-font-second">
            {{ ellipsis && article.content.length > 100 ? article.content.slice(0, 100) + '...' :
              article.content }}
          </p>
          <!-- 点击按钮时显示弹出窗口 -->
          <button @click="showPopups(article.id)" class="bg-social-c2 text-white font-bold py-2 px-4 rounded-lg"> 链上信息</button>
          <ChainInfo :chainInfo="chainInfo" v-if="showPopup" @close="() => showPopup = false"/>
            <div class="flex">
                <p class="mr-4">按讚數：{{ article.likeCount }}</p>
                <p class="mr-4">評論數：{{ article.commentCount }}</p>
                <p class="mr-4">收藏數：{{ article.bookmarkCount }}</p>
                <p v-if="store.$isLoggedIn" @click="StartVerification">發起驗證</p>
            </div>
          <hr class="my-4 border-t border-gray-300" />
        </div>
      </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { articleChainInfoApi, articleChainListApi } from "../api/article.js";
import ChainInfo from "../components/chainInfo.vue";
import useWeb3 from "../hooks/useWeb3.js";
const {web3, socialContract, getAccount} = useWeb3();

import { useStore } from '../store/index.js';

const store = useStore();

const data = ref(null);


const ellipsis = ref(true);
const articles = ref([]);

const getArticleInfo = async () => {
  // let articlesList = null; 
  // articlesList = await socialContract.methods.getAllArticles().call();
  
  // for (const articleIndex of articlesList) {
  // const article = await socialContract.methods.getArticle(articleIndex).call();
  // }
  const articlesList = await articleChainListApi();
  if(articlesList.data.code === 1) {
    const result = articlesList.data.data;
    articles.value = result;
  }
  console.log(articles.value);

};

onMounted(async () => {
  await getArticleInfo();
});




const showPopup = ref(false); // 控制弹出窗口的显示与隐藏

// 父组件中的链上信息
const chainInfo = reactive({
  transactionHash: '...',
  authorAddress: '...',
  // transactionFee: '...',
  smartContractAddress: '...',
  title: '...',
  timestamp: '...'
});

const showPopups = (articleId) => {
  console.log("showPopups", articleId);
  articleChainInfoApi(articleId).then((res) => {
    if(res.data.code === 1) {
      console.log("res.data",res.data.data);
      const result = res.data.data;
      chainInfo.transactionHash = result.transactionHash;
      // chainInfo.transactionFee = result.transactionFee;
      chainInfo.smartContractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
      chainInfo.title = result.title;
      chainInfo.timestamp = result.timestamp;
      // chainInfo.author = result.author;
      chainInfo.authorAddress = result.authorAddress;
      showPopup.value = true;
    }
    else {
      console.log("error:",res.data.msg);
    }
  });

}
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return `${date.getFullYear()}-${date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

</script>

<style lang="less">
</style>