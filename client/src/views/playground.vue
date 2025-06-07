<template>
  <div :class="{ 'fullscreen-container': isFullscreen }">
    <div class="chart-container" ref="chartContainer"></div>
  </div>
  <FloatingSidebar
    :fitChart="fitChart"
    :compactChart="directionTop"
    :expandAllNodes="expandAllNodes"
    :directionBottom="directionBottom"
    :directionTop="directionTop"
    :directionLeft="directionLeft"
    :directionRight="directionRight"
    :findParent="findParent"
  />
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import FloatingSidebar from "@/components/FloatingSidebar.vue";
import * as d3 from "d3";
import { useOrgChart } from "./Chart/renderOrgChart";

// Create a ref for the TreeView component
const chartRef = ref();
const chartContainer = ref<HTMLElement | null>(null);
// const clickedNodeID = ref<string | null>(null);
const apiURL = import.meta.env.VITE_API_URL;

const {
  render,
  fitChart,
  expandAllNodes,
  directionBottom,
  directionTop,
  directionLeft,
  directionRight,
  findParent,
  clickedNodeID: clickedNodeIDRef,
} = useOrgChart();

onMounted(async () => {
  console.log("Chart functions available:", chartRef.value?.fitChart);
  console.log("Backend URL:", apiURL);
  try {
    // const data = await d3.json("/src/assets/org-data.json");
    // const data = await d3.json("http://localhost:3001/api/nodes");
    const data = await d3.json(`${apiURL}/api/nodes`);
    render(chartContainer.value, data);
  } catch (error) {
    console.error("Error loading data:", error);
  }
});
</script>

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
