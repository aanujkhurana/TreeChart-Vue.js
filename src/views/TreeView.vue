<template>
  <div class="chart-container" ref="chartContainer"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { createApp } from 'vue'
import * as d3 from 'd3'
import { OrgChart } from 'd3-org-chart'
import ChartUI from './ChartUI.vue'

const chartContainer = ref<HTMLElement | null>(null)
const clickedNodeID = ref<string | null>(null)

let chartInstance: any = null

function renderOrgChart(container: { value: HTMLElement | null }, data: any[]) {
  if (!container.value || data.length === 0) return

  const chart = new OrgChart()
    .container(container.value)
    .data(data)
    .scaleExtent([0.1, 2])
    .setActiveNodeCentered(true)
    .nodeHeight(() => 380)
    .nodeWidth(() => 376)
    .childrenMargin(() => 120)
    .compactMarginBetween(() => 70)
    .compactMarginPair(() => 120)
    .siblingsMargin(() => 120)

    .nodeUpdate(function (d) {
      d3.select(this)
        .select('.node-rect')
        .attr('width', 386)
        .attr('height', 385)
        .attr('stroke', d => d.data._highlighted || d.data._upToTheRootHighlighted ? '#4285F4' : 'none')
        .attr('stroke-width', d => d.data._highlighted || d.data._upToTheRootHighlighted ? 8 : 2)
        .attr('y', -3)
        .attr('x', -3)
        .attr('stroke-linejoin', 'round')
        .style('stroke-alignment', 'outer')
    })

    .linkUpdate(function (d) {
      d3.select(this)
        .attr('stroke', d => d.data._upToTheRootHighlighted ? '#4285F4' : '#1E1C8A')
        .attr('stroke-width', d => d.data._upToTheRootHighlighted ? 15 : 3)
      if (d.data._upToTheRootHighlighted) d3.select(this).raise()
    })

    .onNodeClick(d => {
      clickedNodeID.value = d.id
      markNode(d.id)
      centerNode(d.id)
    })

    .nodeButtonX(() => -150)
    .nodeButtonY(() => -30)

    .buttonContent(({ node }) => {
      const foreignObject = d3.selectAll('.node-button-foreign-object')
      foreignObject.attr('width', 300).attr('height', 50)
      return node.children
        ? `<div class="rounded-[42px] w-[400px] h-[52px] p-4 text-[#ffffff] text-center relative"
            style="background: linear-gradient(180deg,rgba(66, 133, 244, 1) 0%,rgba(32, 38, 171, 1) 100%);
                   box-shadow: 0px 4px 16px 0px rgba(0, 44, 117, 0.4);
                   font: 600 15px,'sans-serif'">
            ▲ Collapse ${node.data._directSubordinates} Parts
          </div>`
        : `<div class="rounded-[42px] w-[340px] h-[50px] p-4 text-[#ffffff] text-center relative"
            style="background: linear-gradient(180deg,rgba(32, 38, 171, 1) 0%,rgba(66, 133, 244, 1) 100%);
                   box-shadow: 0px 4px 16px 0px rgba(0, 55, 146, 0.4);
                   font: 600 15px,'sans-serif'">
            ▼ Expand ${node.data._totalSubordinates} Parts
          </div>`
    })

    .nodeContent(d => {
      const app = createApp(ChartUI, { data: d.data })
      const vm = app.mount(document.createElement('div'))
      const html = vm.$el.outerHTML
      app.unmount()
      return html
    })

    .render()
    .fit()

  chartInstance = chart
  return chart
}

// 🔓 Expose all methods to parent
function fitChart() {
  chartInstance?.fit()
}

function compactChart() {
  chartInstance?.compact()
}

function expandAll() {
  chartInstance?.expandAll().render()
}

function collapseAll() {
  chartInstance?.collapseAll().render()
}

function findRoot(id?: string) {
  const nodeId = id ?? clickedNodeID.value
  if (nodeId) {
    chartInstance?.setCentered(nodeId).render()
  }
}

function clearMark() {
  chartInstance?.clearHighlighting().render()
}

defineExpose({
  fitChart,
  compactChart,
  expandAll,
  collapseAll,
  findRoot,
  clearMark
})

onMounted(async () => {
  try {
    const data = await d3.csv('https://raw.githubusercontent.com/bumbeishvili/sample-data/main/org.csv')
    renderOrgChart(chartContainer, data)
  } catch (error) {
    console.error('Error loading data:', error)
  }
})
</script>

<style scoped>
.chart-container {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}

</style>
