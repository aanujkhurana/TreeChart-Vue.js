<template>
  <div class="chart-container" ref="chartContainer"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as d3 from "d3";
import { useOrgChart } from "./renderOrgChart";

const chartContainer = ref<HTMLElement | null>(null);
const clickedNodeID = ref<string | null>(null);

const {
  chartInstance,
  render,
  fitChart,
  compactChart,
  expandAllNodes,
  collapseAllNodes,
  findRoot,
  clearMark,
  clickedNodeID: composableClickedNodeID,
} = useOrgChart();

onMounted(async () => {
  try {
    const data = await d3.csv(
      "https://raw.githubusercontent.com/bumbeishvili/sample-data/main/org.csv"
    );
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
});
</script>
