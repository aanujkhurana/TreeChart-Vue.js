<template>
    <div class="chart-container" ref="chartContainer"></div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import * as d3 from 'd3';
  import { OrgChart } from 'd3-org-chart';
  
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
          .render();
  
        return chart;
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
  
  .container {
    max-width: 1100px;
    margin: 0 auto;
  }
  </style>
  