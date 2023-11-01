<template>
    <div class="chart-container" ref="chartContainer">
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
      <Gspacelogo></Gspacelogo>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, createApp } from 'vue';
  import * as d3 from 'd3';
  import { OrgChart } from 'd3-org-chart';
  import ChartUI from './ChartUI.vue';
  import Gspacelogo from '@/components/Icons/Gspacelogo.vue'
  import FloatingSidebar from '@/components/FloatingSidebar.vue';
  
  export default {
    setup() {
      const chartContainer = ref(null);
  
      function renderOrgChart(container, data) {
        if (!container.value || data.length === 0) {
          return;
        }
  
        const chart = new OrgChart()
          .container(container.value)
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
              font: 600 15px,'sans-serif'">
                ▲  Collapse ${node.data._directSubordinates} Parts
              </div>`
              :
              `<div class="rounded-[42px] w-[340px] h-[50px] p-4 text-[#ffffff] text-center relative"
                style="background: linear-gradient(180deg,rgba(32, 38, 171, 1) 0%,rgba(66, 133, 244, 1) 100% );
                box-shadow: 0px 4px 16px 0px rgba(0, 55, 146, 0.4);
                font: 600 15px,'sans-serif'">
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
          .render();
        return chart;

        // Chart functions
  function markNode(nodeID) {
    if (chart) { // Check if chart is defined
      chart.setHighlighted(nodeID).render();
    }
  }
  function centerNode(nodeId) {
    if (chart) {
      // chart.fit(nodeId).render();
      chart.setCentered(nodeId).render();
    }
  }
  function findRoot(nodeID) {
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
      }
  
      onMounted(async () => {
        try {
          const data = await d3.csv("https://raw.githubusercontent.com/bumbeishvili/sample-data/main/org.csv");
          chartContainer.value = renderOrgChart(chartContainer, data);
        } catch (error) {
          console.error('Error loading data:', error);
        }
      });
  
      return {
        chartContainer,
      };
    },
  };
</script>
  
<style scoped>
* {
    font-family: "Rubik", sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.chart-container {
  background-color: aliceblue;
}
.floating-sidebar {
  position: relative;
  top: 40%;
  z-index: 1000;
}
</style>
  