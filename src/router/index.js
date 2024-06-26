// router.js
import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../view/home.vue';
import CategoryList from '../view/categories.vue';
import ArticleList from '../view/articleList.vue';
import Login from '../view/login.vue';
import Account from '../view/account.vue';
import SignUp from '../view/signUp.vue';
import New_post from '../view/new_post.vue';
import Test from '../view/test.vue';

const routes = [
    { path: '/', component: Home, name:"home" },
    { path: '/categories', component: CategoryList, name:"categoryList" },
    { path: '/articles', component: ArticleList, name:"articles" },
    { path: '/account', component: Account, name:"account" },
    { path: '/login', component: Login, name:"login" },
    { path: '/signUp', component: SignUp, name:"signUp" },
    { path: '/new-post', component: New_post, name:"new-post" },
    { path: '/test', component: Test, name:"test" },

];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;