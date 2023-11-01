<script setup>
import { RouterView } from 'vue-router'
import Header from "./components/Header.vue"
</script>

<template>
  <Header />
  <RouterView></RouterView>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700&display=swap");
* {
  font-family: "Rubik", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>