<script setup>
import { RouterView } from 'vue-router'
import Header from "./components/Header.vue"
</script>

<template>
  <div class="app">
    <Header />
    <main class="main-content">
      <section class="chart-wrapper">
        <RouterView />
      </section>
    </main>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700&display=swap");

* {
  font-family: "Rubik", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #f4f7fa;
  color: #1f2937;
  height: 100vh;
  overflow: hidden;
}

.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* Header stays on top */
header {
  flex-shrink: 0;
}

/* Main content below header */
.main-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  overflow: auto;
}

/* Smart bordered chart container */
.chart-wrapper {
  border: 2px solid #ccc;
  border-radius: 12px;
  background-color: #fff;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  max-width: 90vw;
  max-height: 85vh;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Optional: If the tree chart overflows inside */
.chart-wrapper > * {
  max-width: 100%;
  max-height: 100%;
}
</style>
