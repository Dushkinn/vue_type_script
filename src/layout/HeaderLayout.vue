<template>
  <v-app-bar>
    <v-container class="fill-height">
      <v-avatar class="mr-10" color="grey darken-1" size="32"></v-avatar>
      <v-btn v-for="link in links" :key="link" text>
        {{ link }}
      </v-btn>
    </v-container>
  </v-app-bar>
</template>
<style scoped></style>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeaderLayout",
  data: () => {
    return {
      links: ["Dashboard", "Messages", "Profile", "Updates"],
    };
  },
});
</script>
