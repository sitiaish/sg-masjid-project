<template>
<div class="viz-mosque-type mb-16">
  <v-container inner class="mb-4">
    <div class="mb-3">
      <p class="text--body-3 font-weight-bold font-secondary">Mosques in Singapore arranged by year established</p>
    </div>

    <div class="selection-pills mb-3">
      <p class="text--caption mb-0">Show mosques named after:</p>
      <v-chip-group>
        <v-chip
          v-for="(n, i) in options"
          :key="i + '-mosque-types'"
          class="ma-2 text--caption"
          @click="filterOpacity(n.item)"
        >
          {{ n.label }}
        </v-chip>
      </v-chip-group>
      <span class="text--caption ml-6" @click="filterOpacity('reset')">Reset</span>
    </div>

    <div class="legend-mosque-type">
      <!-- <p class="text--caption mb-2">Mosques by landuse type:</p> -->
      <div 
        v-for="(j, i) in legendTypes"
        :key="i + '-legend'">
        <span class="dot-legend" :style="{ backgroundColor: j.style}" />
        <span class="text--caption mr-3">{{ j.label}}</span>
      </div>
    </div>
  </v-container>

  <v-container>
    <div class="chartwrapper-mosque-types">
      <svg id="svg-mosque-types" />
      <div class="tooltip-wrapper"/>
    </div>
  </v-container>
</div>
</template>

<script>
import * as d3 from 'd3';
import rough from 'roughjs/bundled/rough.esm.js';
import _kebabCase from 'lodash.kebabcase';

