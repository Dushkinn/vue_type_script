<template>
  <v-card rounded="lg" color="black">
    <v-list>
      <v-list-item v-for="n in 5" :key="n" link>
        <v-list-item-content>
          <v-list-item-title> List Item {{ n }} </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="my-2"></v-divider>

      <v-list-item link color="grey lighten-4">
        <v-list-item-content>
          <v-list-item-title> Refresh </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SideMenuLayout",
  data() {
    return {
      routers: [
        {
          name: "Home",
          url: "/",
        },
        {
          about: "About",
          url: "/about",
        },
      ],
    };
  },
});
</script>

<style scoped></style>
