<script setup>
import { onMounted, ref } from "vue";
import TreeView from "./TreeView.vue";
import FloatingSidebar from "@/components/FloatingSidebar.vue";

// Create a ref for the TreeView component
const chartRef = ref();

// Optional: You can confirm once it's exposed
onMounted(() => {
  console.log("Chart functions available:", chartRef.value?.fitChart);
});
</script>

<template>
  <main>
    <FloatingSidebar
      :fitChart="chartRef?.fitChart"
      :compactChart="chartRef?.compactChart"
      :expandAllNodes="chartRef?.expandAllNodes"
      :collapseAllNodes="chartRef?.collapseAllNodes"
      :findRoot="chartRef?.findRoot"
      :clearMark="chartRef?.clearMark"
      :normalChart="chartRef?.normalChart"
      :clickedNodeID="chartRef?.clickedNodeID"
    />
    <div
      class="chart-container"
      :class="{ 'fullscreen-container': isFullscreen }"
      ref="chartContainer"
    >
      <TreeView ref="chartRef" />
    </div>
  </main>
</template>

<style scoped>
.chart-container,
.svg-chart-container,
.fullscreen-container,
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: white !important;
  overflow: hidden;
}
.chart-container.fullscreen-container {
  background-color: white;
}
</style>
