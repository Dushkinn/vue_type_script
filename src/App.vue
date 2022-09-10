<template>
  <v-app id="inspire">
    <header-layout></header-layout>
    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <side-menu-layout></side-menu-layout>
          </v-col>
          <v-col>
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderLayout from "@/layout/HeaderLayout.vue";
import SideMenuLayout from "@/layout/SideMenuLayout.vue";

export default defineComponent({
  name: "App",
  components: { SideMenuLayout, HeaderLayout },
});
</script>
