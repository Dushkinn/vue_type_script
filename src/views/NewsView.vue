<template>
  <div class="news-page" ref="scrollComponent">
    <v-alert v-if="newsError" prominent type="error" variant="outlined">
      Error while news loading
    </v-alert>
    <v-row>
      <v-col cols="4" v-for="item in news" :key="item.pubDate">
        <PostComponent class="mb-10" :post="item"></PostComponent>
      </v-col>
      <v-col v-if="isNewsLoading" cols="12" class="text-center">
        <v-progress-circular
          class="news-page__progress"
          :size="100"
          indeterminate
        ></v-progress-circular>
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
    const isNewsLoading = ref(false);
    let newsError = false;
    const loadNextNews = function () {
      if (!isNewsLoading.value) {
        isNewsLoading.value = true;
        store
          .dispatch(actionType.getNextNews)
          .catch(() => {
            newsError = true;
          })
          .finally(() => {
            isNewsLoading.value = false;
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
      isNewsLoading.value = true;
      store.dispatch(actionType.getNews).finally(() => {
        isNewsLoading.value = false;
      });
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
      isNewsLoading: isNewsLoading,
    };
  },
});
</script>

<style scoped lang="scss">
.news-page {
  padding-top: 30px;
  padding-bottom: 100px;
}
</style>
