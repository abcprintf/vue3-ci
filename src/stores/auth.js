import { defineStore } from "pinia";

export const useUserLoginStore = defineStore("userLogin", {
  state: () => ({
    user: {},
  }),
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    setUser(payload) {
      this.user = payload;
    },
  },
});
