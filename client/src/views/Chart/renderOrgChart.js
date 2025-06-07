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
      .scaleExtent([0.2, 1.75])
      .setActiveNodeCentered(true)
      .nodeHeight(() => 230)
      .nodeWidth(() => 380)
      .childrenMargin(() => 120)
      .compactMarginBetween(() => 80)
      .compactMarginPair(() => 120)
      .siblingsMargin(() => 120)

      .nodeUpdate(function (d) {
        d3.select(this)
          .select(".node-rect")
          .attr("stroke", (d) =>
            d.data._highlighted || d.data._upToTheRootHighlighted
              ? "#4285F4"
              : "none"
          )
          .attr("stroke-width", (d) =>
            d.data._highlighted || d.data._upToTheRootHighlighted ? 6 : 1
          )
          .attr("stroke-linejoin", "round")
          .style("stroke-alignment", "outer");
      })

      .onNodeClick((d) => {
        console.log(d);
        clickedNodeID.value = d.data.id;
        markNode(d.data.id);
      })

      .linkUpdate(function (d) {
        d3.select(this)
          .attr("stroke", (d) =>
            d.data._upToTheRootHighlighted ? "#4285F4" : "#1E1C8A"
          )
          .attr("stroke-width", (d) =>
            d.data._upToTheRootHighlighted ? 6 : 3
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
  const directionTop = () => {
    chartInstance.value.compact(true).layout("top").render().fit();
  };
  const directionLeft = () => {
    chartInstance.value?.layout("left").render().fit();
  };
  const directionRight = () => {
    chartInstance.value?.layout("right").render().fit();
  };
  const directionBottom = () => {
    chartInstance.value?.layout("bottom").render().fit();
  };
  const expandAllNodes = () => chartInstance.value?.expandAll().fit();
  const collapseAllNodes = () => chartInstance.value?.collapseAll().fit();

  const isMarked = ref(false);

  function markNode(nodeID) {
    if (isMarked.value) {
      isMarked.value = false;
      chartInstance.value.clearHighlighting?.().render();
    } else {
      chartInstance.value?.setHighlighted(nodeID).render();
      findParent(nodeID);
      isMarked.value = true;
    }
  }

  function findParent(nodeID) {
    if (!nodeID || !chartInstance.value) return;
    chartInstance.value?.setUpToTheRootHighlighted(nodeID).render();
  }

  return {
    chartInstance,
    clickedNodeID,
    render,
    fitChart,
    directionLeft,
    expandAllNodes,
    collapseAllNodes,
    directionTop,
    directionBottom,
    directionRight,
    markNode,
    findParent,
  };
}
