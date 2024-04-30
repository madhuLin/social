import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'store', // store 的唯一 ID
  state: () => ({
    count: 0,
    isLoggedIn: false,
    userInfo: null
  }),
  getters: {
    // 定義 getters 函數
    doubleCount() {
      return this.count * 2;
    }
  },
  actions: {
    // 定義 actions 函數
    increment() {
      this.count++;
    },
    login(user) {
      this.isLoggedIn = true;
      this.userInfo = user;
    },
    logout() {
      this.isLoggedIn = false;
      this.userInfo = null;
    }
  }
});
