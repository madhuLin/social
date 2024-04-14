<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { loginApi } from "../api/login_signUp.js";
const router = useRouter();
const username = ref('');
const password = ref('');

const submitForm = async () => {

    // 驗證使用者名稱不為空
      if (password.value.length === 0) {
        alert('Please enter a password.');
        return;
    }
    // 驗證密碼長度
    if (password.value.length < 6) {
        alert('Password must be at least 6 characters long.');
        password.value = '';
        return;
    }

    // 驗證使用者名稱不為空
    if (!username.value.trim()) {
        alert('Please enter a username.');
        return;
    }
    //
    if (username.value > 20) {
        alert('用戶名小於20字.');
        return;
    }




    try {
        const data = {
            username: username.value,
            password: password.value,
        }
        const res = await loginApi(data);
        if (res.data.code === 1) {
            // 如果請求成功
            console.log("登入成功!");
            router.push('/');
        } else {
            // 如果請求失敗，列印錯誤訊息
            alert(res.data.msg);
        }
    } catch (err) {
        console.error("請求出錯:", err.message);
    }

    console.log('Form submitted!');

};

</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="submitForm" class="space-y-6" action="#" method="POST">
        <!-- <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input id="email" name="email" type="email" autocomplete="email" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" />
          </div>
        </div> -->
        <div>
          <label for="username" class="block text-sm font-semibold leading-6 text-gray-900">用戶名稱</label>
          <div class="mt-2">
            <input v-model="username" id="username" name="username" type="text" autocomplete="username" required=""
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="text-sm">
              <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div>
          </div>
          <div class="mt-2">
            <input v-model="password" id="password" name="password" type="password" autocomplete="current-password" required=""
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" />
          </div>
        </div>

        <div>
          <button type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
            in</button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        沒有帳號?
        {{ ' ' }}
        <router-link to="/signUp"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">我要註冊</router-link>
      </p>
    </div>
  </div>
</template>

<style lang="less"></style>