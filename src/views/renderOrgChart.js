import { ref } from "vue";
import * as d3 from "d3";
import { OrgChart } from "d3-org-chart";
import { createApp } from "vue";
import ChartUI from "./ChartUI.vue";

/**
 * Custom composable for working with d3-org-chart.
 * @returns {{
 *   chartInstance: import('vue').Ref<any>,
 *   clickedNodeID: import('vue').Ref<string|null>,
 *   render: (container: HTMLElement|null, data: any[]) => void,
 *   fitChart: () => void,
 *   compactChart: () => void,
 *   expandAllNodes: () => void,
 *   collapseAllNodes: () => void,
 *   findRoot: (id: string) => void,
 *   clearMark: () => void
 * }}
 */
export function useOrgChart() {
  const chartInstance = ref(null);
  const clickedNodeID = ref(null);

  const render = (container, data) => {
    if (!container || !data.length) return;

    const chart = new OrgChart()
      .container(container)
      .data(data)
      .scaleExtent([0.1, 1])
      .setActiveNodeCentered(true)
      .nodeHeight(() => 380)
      .nodeWidth(() => 376)
      .childrenMargin(() => 120)
      .compactMarginBetween(() => 70)
      .compactMarginPair(() => 120)
      .siblingsMargin(() => 120)

      .nodeUpdate(function (d) {
        d3.select(this)
          .select(".node-rect")
          .attr("width", 386)
          .attr("height", 385)
          .attr("stroke", (d) =>
            d.data._highlighted || d.data._upToTheRootHighlighted
              ? "#4285F4"
              : "none"
          )
          .attr("stroke-width", (d) =>
            d.data._highlighted || d.data._upToTheRootHighlighted ? 8 : 2
          )
          .attr("y", -3)
          .attr("x", -3)
          .attr("stroke-linejoin", "round")
          .style("stroke-alignment", "outer");
      })

      .linkUpdate(function (d) {
        d3.select(this)
          .attr("stroke", (d) =>
            d.data._upToTheRootHighlighted ? "#4285F4" : "#1E1C8A"
          )
          .attr("stroke-width", (d) =>
            d.data._upToTheRootHighlighted ? 15 : 3
          );
        if (d.data._upToTheRootHighlighted) d3.select(this).raise();
      })

      .onNodeClick((d) => {
        clickedNodeID.value = d.id;
        chart.setExpanded(d.id, !chart.isExpanded(d.id));
        chart.render();
      })

      .nodeButtonX(() => -150)
      .nodeButtonY(() => -30)

      .buttonContent(({ node }) => {
        const foreignObject = d3.selectAll(".node-button-foreign-object");
        foreignObject.attr("width", 300).attr("height", 50);

        const text = node.children
          ? `▲ Collapse ${node.data._directSubordinates} Parts`
          : `▼ Expand ${node.data._totalSubordinates} Parts`;

        const gradient = node.children
          ? "linear-gradient(180deg, rgba(66,133,244,1) 0%, rgba(32,38,171,1) 100%)"
          : "linear-gradient(180deg, rgba(32,38,171,1) 0%, rgba(66,133,244,1) 100%)";

        return `
          <div class="rounded-[42px] w-[360px] h-[52px] p-4 text-white text-center relative"
               style="background: ${gradient};
                      box-shadow: 0px 4px 16px 0px rgba(0, 55, 146, 0.4);
                      font: 600 15px sans-serif">
            ${text}
          </div>
        `;
      })

      .nodeContent((d) => {
        const app = createApp(ChartUI, { data: d.data });
        const vm = app.mount(document.createElement("div"));
        const html = vm.$el.outerHTML;
        app.unmount();
        return html;
      })

      .render()
      .fit();

    chartInstance.value = chart;
  };

  const fitChart = () => chartInstance.value?.fit();
  const compactChart = () => {
    if (!chartInstance.value) return;

    chartInstance.value
      .compact(true) // this is a setter in D3 Org Chart
      .render()
      .fit();
  };
  const normalChart = () => {
    chartInstance.value?.compact(false).render().fit();
  };

  const expandAllNodes = () => chartInstance.value?.expandAll();
  const collapseAllNodes = () => chartInstance.value?.collapseAll();
  const findRoot = (nodeID) => {
    if (!nodeID || !chartInstance.value) return;

    chartInstance.value
      .setExpanded((d) => d.id === nodeID)
      .render()
      .fit();
  };
  const clearMark = () => {
    if (!chartInstance.value) return;

    chartInstance.value.clearHighlighting?.().render().fit?.();
  };

  return {
    chartInstance,
    clickedNodeID,
    render,
    fitChart,
    compactChart,
    expandAllNodes,
    collapseAllNodes,
    findRoot,
    clearMark,
    normalChart,
  };
}
