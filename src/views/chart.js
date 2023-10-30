import { OrgChart } from 'd3-org-chart';

export default {
template: `  <div  ref="svgElementContainer" ></div>`,
name: 'Chart',
props: ['data'],
data() {
    return {
    chartReference: null,
    };
},
watch: {
    data(value) {
    this.renderChart(value);
    },
},
created() {
    console.log('created org chart');
},
methods: {
    renderChart(data) {
    if (!this.chartReference) {
        this.chartReference = new OrgChart();
    }
    this.chartReference
        .container(this.$refs.svgElementContainer) // node or css selector
        .data(data)
        .nodeHeight((d) => 120)
        .onNodeClick((d) => console.log(d + ' node clicked'))
        .render();
    },
},
};
