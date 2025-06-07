<template>
  <div class="chart-container" ref="chartContainer"></div>
  <FloatingSidebar
    :fitChart="fitChart"
    :compactChart="directionTop"
    :expandAllNodes="expandAllNodes"
    :collapseAllNodes="collapseAllNodes"
    :directionBottom="directionBottom"
    :directionTop="directionTop"
    :directionLeft="directionLeft"
    :directionRight="directionRight"
    :clearMarker="clearMarker"
    :findParent="findParent"
    :clickedNodeID="clickedNodeID"
  />
  <!-- chart node HTML -->
  <div
    v-for="node in orgData"
    :key="node.id"
    :id="`vue-node-${node.id}`"
    style="display: none"
  >
    <NodeUI :data="node" />
  </div>
</template>
<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";
import FloatingSidebar from "@/components/FloatingSidebar.vue";
import * as d3 from "d3";
import { useOrgChart } from "./Chart/renderOrgChart";
import NodeUI from "./Chart/node_ui.vue";

const chartRef = ref();
const chartContainer = ref<HTMLElement | null>(null);
const apiURL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const orgData = ref([]);

const {
  render,
  fitChart,
  expandAllNodes,
  collapseAllNodes,
  directionBottom,
  directionTop,
  directionLeft,
  directionRight,
  clearMarker,
  findParent,
  clickedNodeID,
} = useOrgChart();

onMounted(async () => {
  console.log("Chart functions available:", chartRef.value?.fitChart);
  console.log("Backend URL:", apiURL);
  try {
    const data = await d3.json(`${apiURL}/api/nodes`);
    orgData.value = data; // so Vue renders ChartUI components
    await nextTick(); // wait until DOM renders hidden divs
    render(chartContainer.value, orgData.value);
  } catch (error) {
    console.error("Error loading data:", error);
  }
});
</script>

<style scoped>
.chart-container,
.svg-chart-container,
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: white !important;
  overflow: hidden;
}
</style>
