<template>
  <div class="wrapper__story">
    <v-container py-12>
      <v-row class="py-12" align="center" justify="center">
        <v-col cols="12" md="8">
          <h1 class="text--h3 font-weight-light text-center mb-5">Masjid-masjid in Singapore</h1>
        </v-col>
        <v-col cols="12" md="10">        
          <p class="text--body-1">This is one mosque in Singapore.</p>
        </v-col>
      </v-row>

      <v-row align="start" justify="space-between">
        <v-col v-for="(n, i) in data" :key="i" cols="1" class="wrapper__chart">
          <div class="mosque-name">
            <p class="text--caption text-center">{{ n.name }}</p>
          </div>
          <div>
            <svg :id="kebabCase(n.name)"/>
          </div>          
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import * as d3 from 'd3';
import _kebabCase from 'lodash.kebabcase';

export default {
  name: 'SectionMap',
  data() {
    return {
      data1: [
        {name: 'Bencoolen', capacity: '15'}
      ],
      data: [],      
      masjid: []
    };
  },
  computed: {
    innerHeight() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return 350;
      }
      return 450;
    },
    width() {
      const width = d3.select('.wrapper__chart').node().getBoundingClientRect().width
        return width;
    },
    barWidth() {
      return 75;
    },
    chartMargin() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return { top: 40, right: 10, bottom: 35, left: 40 };
      }
      return { top: 10, right: 10, bottom: 10, left: 10 };
    },    
    chartSettings() {
      return {
        width: this.width,
        height: this.innerHeight + this.chartMargin.top + this.chartMargin.bottom,
      };
    },
  },  
  mounted() {
    this.parseData();
  },
  methods: {
    async parseData() {
      this.data = await d3.csv('data/data.csv');      
      this.$nextTick(() => {
        this.data.forEach(n => {
          this.drawGraph(_kebabCase(n.name), n.divided);
        })
      });      
    },
    drawGraph(id, capacity) {
      this.chartSVG = d3.select(`#${id}`);

      // draw base
      this.chartSVG
        .attr('width', this.chartSettings.width)
        .attr('height', this.chartSettings.height)
        // .style('border', '1px solid black')
        .call(this.responsivefy);

      const data = d3.range(capacity);
      // draw the saf
      this.chartSVG
        .append('g').attr('class', 'saf-group')
        .attr('transform', `translate(${this.chartMargin.left}, ${this.chartMargin.top})`)
        .selectAll('rect.saf')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'saf')
        .attr('x', 0)
        .attr('y', (d, i) => i * 10)
        .attr('width', this.width - 20)
        .attr('fill', '#C1B5DE')
        .attr('height', 3);
    },  
    kebabCase(string) {
      return _kebabCase(string)
    },      
    drawGraphid(id) {
      this.chartSVG = d3.select(`#${id}`);
      const eachBird = this.birdGroup.find(bird => this.$_.kebabCase(bird.key) === id);

      // set the margin based on the number of digits of Y Axis
      const YAxisMax = d3.max(eachBird.values, d => +d.max);
      if (YAxisMax > 200000) {
        this.chartMargin.left = this.$vuetify.breakpoint.smAndDown ? 65 : 60;
      } else {
        this.chartMargin.left = this.$vuetify.breakpoint.smAndDown ? 46 : 42;
      }

      // draw base
      this.chartSVG
        .attr('width', this.chartSettings.width)
        .attr('height', this.chartSettings.height)
        // .style('border', '1px solid black')
        .call(this.responsivefy);

      // axes
      this.XAxis = d3
        .scaleBand()
        .domain(eachBird.values.map(d => d.year))
        .range([0, this.innerWidth]);

      this.chartSVG
        .append('g')
        .attr('class', 'XAxis')
        .attr('transform', `translate(${this.chartMargin.left}, ${this.innerHeight + this.chartMargin.top})`)
        .call(
          d3
            .axisBottom(this.XAxis)
            .ticks(2)
            .tickFormat(d3.format('d'))
            .tickSize(6)
            .tickSizeOuter(0)
        );
      d3.selectAll('.XAxis > .tick line').attr('transform', 'translate(0, -3)');

      this.YAxis = d3
        .scaleLinear()
        .domain([YAxisMax, 0])
        .range([0, this.innerHeight]);
      
      this.chartSVG
        .append('g')
        .attr('class', 'YAxis')
        .attr('transform', `translate(${this.chartMargin.left}, ${this.chartMargin.top})`)
        .call(d3
          .axisLeft(this.YAxis)
          .ticks(5, d3.format('d'))
          .tickSize(-this.innerWidth)
        )
        .call(g => g.select('.domain', '').remove());        
        
      this.chartSVG
        .append('g').attr('class', 'populationBars')
        .attr('transform', `translate(${this.chartMargin.left + this.barWidth / 2}, ${this.chartMargin.top})`)
        .selectAll('rect.bars')
        .data(eachBird.values)
        .enter()
        .append('rect')
        .attr('class', 'bars')
        .attr('x', d => this.XAxis(d.year))
        .attr('y', d => this.YAxis(+d.population))
        .attr('width', this.barWidth)
        .attr('fill', d => d.diff === '' ? '#B2D2C6' : '#C1B5DE')
        .attr('stroke-wdith', 0.5)
        .attr('stroke', d => d.diff === '' ? '#73AD98' : '#8870BF')
        .attr('height', d => this.YAxis(0) - this.YAxis(d.population))

      this.chartSVG
        .append('g').attr('class', 'populationBars')
        .attr('transform', `translate(${this.chartMargin.left + this.barWidth / 2}, ${this.chartMargin.top})`)
        .selectAll('text.diff')
        .data(eachBird.values)
        .enter()
        .append('text')
        .attr('class', 'diff')
        .attr('x', d => this.XAxis(d.year) + this.barWidth / 2)
        .attr('y', d => this.YAxis(+d.population) - 10) // shift the text up by 10 pixels
        .attr('fill', d => d.type === 'decreasing' ? '#FF5858' : '#19BA7F')
        .attr('text-anchor', 'middle')
        .text(d => d.diff);
      
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
}
</script>

<style lang="scss" scoped>
.wrapper__story {
  background-color: #F6F6EE;
}

.legend__line {
  width: 80%;
  height: 3px;
  display: inline-block;
  position: relative;
  margin-right: 8px;
  background: red;
  margin: 0 auto;
}

.mosque-name {
  height: 80px;
}
</style>
