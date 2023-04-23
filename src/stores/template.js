import { defineStore } from "pinia";

export const useTemplateStore = defineStore("template", {
  state: () => ({
    style: {
      isAuthen: false,
    },
  }),
  getters: {
    getStyle: (state) => state.style,
  },
  actions: {
    setStyle(payload) {
      this.style = payload;
    },
  },
});
