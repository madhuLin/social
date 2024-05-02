<script setup>
import {ref} from "vue";
import { articleListApi, boardListApi } from "../api/home.js";
import { useStore } from '../store/index.js';

const store = useStore();
const ellipsis = ref(true);
const articles = ref([]);

articleListApi()
  .then((res) => {
    // console.log(res.data.data);
    if (res.data.code === 1) {
      articles.value = res.data.data || [];
    } else {
      console.error("請求出錯:", res.data.msg);
    }
  })
  .catch((err) => {
    console.error("請求出錯:", err);
  });

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return `${date.getFullYear()}-${date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

</script>

<template>
    <h2 class="text-xl font-bold mb-4">文章列表</h2>
    <div class="articles">
        <div class="article text-social-font-second hover:bg-social-c3" v-for="article in articles" :key="article.id">
            <div class="flex justify-between mb-2">
                <p class="font-bold">作者：{{ article.authorName }}</p>
                <p>發佈日期：{{ formatDate(article.publicationDate) }}</p>
            </div>
            <h3 class="text-lg font-bold mb-2 text-social-font">{{ article.title }}</h3>
            <p class="mb-2 text-social-font-second">
                {{ ellipsis && article.content.length > 100 ? article.content.slice(0, 100) + '...' : article.content }}
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
</template>

<style lang="less"></style>
