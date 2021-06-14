<template>
<div>
  <v-btn @click="drawByName(data)">click</v-btn>
  
  <div class="wrapper__scrolly-chart">
    <svg id="scrolly-chart" />
  </div>
</div>
</template>

<script>
import * as d3 from 'd3';
import _kebabCase from 'lodash.kebabcase';

export default {
  name: 'VizScrollyChart',
  props: {
    step: {
      type: Number,
      required: true,
    },
    direction: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      data: [],
    };
  },
  computed: {
    height() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return 350;
      }
      return window.innerHeight * 0.8;
    },
    width() {
      const width = d3.select('.wrapper__scrolly-chart').node().getBoundingClientRect().width
        return width;
    },
    chartMargin() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return { top: 10, right: 10, bottom: 10, left: 10 };
      }
      return { top: 50, right: 10, bottom: 10, left: 10 };
    },    
    chartSettings() {
      return {
        innerWidth: this.width - this.chartMargin.left - this.chartMargin.right,
        innerHeight: this.height - this.chartMargin.top - this.chartMargin.bottom,
      };
    },
  },  
  mounted() {
    this.parseData();
    // this.drawGraph(this.data);
  },
  methods: {
    async parseData() {
      this.data = await d3.csv('/data/data.csv'); 
      this.initChart();
      this.$nextTick(() => {
        this.drawByCluster(this.data);
      });           
    },
    clearChartArea() {
      this.chartSVG.select('.cluster-name').transition().duration(200).attr('opacity', 0)
    },
    initChart() {
      const chartSVG = d3.select('#scrolly-chart');
      // draw base
      chartSVG
        .attr('width', this.width)
        .attr('height', this.height)
        .style('border', '1px solid black')
        .call(this.responsivefy)
        .append('g')
        .attr('class', 'chartarea').attr('transform', `translate(0, ${this.chartMargin.top})`);        
    },
    drawByCluster(data) {
      const cluster = 
      d3.select('g.chartarea')
        .selectAll('g.cluster')
        .data(d3.group(data, d => d.cluster)).enter()
          .append('g')
          .attr('class', d => `cluster ${d[0]}`);

      cluster     
        .selectAll('circle.masjid')
        .data(([, values]) => values)
        .enter()
        .append('circle').attr('class', 'masjid')
        .attr('name', d => d.name)
        .attr('cx',  (d, i) => 15 + i % 6 * 40)
        .attr('cy', (d, i) => 60 + Math.floor(i / 6) * 40)
        .attr('r', 15)
        .attr('fill', '#c6c6c6');

      cluster
        .append('text').attr('class', 'cluster-name')
        .attr('x',  0)
        .attr('y', 0)
        .text(d => d[0] + ' Cluster')

      cluster
        .append('text').attr('class', 'cluster-name')
        .attr('x',  0)
        .attr('y', 20)
        .text(d => d[1].length + ' mosques')        
        .attr('class', 'text--caption');      

      // moving the clusters
      d3
        .select('g.East')
        .attr('transform', `translate(${this.chartMargin.left + this.chartSettings.innerWidth / 2}, 0)`)

      const maxClusterHeight = d3.select('g.East').node().getBoundingClientRect().height;

      d3
        .select('g.North')
        .attr('transform', `translate(0, 0)`)
      d3
        .select('g.South')
        .attr('transform', `translate(0, ${this.chartMargin.top + maxClusterHeight})`);
      d3
        .select('g.West')
        .attr('transform', 
          `translate(${this.chartMargin.left + this.chartSettings.innerWidth / 2},  ${this.chartMargin.top + maxClusterHeight})`)        
    },   
    drawByName(data) {     
      // d3.selectAll('g.cluster')
      //   .transition()
      //   .duration(1000)
      //   .attr('transform', `translate(${this.chartSettings.innerWidth / 4}, ${this.chartSettings.innerHeight / 2})`)
      //   // .attr('opacity', 0)

      d3    
        .selectAll('circle.masjid')
        .transition()
        .duration(500)        
        .attr('r', 0).remove();

      const type = 
      d3.select('g.chartarea')
        .selectAll('g.cluster2')
        .data(d3.group(data, d => d.type)).enter()
        .append('g')
        .attr('class', d => `cluster2 ${d[0]}`);

      type     
        .selectAll('circle.masjid')
        .data(([, values]) => values)
        .enter()
        .append('circle').attr('class', 'masjid') 
        .transition()
        .duration(1000)           
        .attr('cx',  (d, i) => 15 + i % 6 * 40  )
        .attr('cy', (d, i) => 30 + Math.floor(i / 6) * 40)
        .attr('r', 15)
        .attr('fill', 'red');

      type
        .append('text').attr('class', 'type-name')
        .attr('x',  0)
        .attr('y', -10)
        .text(d => d[0] + ' Type')

      // type
      //   .append('text').attr('class', 'type-name')
      //   .attr('x',  0)
      //   .attr('y', -15)
      //   .text(d => d[0] + ' type')        
      //   .attr('class', 'text--caption');      

      type.exit().remove();          

      // moving the clusters
      d3
        .select('g.Wakaf')
        .attr('transform', `translate(${this.chartMargin.left + this.chartSettings.innerWidth / 2}, 0)`);

      d3
        .select('g.TOL')
        .attr('transform', `translate(${this.chartMargin.left + this.chartSettings.innerWidth / 2},  ${this.chartSettings.innerHeight / 2 + 40})`);

      d3
        .select('g.MBMF')
        .attr('transform', `translate(0, 0)`);

      d3
        .select('g.Leasehold')
        .attr('transform', `translate(0, ${this.chartSettings.innerHeight / 2 + 40})`);              

      d3
        .select('g.Others')
        .attr('transform', `translate(0, ${this.chartSettings.innerHeight - 30})`);
    }, 
    kebabCase(string) {
      return _kebabCase(string)
    },      
    responsivefy(svg) {
      const width = parseInt(svg.style('width'), 10);
      const height = parseInt(svg.style('height'), 10);
      const aspect = width / height;

      svg
        .attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMinYMid')
        .call(this.resize, aspect);

      d3.select(window).on('resize.test', () => {
        this.resize(svg, aspect);
      });
    },
    resize(svg, aspect) {
      const container = d3.select(svg.node().parentNode);
      const w = parseInt(container.style('width'), 10);

      svg.attr('width', w);
      svg.attr('height', Math.round(w / aspect));
    },    
  },
};
</script>

<style lang="scss" scoped>
.wrapper__scrolly-chart {
  border: 2px solid white;
}
</style>


  