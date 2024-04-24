import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'store',
  state: () => ({
    count: 0,
    isFullscreen: false,
    buycarts: [],
    user: null, // 將使用者改為單一物件，而不是陣列
  }),
  getters: {
    totalPrice(state) {
      return state.buycarts.reduce((total, item) => total + item.price * item.num, 0);
    },
  },
  actions: {
    async asyncAdd(payload) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.increment(payload);
    },
    setFullscreen(payload) {
      this.$state.isFullscreen = payload;
    },
    increment(payload) {
      this.$state.count += payload;
    },
    addBuycart(payload) {
      const existingItemIndex = this.$state.buycarts.findIndex(item => item.id === payload.id);
      if (existingItemIndex !== -1) {
        this.$state.buycarts[existingItemIndex].num++;
      } else {
        this.$state.buycarts.push({ ...payload, num: 1 });
      }
    },
    removeBuycart(payload) {
      const indexToRemove = this.$state.buycarts.findIndex(item => item.id === payload.id);
      if (indexToRemove !== -1) {
        if (this.$state.buycarts[indexToRemove].num > 1) {
          this.$state.buycarts[indexToRemove].num--;
        } else {
          this.$state.buycarts.splice(indexToRemove, 1);
        }
      }
    },
    clearBuycarts() {
      this.$state.buycarts = [];
    },
    setUser(payload) {
      this.$state.user = payload;
    },
  },
});