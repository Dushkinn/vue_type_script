<template>
  <div>
    <view-component element="div">Hello world</view-component>
    <my-pokemon></my-pokemon>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ViewComponent from "@/components/ViewComponent.vue";
import MyPokemon from "@/components/my-pokemon.vue";

export default defineComponent({
  name: "HomeView",
  components: { MyPokemon, ViewComponent },
});
</script>
