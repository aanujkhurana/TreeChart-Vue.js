import { ref } from "vue";
import * as d3 from "d3";
import { OrgChart } from "d3-org-chart";
import { createApp } from "vue";
import ChartUI from "./chat_ui.vue";

export function useOrgChart() {
  const chartInstance = ref(null);
  const clickedNodeID = ref(null);

  const render = (container, data) => {
    if (!container || !data.length) return;

    const chart = new OrgChart()
      .container(container)
      .data(data)
      .scaleExtent([0.1, 0.75])
      .setActiveNodeCentered(true)
      .nodeHeight(() => 230)
      .nodeWidth(() => 380)
      .childrenMargin(() => 120)
      .compactMarginBetween(() => 80)
      .compactMarginPair(() => 120)
      .siblingsMargin(() => 120)

      // .nodeUpdate(function (d) {
      //   d3.select(this)
      //     .select(".node-rect")
      //     .attr("width", 386)
      //     .attr("height", 385)
      //     .attr("stroke", (d) =>
      //       d.data._highlighted || d.data._upToTheRootHighlighted
      //         ? "#4285F4"
      //         : "none"
      //     )
      //     .attr("stroke-width", (d) =>
      //       d.data._highlighted || d.data._upToTheRootHighlighted ? 8 : 2
      //     )
      //     .attr("y", -3)
      //     .attr("x", -3)
      //     .attr("stroke-linejoin", "round")
      //     .style("stroke-alignment", "outer");
      // })

      .onNodeClick((d) => {
        console.log(d);
        clickedNodeID.value = d.data.id;
        fitChart();
        markNode(d.data.id);
        clearMark();
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

      .nodeButtonX(() => -80)
      .nodeButtonY(() => -20)

      .buttonContent(({ node }) => {
        const foreignObject = d3.selectAll(".node-button-foreign-object");
        foreignObject.attr("width", 200).attr("height", 42);

        const text = node.children
          ? `▲ Collapse ${node.data._directSubordinates} Nodes`
          : `▼ Expand ${node.data._totalSubordinates} Nodes`;

        const gradient = node.children
          ? "linear-gradient(180deg, rgba(66,133,244,1) 0%, rgba(32,38,171,1) 100%)"
          : "linear-gradient(180deg, rgba(32,38,171,1) 0%, rgba(66,133,244,1) 100%)";

        return `
          // <div class="rounded-[32px] w-[140px] h-[42px] p-3 text-white text-center relative"
               style="background: ${gradient};
                      box-shadow: 0px 4px 16px 0px rgba(0, 55, 146, 0.4);
                      font: 600 14px">
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

    d3.select(container)
      .select("svg")
      .attr("width", "100%")
      .attr("height", "100vh");

    chartInstance.value = chart;
  };

  const fitChart = () => chartInstance.value?.fit();
  const normalChart = () => {
    chartInstance.value.compact(true).layout("top").render().fit();
  };
  const compactChart = () => {
    chartInstance.value?.layout("left").render().fit();
  };
  const expandAllNodes = () => chartInstance.value?.expandAll().fit();
  const collapseAllNodes = () => chartInstance.value?.collapseAll().fit();
  function findRoot(nodeID) {
    // if (!nodeID || !chartInstance.value) return;
    chartInstance.value?.setExpanded(nodeID);
  }
  const clearMark = () => {
    if (!chartInstance.value) return;

    chartInstance.value.clearHighlighting?.().render().fit?.();
  };
  function markNode(nodeID) {
    // Check if chart is defined
    chartInstance.value?.setHighlighted(nodeID);
  }

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
