<template>
  <div class="news-page" ref="scrollComponent">
    <v-alert v-if="newsError" prominent type="error" variant="outlined">
      Error while news loading
    </v-alert>
    <v-row>
      <v-col cols="4" v-for="item in news" :key="item.pubDate">
        <PostComponent class="mb-10" :post="item"></PostComponent>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, onUnmounted, ref } from "vue";
import type { ComputedRef } from "vue";
import { useStore } from "vuex";
import { getterType, actionType } from "@/store/modules/news";
import PostComponent from "@/components/PostComponent.vue";
import type News from "@/models/news/news";

export default defineComponent({
  name: "NewsView",
  components: { PostComponent },
  setup: function () {
    const store = useStore();
    const scrollComponent = ref(null);
    let newsError = false;
    let isNewsLoading = false;
    const loadNextNews = function () {
      if (!isNewsLoading) {
        isNewsLoading = true;
        store
          .dispatch(actionType.getNextNews)
          .catch(() => {
            newsError = true;
          })
          .finally(() => {
            isNewsLoading = false;
          });
      }
    };
    const handleScroll = (e: any) => {
      const element: any = scrollComponent.value;
      if (element?.getBoundingClientRect().bottom < window.innerHeight) {
        loadNextNews();
      }
    };
    onMounted(() => {
      store.dispatch(actionType.getNews);
      window.addEventListener("scroll", handleScroll);
    });
    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });
    return {
      news: computed(() => store.getters[getterType.getNews]) as ComputedRef<
        News[]
      >,
      scrollComponent: scrollComponent,
      newsError: newsError,
    };
  },
});
</script>

<style scoped lang="scss">
.news-page {
  padding-top: 30px;
}
</style>
