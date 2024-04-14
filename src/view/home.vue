<template>
  <div class="community">
    <!-- 看板 -->
    <div class="sidebar">
      <h2>精選看板</h2>
      <ul class="board-list">
        <li v-for="(name, id) in boards" :key="id">
          <a :href="`/board/${id}`">{{ name }}</a>
        </li>
      </ul>
    </div>
    <!-- 文章 -->
    <div class="main-content">
      <h2>文章列表</h2>
      <div class="articles">
        <!-- 渲染文章清單 -->
        <div class="article" v-for="article in articles" :key="article.articleId">
          <div class="author-date">
            <p>作者：{{ article.articleAuthorName }}</p>
            <p>發佈日期：{{ formatDate(article.publicationDate) }}</p>
          </div>
          <h3>{{ article.articleTitle }}</h3>
          <a-typography-paragraph
            :ellipsis="ellipsis ? { rows: 2, expandable: true, symbol: 'more' } : false"
            :content="article.articleContent"
          />
          <div class="counts">
            <p>按讚數：{{ article.likeCount }}</p>
            <p>評論數：{{ article.commentCount }}</p>
            <p>收藏數：{{ article.bookmarkCount }}</p>
          </div>
          <hr />
        </div>
      </div>
      
    </div>

    <!-- 右側內容 -->
    <div class="sidebar"></div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { articleListApi, boardListApi } from "../api/home.js";

const boards = ref([]);
boardListApi()
  .then((res) => {
    console.log(res.data.code);
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
  });
//文章內容
const ellipsis = ref(true);

// 定義articles變量，使用reactive使其成為響應式對象
const articles = ref([]);

// 呼叫後端介面取得文章列表數據
articleListApi()
  .then((res) => {
    console.log(res.data.data);
    if (res.data.code === 1) {
      // 如果請求成功，將文章列表資料賦值給articles
      articles.value = res.data.data || [];
      // res.data.data.forEach(item => {
      //   articles.push(item); // 将每个元素添加到 articles 数组中
      // });
      // articles.splice(0, articles.length, ...res.data.data);
    } else {
      // 如果請求失敗，列印錯誤訊息
      console.error("請求出錯:", res.data.msg);
    }
  })
  .catch((err) => {
    console.error("請求出錯:", err);
  });

// 格式化日期函數
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};
</script>


<style lang="less">
.community {
  display: flex;
  justify-content: center;
}
/* 看板 */

.sidebar {
  // width: 25%;
  flex: 0 0 25%;
}

.board-list {
  list-style-type: none;
  padding: 0;
}

.board-list li {
  margin-bottom: 10px;
  align-items: flex-end;
}

.board-list li a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  text-align: right;
  &:hover {
    color: #007bff;
  }
}

/* 文章列表容器 */
.articles {
  margin-top: 20px;
}

/* 单篇文章容器 */
.article {
  margin-bottom: 20px;
}

/* 作者和日期 */
.author-date {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

/* 文章标题 */
h3 {
  margin-bottom: 10px;
}

/* 文章内容 */
a-typography-paragraph {
  margin-bottom: 10px;
}

/* 按讚数、评论数和收藏数 */
.counts {
  display: flex;
  justify-content: flex-start;
  font-style: italic;
  p {
    margin-right: 10px;
  }
}

/* 分割线 */
hr {
  margin-top: 20px;
  border: none;
  border-top: 1px solid #ccc;
}
</style>