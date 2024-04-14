<template>
  <div class="logo">
    <img src="../assets/img/logo_rect.png" alt="logo" />
  </div>
  <a-input-search v-model:value="data.value" placeholder="搜索商品" enter-button @search="onSearch" />
  <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="light"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">nav 1</a-menu-item>
        <a-menu-item key="2">nav 2</a-menu-item>
        <a-menu-item key="3">nav 3</a-menu-item>
  </a-menu>
  <!-- <div class="header">
    <div class="logo">
      <img src="../assets/img/logo_rect.png" alt="logo" />
    </div>
    <a-input-search
      v-model:value="data.value"
      placeholder="搜索商品"
      enter-button
      @search="onSearch"
    />
    <a-menu v-model:selectedKeys="data.current" mode="horizontal">
      <a-menu-item key="help">
        <template #icon>
          <QuestionOutlined />
        </template>
幫助
</a-menu-item>
<a-menu-item key="salesroom">
  <template #icon>
          <ShopOutlined />
        </template>
  門市
</a-menu-item>
<a-sub-menu key="account">
  <template #icon>
          <HomeOutlined />
        </template>
  <template #title>帳戶</template>
</a-sub-menu>
</a-menu>
</div> -->
</template>

<script setup>
import { ref, h, reactive, VueElement } from "vue";
// import { useRoute, useRouter } from "vue-router";
// import { InputSearch } from "ant-design-vue";
// import { useStore } from "../store/index.js";

// const store = useStore();

const data = reactive({
  value: "",
  current: ["help"],
});
const onSearch = (searchValue) => {
  console.log("use value", searchValue);
  console.log("or use this.value", data.value);
};

import {
  HomeOutlined,
  QuestionOutlined,
  ShopOutlined,
} from "@ant-design/icons-vue";

</script>

<style lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 100000;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 0 10px #ccc;
}

.logo {
  margin-right: 40px;

  img {
    height: 30px;
  }
}

.input-serch {
  display: flex;
  flex: 1;
  height: 40px;
  align-items: center;
}
</style>