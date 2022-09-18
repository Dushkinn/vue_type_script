import type { StoreOptions } from "vuex";
import httpNews from "@/http-news";
import type { AxiosResponse } from "axios";
import type NewsResponse from "@/models/news/NewsResponse";
import type News from "@/models/news/news";
const moduleName = "news";
const apiKey = "pub_11098052827a7bff77e9ac3e0df057e4e26cc";

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
  getPage: `[${moduleName}] getPage`,
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
          .get(`1/news?apikey=${apiKey}&language=en&page=${context.state.page}`)
          .then((response: AxiosResponse<NewsResponse>) => {
            if (response.data) {
              context.commit(mutationType.getNextNewsSuccess, response.data);
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
    [getterType.getPage]: (state: StateType) => {
      return state.page;
    },
  },
};

export default newsModule;
