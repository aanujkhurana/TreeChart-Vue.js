<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/tree_chart">Tree</RouterLink>
  </nav>
  <RouterView/>
</template>