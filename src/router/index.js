// router.js
import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../view/home.vue';
import CategoryList from '../view/categories.vue';
import ArticleList from '../view/articleList.vue';
const routes = [
    { path: '/', component: Home, name:"home" },
    { path: '/categories', component: CategoryList, name:"categoryList" },
    { path: '/articles', component: ArticleList, name:"articles" },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;