import { ref } from "vue";
import * as d3 from "d3";
import { OrgChart } from "d3-org-chart";

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
      .onNodeClick((d) => {
        console.log(d);
        clickedNodeID.value = d.data.id;
        // markNode(d.data.id);
      })
      .nodeContent((d) => {
        const htmlNode = document.getElementById(`vue-node-${d.data.id}`);
        return htmlNode?.innerHTML || `<div>Missing node</div>`;
      })
      .nodeUpdate(function (d) {
        d3.select(this)
          .select(".node-rect")
          .attr("stroke", (d) =>
            d.data._highlighted || d.data._upToTheRootHighlighted
              ? "#4285F4"
              : "none"
          )
          .attr("stroke-width", (d) =>
            d.data._highlighted || d.data._upToTheRootHighlighted ? 4 : 2
          )
          .attr("stroke-linejoin", "round")
          .style("stroke-alignment", "outer");
      })
      .linkUpdate(function (d) {
        d3.select(this)
          .attr("stroke", (d) =>
            d.data._upToTheRootHighlighted ? "#4285F4" : "#1E1C8A"
          )
          .attr("stroke-width", (d) =>
            d.data._upToTheRootHighlighted ? 4 : 2
          );
        if (d.data._upToTheRootHighlighted) d3.select(this).raise();
      })

      .nodeButtonX(() => -70)
      .nodeButtonWidth(() => 140)
      .nodeButtonHeight(() => 40)
      .buttonContent(({ node }) => {
        const text = node.children
          ? `▲ Collapse ${node.data._directSubordinates} Nodes`
          : `▼ Expand ${node.data._totalSubordinates} Nodes`;
        return `
          <div class="rounded-[32px] p-3 text-white text-center relative"
              style="background: linear-gradient(180deg, rgba(66,133,244,1) 0%, rgba(32,38,171,1) 100%);
                      box-shadow: 0px 4px 16px 0px rgba(0, 55, 146, 0.4);
                      font: 600 14px">
            ${text}
          </div>
        `;
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

  // const isMarked = ref(false);

  // function markNode(nodeID) {
  //   if (isMarked.value) {
  //     isMarked.value = false;
  //     chartInstance.value.clearHighlighting?.().render();
  //   } else {
  //     chartInstance.value?.setHighlighted(nodeID).render();
  //     isMarked.value = true;
  //   }
  // }
  // function findParent(nodeID) {
  //   if (!nodeID || !chartInstance.value) return;
  //   chartInstance.value?.setUpToTheRootHighlighted(nodeID).render();
  // }

  function clearMarker() {
    chartInstance.value.clearHighlighting?.().render();
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
    // markNode,
    // findParent,
    clearMarker,
  };
}
