<template>
  <div class="chart-container" ref="chartContainer"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { createApp } from "vue";
import * as d3 from "d3";
import { OrgChart } from "d3-org-chart";
import ChartUI from "./ChartUI.vue";
import { useOrgChart } from "./renderOrgChart";

const chartContainer = ref<HTMLElement | null>(null);
const clickedNodeID = ref<string | null>(null);

// Declare at top-level or in a separate module
let chartInstance: OrgChart | null = null;

const { render } = useOrgChart();

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

function fitChart() {
  chartInstance?.fit();
}

function compactChart() {
  chartInstance?.compact();
}

function expandAll() {
  chartInstance?.expandAll().render();
}

function collapseAll() {
  chartInstance?.collapseAll().render();
}

function findRoot(id?: string) {
  const nodeId = id ?? clickedNodeID.value;
  if (nodeId) {
    chartInstance?.setCentered(nodeId).render();
  }
}

function clearMark() {
  chartInstance?.clearHighlighting().render();
}

defineExpose({
  fitChart,
  compactChart,
  expandAll,
  collapseAll,
  findRoot,
  clearMark,
});
</script>
