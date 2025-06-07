<script setup>
import { RouterView } from "vue-router";
import Navbar from "./components/navbar.vue";
</script>

<template>
  <div class="app">
    <Navbar />
    <main>
      <RouterView />
    </main>
  </div>
</template>
