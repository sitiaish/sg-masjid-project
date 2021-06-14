<template>
<div>
  <v-btn @click="drawByLanduse(this.data)">groupbylanduse</v-btn>
  <v-btn @click="colorByLanduse()">addcolor</v-btn>
  <v-btn @click="drawByCluster(this.data)">addbubblechart</v-btn>
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
      return { top: 50, right: 10, bottom: 10, left: 50 };
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
  },
  methods: {
    async parseData() {
      this.data = await d3.csv('/data/data.csv'); 
      this.initChart();
      this.$nextTick(() => {
        // this.drawBeeswarm(this.data);
        this.drawByCluster(this.data);
      });           
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
        .attr('class', 'chartarea').attr('transform', `translate(${this.chartMargin.left}, ${this.chartMargin.top})`);        
    },
    getCoordinates(data, coordInit, groupBy) {
      const coordinates = 
      data.map(d => {
        const i = coordInit[d[groupBy]].count
        let start = 
          { x: coordInit[d[groupBy]].x, y: coordInit[d[groupBy]].y }
        start.x += 40 * (i % 6)
        start.y += 40 * Math.floor(i / 6)

        coordInit[d[groupBy]].count += 1
        return start
      })
      return coordinates
    },
    drawByCluster(data) {

      const clusterSettings = {
        North: { x: 0, y: 0, count: 0 },
        South: { x: 0, y: this.chartSettings.innerHeight / 2, count: 0 },
        East: { x: this.chartSettings.innerWidth / 2, y: 0, count: 0 },
        West: { x: this.chartSettings.innerWidth / 2, y: this.chartSettings.innerHeight / 2, count: 0 },
      }

      const clusterCoord = this.getCoordinates(data, clusterSettings, 'cluster');

      d3.select('.chartarea')
        .selectAll('circle.data')
        .data(data).enter()
        .append('circle').attr('class', 'data')
        .attr('cx', (d, i) => clusterCoord[i].x + 15)
        .attr('cy', (d, i) => clusterCoord[i].y + 40)
        .attr('r', 12)
        .attr('fill', '#c6c6c6');

      const labelData = d3.group(data, d => d.cluster);

      const textgroup = d3
        .select('.chartarea')
        .append('g')
        .attr('class', 'text-group')
        .selectAll('text')
        .data(labelData).enter();

      textgroup
        .append('text')
        .attr('class', d => `cluster-name ${d[0]}`)
        .attr('x',  d => clusterSettings[d[0]].x)
        .attr('y', d => clusterSettings[d[0]].y - 20)
        .text(d => d[0] + ' Cluster')

      textgroup
        .append('text')
        .attr('x',  d => clusterSettings[d[0]].x)
        .attr('y',  d => clusterSettings[d[0]].y)
        .text(d => d[1].length + ' mosques')        
        .attr('class', 'text--caption cluster-name');       
    },
    colorByLanduse() {
      const LanduseColor = {
        Wakaf: 'red', 
        TOL: 'yellow',
        MBMF: 'green',
        Leasehold: 'purple'
      }
      d3.selectAll('circle.data')
        .attr('fill', d => LanduseColor[d.type]);      
    },
    drawByLanduse(data) {

      d3.selectAll('text.cluster-name').remove();

      const LanduseSettings = {
        Wakaf: { x: 0, y: 0, count: 0, label: 'Wakaf' },
        TOL: { x: 0, y: this.chartSettings.innerHeight / 2, count: 0, label: 'Temporary Occupation Licence' },
        MBMF: { x: this.chartSettings.innerWidth / 2, y: 0, count: 0, label: 'Mosque Building & Mendaki Fund' },
        Leasehold: { x: this.chartSettings.innerWidth / 2, y: this.chartSettings.innerHeight / 2, count: 0, label: 'Leasehold' },
        Others: { x: 0, y: 4 * this.chartSettings.innerHeight / 5, count: 0, label: 'Other' },        
      }

      const landuseCoord = this.getCoordinates(data, LanduseSettings, 'type');

      d3.select('.chartarea')
        .selectAll('circle.data')
        .transition()
        .duration(1500) 
        .attr('cx', (d, i) => landuseCoord[i].x + 15)
        .attr('cy', (d, i) => landuseCoord[i].y + 20)
        .attr('r', 12);

      const labelData = d3.group(data, d => d.type);

      const textgroup = d3
        .select('.chartarea')
        .append('g')
        .attr('class', 'text-group')
        .selectAll('text')
        .data(labelData).enter();

      textgroup
        .append('text')
        .attr('class', d => `landuse-name ${d[0]}`)
        .attr('x',  d => LanduseSettings[d[0]].x)
        .attr('y', d => LanduseSettings[d[0]].y - 15)
        .text(d => LanduseSettings[d[0]].label)   
    },       
    drawBeeswarm(data) {

      const width = this.chartSettings.innerWidth - 100;
      const height = this.chartSettings.innerHeight;

      const xScale = d3.scaleLinear().domain([1819.5, 2020.5]).range([0, width]);      
      d3.select('g.chartarea')
        .append('g').attr("class", "XAxis")
        .attr('transform', `translate(0, ${height - 60})`)
        .call(
          d3
            .axisBottom(xScale)
            // .ticks(10)
            .tickFormat(d3.format('d'))
            .tickSize(5)
            .tickSizeOuter(0)
        );
      d3.selectAll('.XAxis > .tick line').attr('transform', 'translate(0, -5)');

      d3.select('g.chartarea')
        .append('g').attr('class', 'datapoints')
        .selectAll('circle.data')
        .data(data).enter()
        .append("circle")
        .attr("class", d => `data ${d.name}`)
        .attr("cx", 250)
        .attr("cy", 250)
        .attr("r", 15)
        .attr("fill", 'pink');

      d3.forceSimulation()
        .force('x', d3.forceX(d => xScale(d.year_built)).strength(1.2))
        .force('y', d3.forceY((d, i) => this.chartSettings.innerHeight / 2.5 + 2 * (i % 2) * 10).strength(0.1))
        .force('collision', d3.forceCollide().radius(18))
        .nodes(data)
        .alpha(1)
        .on('tick', function updateNodes() {
          d3.selectAll('circle.data')
            .transition()
            .duration(0)      
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);   
        });
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


  