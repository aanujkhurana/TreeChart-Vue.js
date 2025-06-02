<script setup >
import { ref } from "vue";
import TreeView from "./TreeView.vue";
import FloatingSidebar from '@/components/FloatingSidebar.vue';

// Create a ref for the TreeView component
const chartRef = ref()
</script>


<template>
  <main>
    <TreeView ref="chartRef" />
    <FloatingSidebar
      :fitChart="chartRef?.fitChart"
      :compactChart="chartRef?.compactChart"
      :expandAllNodes="chartRef?.expandAll"
      :collapseAllNodes="chartRef?.collapseAll"
      :findRoot="chartRef?.findRoot"
      :clearMark="chartRef?.clearMark"
    />
  </main>
</template>

<style scoped>
</style>