export default {
  name: 'VizMosqueTypes',
  data() {
    return {
      data: null,
      options: [
        { label :'People', item: 'name' },
        { label :'Arabic virtues', item: 'arabic' },
        { label :'Places', item: 'place' },
      ],
      legendTypes: [
        { label :'Wakaf', style: '#E760A6' },
        { label :'Temporary Occupation License', style: '#55414A' },
        { label :'Mosque Building Mendaki Fund', style: '#477AD7' }, 
        { label :'Leasehold', style: '#007064' },        
      ],
    };
  },
  computed: {
    height() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return 350;
      }
      return window.innerHeight * 0.7;
    },
    width() {
      const width = d3.select('.chartwrapper-mosque-types').node().getBoundingClientRect().width
        return width;
    },
    chartMargin() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return { top: 30, right: 10, bottom: 10, left: 10 };
      }
      return { top: 50, right: 10, bottom: 10, left: 50 };
    },    
    chartSettings() {
      return {
        innerWidth: this.width,
        innerHeight: this.height - this.chartMargin.top - this.chartMargin.bottom,
      };
    },
  },  
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.data = await d3.csv('data/data.csv');
      this.$nextTick(() => {
        this.initChart();
        this.drawBeeswarm(this.data);
      });           
    },
    initChart() {
      const chartSVG = d3.select('#svg-mosque-types');
      // draw base
      chartSVG
        .attr('width', this.width)
        .attr('height', this.height)
        // .style('border', '1px solid black')
        .call(this.responsivefy)
        .append('g')
        .attr('class', 'chartarea-type').attr('transform', `translate(50, ${this.chartMargin.top})`)
    }, 
    colorByLanduse() {
      // const LanduseColor = {
      //   Wakaf: '#2E8190', 
      //   TOL: '#D2BFDA',
      //   MBMF: '#A1A9CC',
      //   Leasehold: '#6896B4',
      //   Others: '#F8D9E6'
      // }
      // d3.selectAll('circle.mosque-type')
      //   .attr('fill', d => LanduseColor[d.type]);

      const svg = d3.select('#svg-mosque-type');
      svg.selectAll('circle.mosque-type').attr('fill', '#ffffff');      
    },    
    drawBeeswarm(data) {
      const width = this.chartSettings.innerWidth - 100;
      const height = this.chartSettings.innerHeight;
      const xScale = d3.scaleLinear().domain([1819.5, 2020.5]).range([0, width]);
      const selectChart = d3.select('#svg-mosque-types').select('g.chartarea-type');

      selectChart
        .append('g').attr('class', 'XAxis')
        .attr('transform', `translate(0, ${height - 50})`)
        .call(
          d3
            .axisBottom(xScale)
            .tickFormat(d3.format('d'))
            .tickSize(5)
            .tickSizeOuter(0)
        );
      d3.selectAll('.XAxis > .tick line').attr('transform', 'translate(0, -5)');

     const circles = selectChart
        .selectAll('circle.mosque-type')
        .data(data).enter()
        .append('circle')
        .attr('class', 'mosque-type')
        .attr('cx', this.width / 2 )
        .attr('cy', this.height / 2)
        .attr('fill', '#ffffff')
        .attr('stroke', 'black')          
        .attr('r', 20);

      circles
      .on('mouseenter.tooltip', function mouseenter(event, d) {
          d3
          .select(this)
          .attr('stroke', '#2e2e2e')
          .attr('stroke-width', 3)
          .attr('opacity', 1);

        const selectedBubble = d3.select(this).node().getBoundingClientRect();
        
        const container = d3.select('.chartwrapper-mosque-types').node().getBoundingClientRect();

        const tooltip = d3.select('.tooltip-wrapper').node().getBoundingClientRect();

        const posLeft =
          selectedBubble.left > document.body.clientWidth / 2
            ? selectedBubble.left - container.left - tooltip.width // right
            : selectedBubble.right - container.left; // left

        const posBottom =
          selectedBubble.top - container.top > container.height / 2
            ? selectedBubble.bottom - container.top - tooltip.height // bottom
            : selectedBubble.top - container.top; // top

        d3.select('.tooltip-wrapper')
          .style('top', `${posBottom}px`)
          .style('left', `${posLeft}px`)
          .style('visibility', 'visible')
          .html(`
            <p class="text--body-3 font-tertiary mb-0 font-weight-bold">${d.name}</p>
            <p class="text--caption mb-0">Land type: ${d.type}</p>
            <p class="text--caption mb-0">Established in: ${d.year_built}</p>          
          `);
      })
      .on('mouseleave.design', function mouseleave() {
        const svg = d3.select('#svg-mosque-types');
        svg
          .selectAll('circle.mosque-type').attr('opacity', 0);

        setTimeout(function(){ 
          d3.select('.tooltip-wrapper').style('visibility', 'hidden');
        }, 5000);
      });

      d3.forceSimulation()
        .force('x', d3.forceX(d => xScale(d.year_built)).strength(1.2))
        .force('y', d3.forceY((d, i) => this.chartSettings.innerHeight / 2.5 + 2 * (i % 2) * 10).strength(0.1))
        .force('collision', d3.forceCollide().radius(25))
        .nodes(data)
        .alpha(0.7)
        .on('tick', function updateNodes() {
          d3.selectAll('circle.mosque-type')
            .transition()
            .duration(20)      
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);
        })
        .on("end", function (){
          const rc = rough.svg(d3.select('#svg-mosque-types').node())
          // circle to rough circle
          const allCircles = d3.selectAll('circle.mosque-type')
          allCircles.each(function() {
            const aCircle = d3.select(this);
            const container = d3.select(this.parentNode);
            const type = aCircle.data()[0].type;
            const namedAfter = aCircle.data()[0].named_after;

            function fillColor(type) {
              const LanduseColor = {
                Wakaf: '#E760A6', 
                TOL: '#55414A',
                MBMF: '#477AD7',
                Leasehold: '#007064',
                // Others: '#F8D9E6'
              }           
              return LanduseColor[type]
            }

            let options = { fill: fillColor(type), fillWeight: 1, fillStyle: 'cross-hatch', roughness: 1 };

            const rCircle = rc.circle(
              +aCircle.attr("cx"), 
              +aCircle.attr("cy"), 
              +aCircle.attr("r")*2,
              options);
            container
              .node()
              .appendChild(rCircle)
              .classList.add('mosque-sketch', namedAfter);

            // d3.selectAll('g.test')
            //   .on('mouseover', function something() {
            //     d3.select(this).attr('r', '10')
            //   })
            aCircle.attr('opacity', '0');
          })                          
        });
    },  
    filterOpacity(selected, ) {
      const svg = d3.select('#svg-mosque-types');

      if (selected === 'reset') {
        svg.selectAll('.mosque-sketch').attr('opacity', '1');
        d3.selectAll('.v-chip--active').classed('v-chip--active', false);

      } else {
        svg.selectAll('.mosque-sketch').attr('opacity', '0.1');
        svg.selectAll(`.${selected}`).attr('opacity', '1');
      }
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
.chartwrapper-mosque-types {
  position: relative;
}

.tooltip-wrapper {
  // border: 1px solid #3e3e3e;
  background: #f5f5f5;
  position: absolute;
  visibility: hidden;
  min-width: 120px;
  max-width: 250px;
  padding: 8px;
  pointer-events: none;
}

.dot-legend {
  height: 15px;
  width: 15px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 6px;
  vertical-align: middle;
  border: 2px solid #3e3e3e;
}

.viz-mosque-type {
  position: relative;
}

.legend-mosque-type {
  top: 36px;
  left: 48px;
  display: inline-block;

  div {
    display: inline-block;
  }
}

.v-chip .v-chip--clickable .v-chip--no-color .v-chip--outlined .theme--light {
  border-color: red !important;
}

.v-chip--active {
  background-color:#bababa !important;
}

.selection-pills {
  p {
    display: inline-block;
    vertical-align: middle;
  }
  .v-chip-group {
    display: inline-block;
    vertical-align: middle;
  }
}
</style>

<style lang="scss">
#svg-mosque-types {
  text {
    font-family: 'Inconsolata', monospace;
    font-size: 0.9rem;
  }
}

</style>


  