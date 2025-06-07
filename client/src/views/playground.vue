<template>
  <div v-if="!backendReady" class="loading-screen">
    <div class="spinner"></div>
    <p>Waking up the server... This may take up to 1 minute.</p>
    <p>Thanks for waiting!</p>
  </div>
  <div v-else>
    <div class="chart-container" ref="chartContainer"></div>
    <Sidebar
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
  </div>
</template>
<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";
import Sidebar from "@/components/sidebar.vue";
import * as d3 from "d3";
import { useOrgChart } from "./Chart/renderOrgChart";
import NodeUI from "./Chart/node_ui.vue";
import axios from "axios";

const chartRef = ref();
const chartContainer = ref<HTMLElement | null>(null);
const apiURL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const orgData = ref([]);
const backendReady = ref(false);
const backendCheckInterval = 3000; // Poll every 3 seconds

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

// Polling function to wait until backend is live
const waitForBackend = async () => {
  const url = `${apiURL}/api/nodes`;

  const poll = async () => {
    try {
      const res = await axios.get(url);
      orgData.value = res.data;
      backendReady.value = true;
      await nextTick(); // wait for DOM to render hidden Vue node UIs
      render(chartContainer.value, orgData.value);
    } catch (err) {
      console.log("Waiting for backend to wake up...");
      setTimeout(poll, backendCheckInterval);
    }
  };

  poll();
};

onMounted(() => {
  waitForBackend();
});
</script>

<style scoped>
.chart-container,
.svg-chart-container,
html,
body {
  background: white !important;
}

/* .loading-screen {

} */

.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1000;
  font-size: 1rem;
  color: #808792;
}

.spinner {
  border: 5px solid #ccc;
  border-top: 5px solid #4285f4;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
