import { createStore } from "vuex";
import newsModule from "@/store/modules/news";

const store = createStore({
  modules: {
    newsModule,
  },
});

export default store;
