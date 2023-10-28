<template>
  <Chart :data="data"></Chart>
</template>
<script>
import * as d3 from 'd3';
import Chart from './Chart';

export default {
  el: '#App',
  data() {
    return {
      data: null,
    };
  },
  components: {
    Chart,
  },
  created() {
    d3.csv(
      'https://raw.githubusercontent.com/bumbeishvili/sample-data/main/org.csv'
    ).then((d) => {
      console.log('fetched data', d);
      this.data = d;
    });
  },
};
</script>
