<script setup>
import {} from 'vue';
// import Header from './components/Header.vue'
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
</script>

<template>
  <div class="flex flex-col min-h-3 bg-social-primary text-social-font">
      <Header></Header>
    <router-view></router-view>
  </div>

</template>

<style>

</style>
