<template>
  <div>
    <div class="chart-container relative w-auto h-auto" ref="chartContainer">
      <FloatingSidebar
        class="floating-sidebar"
        :fitChart="fitChart"
        :expandAllNodes="expandAllNodes"
        :collapseAllNodes="collapseAllNodes"
        :compactChart="compactChart"
        :clearMark="clearMark"
        :findRoot="findRoot"
        :nodeID="clickedNodeID"
      ></FloatingSidebar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, createApp } from "vue";
import { useRoute } from "vue-router";
import ChartUI from '@/views/ChartUI.vue';
import { OrgChart } from "d3-org-chart";
import * as d3 from 'd3';
import FloatingSidebar from '@/views/FloatingSidebar.vue';
import jsonData from './sample.json';

const chartContainer = ref(null);
const chartData = ref([]);
let chart: any = null; // Initialize chart as null
let itemId = null;
let clickedNodeID = ref(null);

function renderOrgChart(chartContainer: any | string, data: any[]) {
  if (!chartContainer) {
    return null;
  }
  const chart = new OrgChart()
    .container(chartContainer)
    .data(data) 
    .scaleExtent([0.1,2])
    .setActiveNodeCentered(true)
    .compact(true)
    .nodeHeight((d) => 380)
    .nodeWidth((d) => 376)
    .childrenMargin((d) => 120)
    .compactMarginBetween((d) => 70)
    .compactMarginPair((d) => 120)
    .siblingsMargin((d) => 120)
    .nodeUpdate(function (d) {
      d3.select(this)
        .select('.node-rect')
        .attr("width", 386)
        .attr("height", 385)
        .attr("stroke", d => d.data._highlighted || d.data._upToTheRootHighlighted ? '#4285F4' : 'none')
        .attr("stroke-width", d.data._highlighted || d.data._upToTheRootHighlighted ? 8 : 2)
        .attr('y', -3) 
        .attr('x', -3)
        .attr("stroke-linejoin", "round")
        .style("stroke-alignment", "outer");
    })
    .linkUpdate(function (d) {
      d3.select(this)
        .attr('stroke', (d) => d.data._upToTheRootHighlighted ? '#4285F4' : '#1E1C8A')
        .attr('stroke-width', (d) => d.data._upToTheRootHighlighted ? 15 : 3);
      if (d.data._upToTheRootHighlighted) { d3.select(this).raise(); }
    })
    .onNodeClick((d) => {
      clickedNodeID.value = d.id;
      markNode(d.id);
      centerNode(d.id);
    })
    .nodeButtonX((d)=> -150)
    .nodeButtonY((d)=> -30)
    .buttonContent(({ node }) => 
      { const foreignObject = d3.selectAll('.node-button-foreign-object');
      foreignObject .attr('width', 300) .attr('height', 50)
      return `
      ${node.children ?
        `<div class="rounded-[42px] w-[400px] h-[52px] p-4 text-[#ffffff] text-center relative"
        style="background: linear-gradient(180deg,rgba(66, 133, 244, 1) 0%,rgba(32, 38, 171, 1) 100% );
        box-shadow: 0px 4px 16px 0px rgba(0, 44, 117, 0.4);
        font: 600 15px 'inter','sans-serif'">
          ▲  Collapse ${node.data._directSubordinates} Parts
        </div>`
        :
        `<div class="rounded-[42px] w-[340px] h-[50px] p-4 text-[#ffffff] text-center relative"
          style="background: linear-gradient(180deg,rgba(32, 38, 171, 1) 0%,rgba(66, 133, 244, 1) 100% );
          box-shadow: 0px 4px 16px 0px rgba(0, 55, 146, 0.4);
          font: 600 15px 'roboto','sans-serif'">
            ▼  Expand ${node.data._totalSubordinates} Parts
        </div>`}`;
    })
    .nodeContent((d) => {
      //creating temp App to render ChartUI component and convert it to HTML
      const app = createApp(ChartUI, { data: d.data });
      const vm = app.mount(document.createElement("div"));
      const chartUIHTML = vm.$el.outerHTML;
      app.unmount();
      return chartUIHTML;
    })
    .render()
  return chart;
}
  // Chart functions
  function markNode(nodeID: number | string) {
    if (chart) { // Check if chart is defined
      chart.setHighlighted(nodeID).render();
    }
  }
  function centerNode(nodeId: number | string) {
    if (chart) {
      // chart.fit(nodeId).render();
      chart.setCentered(nodeId).render();
    }
  }
  function findRoot(nodeID: number | string) {
    if (chart) {
      chart.setUpToTheRootHighlighted(nodeID).render().fit();
    }
  }
  function fitChart() {
    let compact = 0;
    if (chart) {
      chart.compact(!(compact++ % 2)).render().fit();
    }
  }
  function expandAllNodes() {
    if (chart) {
      chart.expandAll().fit();
    }
  }
  function collapseAllNodes() {
    if (chart) {
      chart.collapseAll().fit();
    }
  }
  function compactChart() {
    let compact = 0
    if (chart) {
      chart.compact(!!(compact++ % 2)).render().fit();
    }
  }
  function clearMark() {
    if (chart) {
      chart.clearHighlighting();
    }
  }

  onMounted(async () => {
      // Make sure chartData is populated with the JSON data you want to use for the chart
      chartData.value = jsonData;
      // Check if chartData has the data you need for rendering
      if (Array.isArray(chartData.value) && chartData.value.length > 0) {
        chart = renderOrgChart(chartContainer.value, chartData.value);
      } else {
        console.error('Invalid JSON data format or empty data.');
      }
    });
</script>

<style scoped>
* {
  margin: 0px;
  padding: 2px;
}

.chart-container {
  background-color: aliceblue;
}


.floating-sidebar {
  position: absolute;
  top: 40%;
  z-index: 1000;
}
</style>
