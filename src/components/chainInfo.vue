<template>
    <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div class="bg-white p-4 rounded shadow-md w-120 h-auto flex flex-col">
        <div class="flex justify-between">
          <h2 class="text-lg font-semibold">链上信息</h2>
          <button class="text-gray-500 hover:text-gray-700 focus:outline-none" @click="$emit('close')">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="mt-2 flex-1">
          <p><strong>交易哈希：</strong> {{ chainInfo.transactionHash }}</p>
          <p><strong>发文者地址：</strong> {{ chainInfo.authorAddress }}</p>
          <p><strong>交易手续费：</strong> {{ chainInfo.transactionFee }}</p>
          <p><strong>智能合约地址：</strong> {{ chainInfo.smartContractAddress }}</p>
          <p><strong>文章标题：</strong> {{ chainInfo.title }}</p>
          <p><strong>交易时间：</strong> {{ chainInfo.timestamp }}</p>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const { chainInfo } = defineProps(['chainInfo']);
const showChainInfo = ref(false);
function handleClick(value) {
    showChainInfo.value = value;
}

const show = ref(true); // 控制弹出窗口的显示与隐藏


</script>

<style lang="less">
</style>