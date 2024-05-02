<template>
    <!-- 文章 -->
      <h2 class="text-xl font-bold mb-4">文章列表</h2>
      <div class="articles">
        <!-- 渲染文章清單 -->
        <div class="article text-social-font-second hover:bg-social-c3" v-for="article in articles"
          :key="article.articleId">
          <div class="flex justify-between mb-2">
            <p class="font-bold">作者：{{ article.username }}</p>
            <p>發佈日期：{{ article.timestamp }}</p>
          </div>
          <h3 class="text-lg font-bold mb-2 text-social-font">{{ article.title }}</h3>
          <p class="mb-2 text-social-font-second">
            {{ ellipsis && article.content.length > 100 ? article.content.slice(0, 100) + '...' :
              article.content }}
          </p>

          <!-- <div class="flex">
            <p class="mr-4">按讚數：{{ article.likeCount }}</p>
            <p class="mr-4">評論數：{{ article.commentCount }}</p>
            <p class="mr-4">收藏數：{{ article.bookmarkCount }}</p>
            <p v-if="Verifiable" @click="StartVerification">發起驗證</p>
          </div> -->
          <hr class="my-4 border-t border-gray-300" />
        </div>
      </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import useWeb3 from "../hooks/useWeb3";
const {web3, socialContract, getAccount} = useWeb3();

const data = ref(null);


const ellipsis = ref(true);
const articles = ref([]);

const getArticleInfo = async () => {
  // data.value = socialContract.methods.
  // data.value = await getAccount();
  // console.log("account", data.value);

  let articlesList = null; 
  articlesList = await socialContract.methods.getAllArticles().call();
  
  for (const articleIndex of articlesList) {
  const article = await socialContract.methods.getArticle(articleIndex).call();
  articles.value.push(article);
  // console.log(article.content);
}
};

onMounted(async () => {
  await getArticleInfo();
});
// 呼叫後端介面取得文章列表數據
// articleListApi()
//   .then((res) => {
//     // console.log(res.data.data);
//     if (res.data.code === 1) {
//       // 如果請求成功，將文章列表資料賦值給articles
//       articles.value = res.data.data || [];
//       // res.data.data.forEach(item => {
//       //   articles.push(item); // 将每个元素添加到 articles 数组中
//       // });
//       // articles.splice(0, articles.length, ...res.data.data);
//     } else {
//       // 如果請求失敗，列印錯誤訊息
//       console.error("請求出錯:", res.data.msg);
//     }
//   })
//   .catch((err) => {
//     console.error("請求出錯:", err);
//   });




</script>

<style lang="less">
</style>