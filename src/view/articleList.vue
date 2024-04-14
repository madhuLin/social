<script setup>
import { ref, reactive } from "vue";
import { articles } from "./data.js";
const articlesList = ref(articles);
const data = ref(null);
</script>

<template>
  <div>
    <h2>Articles</h2>
    <ul>
      <li v-for="article in articlesList" :key="article.title">
        <h3>{{ article.title }}</h3>
        <p>{{ article.content }}</p>
      </li>
    </ul>
  </div>
</template>

<style lang="less"></style>
