<template>
  <div class=" p-4 flex justify-between items-center bg-social-c2">
  <div class="logo" @click="goHome">
    <img src="../assets/img/logo.png" alt="logo" class="h-8" />
  </div>
  <div class="flex items-center">
    <input type="text" :value="data.value" placeholder="搜尋商品" class="py-1 px-2 rounded-l-md border-none  text-social-primary focus:outline- none" @search="onSearch">
    <button class=" text-white py-1 px-4 rounded-r-md hover:bg-gray-600 focus:outline-none">搜尋</button>
  </div>
  <nav class="flex">
    <ul class="flex space-x-4">
      <li>
        <a href="#" class="text-white flex items-center hover:text-gray-300">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
          </svg>
          <span class="ml-1">幫助</span>
        </a>
      </li>
      <li>
        <a href="#" class="text-white flex items-center hover:text-gray-300">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
          </svg>
          <span class="ml-1">門市</span>
        </a>
      </li>
      <li>
        <router-link :to="account" class="text-white flex items-center hover:text-gray-300">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14M5 12h14"></path>
          </svg>
          <span class="ml-1">帳戶</span>
        </router-link>
      </li>
    </ul>
  </nav>
</div>
</template>

<script setup>
import { ref, h, reactive, VueElement } from "vue";
// import { useRoute, useRouter } from "vue-router";
// import { InputSearch } from "ant-design-vue";
// import { useStore } from "../store/index.js";
import { useRouter } from 'vue-router';
// const store = useStore();
const router = useRouter();
function goHome() {
  router.push('/');
}

const data = reactive({
  value: "",
  current: ["help"],
});
const onSearch = (searchValue) => {
  console.log("use value", searchValue);
  console.log("or use this.value", data.value);
};

const account = ref("/login");


</script>

<style lang="less">

</style>