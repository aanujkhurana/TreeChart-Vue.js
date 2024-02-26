<script setup>
import { ref } from "vue";
import TreeView from "./TreeView.vue";
import FloatingSidebar from '@/components/FloatingSidebar.vue';

</script>


<template>
  <main>
  <TreeView :itemList="itemList" />
  <FloatingSidebar/>
  </main>
</template>

<style scoped>
</style>