<template>
  <div class="chart-container" ref="chartContainer"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as d3 from "d3";
import { useOrgChart } from "./renderOrgChart";

const chartContainer = ref<HTMLElement | null>(null);
const clickedNodeID = ref<string | null>(null);
const apiURL = import.meta.env.VITE_API_URL;

const {
  render,
  fitChart,
  compactChart,
  expandAllNodes,
  collapseAllNodes,
  findRoot,
  clearMark,
  clickedNodeID: composableClickedNodeID,
  normalChart,
} = useOrgChart();

onMounted(async () => {
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

// Optional wrapper if you want to pass ID dynamically
function findRootWrapper(id?: string) {
  const nodeId = id ?? clickedNodeID.value ?? composableClickedNodeID.value;
  if (nodeId) {
    findRoot(nodeId);
  }
}

defineExpose({
  fitChart,
  compactChart,
  expandAllNodes,
  collapseAllNodes,
  findRootWrapper,
  clearMark,
  normalChart,
  clickedNodeID,
});
</script>
