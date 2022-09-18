<template>
  <v-card v-if="post" class="mx-auto" theme="dark" max-width="800">
    <v-img
      :src="post.image_url"
      :lazy-src="post.image_url"
      height="300px"
      cover
    ></v-img>

    <v-card-title> {{ post.title }} </v-card-title>

    <v-card-subtitle> {{ post.category.join(", ") }} </v-card-subtitle>

    <v-card-actions>
      <v-btn color="orange-lighten-2" variant="text"> Explore </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="toggleCardContent()"
      ></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{ post.description }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type News from "@/models/news/news";

export default defineComponent({
  props: {
    post: {
      require: true,
      type: Object as PropType<News>,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  name: "PostComponent",
  methods: {
    toggleCardContent() {
      this.show = !this.show;
    },
  },
});
</script>

<style scoped></style>
