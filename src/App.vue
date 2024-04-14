<script setup>
import {} from 'vue';
import Header from './components/Header.vue'
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
</script>

<template>
 <a-layout class="layout">
    <a-layout-header theme="light">
      <Header></Header>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <router-view></router-view>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      socs
    </a-layout-footer>
  </a-layout>
  <!-- <Header></Header>
  <router-view></router-view> -->
</template>

<style>

</style>
