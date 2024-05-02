<template>
    <!-- 看板 -->
    <div class="flex flex-col mx-4">
      <h2 class="text-xl font-bold mb-4">精選看板</h2>
      <ul class=" text-social-font-second">
        <li v-for="(name, id) in boards" :key="id" class="hover:bg-social-c3 p-2">
          <div class="">
            <a :href="`/board/${id}`">{{ name }}</a>
          </div>
        </li>
      </ul>
    </div>
</template>

<script setup>
import {ref} from "vue";
import { boardListApi } from "../api/home.js";

const boards = ref([]);
boardListApi()
  .then((res) => {
    console.log("board", res.data.code);
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
  });ref(null);

</script>

<style lang="less">
</style>