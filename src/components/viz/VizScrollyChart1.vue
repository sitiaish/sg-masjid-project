<template>
<div>
  <!-- <v-btn @click="drawByName(data)">click</v-btn> -->
  
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
      return window.innerHeight * 0.75;
    },
    width() {
      const width = d3.select('.wrapper__scrolly-chart').node().getBoundingClientRect().width
        return width;
    },
    centerCoor() {
      return {
        x: this.chartSettings.innerWidth / 2,
        y: this.chartSettings.innerHeight / 2,
      };
    },
    splitCenterCoors() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return {
          bubbles: [
            { x: this.chartSettings.width / 2 + 10, y: this.chartSettings.height / 4 - 50 },
            { x: this.chartSettings.width / 2 + 10, y: (3 * this.chartSettings.height) / 4 + 25 },
          ],
          labels: [
            { x: this.chartSettings.width / 2, y: 18 },
            { x: this.chartSettings.width / 2, y: this.chartSettings.height / 2 - 20 },
          ],
        };
      }
      return {
        bubbles: [
          { x: (0.7 * this.chartSettings.width) / 4, y: 0.42 * this.chartSettings.height },
          { x: (3.1 * this.chartSettings.width) / 4, y: 0.55 * this.chartSettings.height },
        ],
        labels: [
          { x: (1.5 * this.chartSettings.width) / 6, y: 25 },
          { x: (4.4 * this.chartSettings.width) / 6, y: 25 },
        ],
      };
    },        
    chartMargin() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return { top: 10, right: 10, bottom: 10, left: 10 };
      }
      return { top: 60, right: 10, bottom: 10, left: 10 };
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
      const data = await d3.csv('/data/data.csv');
      this.$nextTick(() => {
        this.createNodes(data);
        this.initChart();  
        this.createSimulation();
        this.groupBubbles();
        this.drawBubbleChart(this.data);  
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
        .attr('class', 'chartarea').attr('transform', `translate(0, ${this.chartMargin.top / 2})`);        
    },
    createNodes(rawData) {
      this.data = rawData.map((d) => {
        return {
          name: d.name,
          type: d.type,
          cluster: d.cluster,
          radius: 10,
          x: Math.random(),
          y: Math.random(),
        };
      });
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
        .attr('cx',  (d, i) => 15 + i % 6 * 40)
        .attr('cy', (d, i) => 30 + Math.floor(i / 6) * 40)
        .attr('r', 15)
        .attr('fill', '#c6c6c6');

      cluster
        .append('text').attr('class', 'cluster-name')
        .attr('x',  0)
        .attr('y', -35)
        .text(d => d[0] + ' Cluster')

      cluster
        .append('text').attr('class', 'cluster-name')
        .attr('x',  0)
        .attr('y', -15)
        .text(d => d[1].length + ' mosques')        
        .attr('class', 'text--caption');      

      // cluster.exit().remove();          

      // moving the clusters
      d3
        .select('g.East')
        .attr('transform', `translate(${this.chartMargin.left + this.chartSettings.innerWidth / 2}, ${this.chartMargin.top})`)

      d3
        .select('g.West')
        .attr('transform', `translate(${this.chartMargin.left + this.chartSettings.innerWidth / 2},  ${this.chartMargin.top + this.chartMargin.bottom + this.chartSettings.innerHeight / 2})`)

      d3
        .select('g.North')
        .attr('transform', `translate(0, ${this.chartMargin.top})`)

      d3
        .select('g.South')
        .attr('transform', `translate(0, ${this.chartMargin.top + this.chartMargin.bottom + this.chartSettings.innerHeight / 2})`)                

    },   
    drawByName(data) {     

      d3.selectAll('g.cluster')
        .transition()
        .duration(1000)
        .attr('transform', `translate(${this.chartSettings.innerWidth / 4}, ${this.chartSettings.innerHeight / 2})`)
        // .attr('opacity', 0)

      d3    
        .selectAll('circle.masjid')
        .transition()
        .duration(500)        
        .attr('r', 0);
        // .attr('fill', 'red');        


      const type = 
      d3.select('g.chartarea')
        .selectAll('g.cluster1')
        .data(d3.group(data, d => d.type)).enter()
        .append('g')
        .attr('class', d => `cluster ${d[0]}`);

        console.log(d3.group(data, d => d.type));

      type     
        .selectAll('circle.masjid2')
        .data(([, values]) => values)
        .enter()
        .append('circle').attr('class', 'masjid')  
        .attr('cx',  (d, i) => 15 + i % 6 * 40)
        .attr('cy', (d, i) => 30 + Math.floor(i / 6) * 40)
        .attr('r', 0)
        .transition()
        .duration(1000)        
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
    drawBubbleChart(nodes) {
      this.bubbles = d3.select('g.chartarea').selectAll('.bubble').data(nodes);

      const bubblesSVG = this.bubbles
        .enter()
        .append('circle')
        .classed('bubbles', true)
        .attr('r', 0)
        .attr('fill', 'red')

      this.bubbles = this.bubbles.merge(bubblesSVG);
      this.bubbles.transition().duration(800).attr('r', 20);

      // d3.selectAll('circle.bubbles')
      //   .on('mouseenter', function hover() {
      //     d3.select(this)
      //       .attr('r', (d) => d.radius + 5)
      //       .style('fill', 'yellow');
      //   })
      //   .on('mouseleave', function hover() {
      //     d3.select(this)
      //       .attr('r', (d) => d.radius)
      //       .style('fill', 'blue');
      //   });

      this.simulation.nodes(nodes);
    },
    createSimulation() {
      this.simulation = d3
        .forceSimulation()
        .force(
          'charge',
          d3.forceManyBody().strength(250)
        )
        .force(
          'collision',
          d3.forceCollide().radius(30)
        )
        .on('tick', this.ticked);

      this.simulation.stop();
    },
    groupBubbles() {
      this.simulation
        .force('x', d3.forceX().strength(0.05).x(this.centerCoor.x))
        .force('y', d3.forceY().strength(0.05).y(this.centerCoor.y))
        .alpha(0.5)
        .restart();
    },
    splitBubbles(selected) {
      this.simulation.force(
        'x',
        d3
          .forceX()
          .strength(this.strength.x)
          .x((d) => this.splitCenterCoors.bubbles[d[selected]].x)
      );
      this.simulation.force(
        'y',
        d3
          .forceY()
          .strength(this.strength.y)
          .y((d) => this.splitCenterCoors.bubbles[d[selected]].y)
      );
      this.simulation.force(
        'collision',
        d3.forceCollide().radius((d) => d.radius)
      );
      this.simulation.alpha(this.strength.alpha).restart();
    },
    ticked() {
      const width = this.width;
      const height = this.height;
      d3.selectAll('circle')
        .attr('cx', function assignx(d) {
          d.x = Math.max(100, Math.min(width - 200, d.x));
          return d.x;
        })
        .attr('cy', function assigny(d) {
          d.y = Math.max(200, Math.min(height - 200, d.y));
          return d.y;
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


  