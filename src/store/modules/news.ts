import type { StoreOptions } from "vuex";
import httpNews from "@/http-news";
import type { AxiosResponse } from "axios";
import type NewsResponse from "@/models/news/NewsResponse";
import type News from "@/models/news/news";
const moduleName = "news";
const apiKey = "pub_110988efc6a6768582586353aa7e8aa1eb9cf";

export const mutationType = {
  getNewsSuccess: `[${moduleName}] getNewsSuccess`,
  getNextNewsSuccess: `[${moduleName}] getNextNewsSuccess`,
  setNextPage: `[${moduleName}] setNextPage`,
};

export const actionType = {
  getNews: `[${moduleName}] getNews`,
  getNextNews: `[${moduleName}] getNextNews`,
};

export const getterType = {
  getNews: `[${moduleName}] getNews`,
};

class StateType {
  news!: Array<News>;
  page!: number;
}

const newsModule: StoreOptions<any> = {
  state: (): StateType => {
    return {
      news: [],
      page: 1,
    };
  },
  mutations: {
    [mutationType.getNewsSuccess](state: StateType, data: NewsResponse) {
      state.news = data.results;
    },
    [mutationType.getNextNewsSuccess](state: StateType, data: NewsResponse) {
      state.news.push(...data.results);
    },
    [mutationType.setNextPage](state: StateType) {
      state.page++;
    },
  },
  actions: {
    async [actionType.getNews](context) {
      return new Promise((resolve) => {
        httpNews
          .get(`${this.state.page}/apikey=${apiKey}`)
          .then((response: AxiosResponse<NewsResponse>) => {
            if (response.data) {
              context.commit(mutationType.getNewsSuccess, response.data);
              resolve(undefined);
            }
          });
      });
    },
    async [actionType.getNextNews](context) {
      context.commit(mutationType.setNextPage);
      return this.dispatch(actionType.getNews);
    },
  },
  getters: {
    [getterType.getNews]: (state: StateType) => {
      return state.news;
    },
  },
};

export default newsModule;
