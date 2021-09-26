<template>
  <div class="wrapper__map-sg-east">
    <svg id="map-sg-east" />
  </div>
</template>

<script>
import * as d3 from 'd3';
import _kebabCase from 'lodash.kebabcase';
import rough from 'roughjs/bundled/rough.esm.js';

export default {
  name: 'VizScrollyChart',
  data() {
    return {
      data: null,
      map: null,
      item: null,
    };
  },
  computed: {
    height() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return 380;
      } else if (this.$vuetify.breakpoint.xlOnly) {
        return window.innerHeight * 0.6;
      }
      return window.innerHeight * 0.9;
    },
    circleRadius() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return this.height / 20;
      }      
      return this.height / 27
    },
    width() {
      const width = d3.select('.wrapper__map-sg-east').node().getBoundingClientRect().width
        return width;
    },
  },  
  mounted() {
    this.parseData();
  },
  methods: {
    async parseData() {
      this.data = await d3.csv('data/data.csv'); 
      this.map = await d3.json('data/sg.json');
      this.$nextTick(() => {
        this.initChart();
        this.drawMapBySelection('East')        
      });           
    },
    initChart() {
      const chartSVG = d3.select('#map-sg-east');
      // draw base
      chartSVG
        .attr('width', this.width)
        .attr('height', this.height)
        // .style('border', '1px solid #444444')
        .call(this.responsivefy);
    },
    // step 4.1-4    
    drawMapBySelection(selectedCluster) {
      // draw new map
      this.map.features.forEach(d => {
        d.properties.area = this.kebabCase(d.properties.PLN_AREA_N);
      })

      const selectedMap = {
        "type":"FeatureCollection",
        "features": this.map.features.filter(d => d.properties['CLUSTER'] === selectedCluster)
      };

      const projection = d3.geoMercator().fitSize([this.width,this.height], selectedMap);
      const geoPath = d3.geoPath(projection);

      const colorScale = d3.scaleThreshold()
        .domain([0, 5, 15, 40, 60])
        .range(['#e3e3e3', '#f8d9e6', '#C5A8B4', '#957985', '#3C2530']);

      var rc = rough.svg(document.getElementById('map-sg-east'));

      const svg = d3.select('#map-sg-east');
      svg
        .append('g')
        .attr('class', 'map')
        .lower();  

      svg.select('g.map')
        .selectAll('.towns')
        .data(selectedMap.features).enter()
        .append('g')
        .attr('class', d => `towns ${d.properties.PLN_AREA_N}`);

      svg.select('g.map').selectAll('.towns').each(function(d) {
        d3.select(this)
          .node()
          .appendChild(
            rc.path(geoPath(d), {
              fill: d.properties.MUSLIMS === 0 ?  '#ECECEC' : colorScale(d.properties.MUSLIMS),
              fillStyle: d.properties.MUSLIMS === 0 ? 'hachure' : 'cross-hatch',
              roughness: 2,
              simplification: 0.8,
              stroke: '#444444',
              fillWeight: d.properties.MUSLIMS === 0 ? 1.5 : 2
            })
          ).classList.add('town-sketch');
      });

      // different style for non-mainland 
      svg.selectAll('.western-islands')
        .selectAll('g.town-sketch')
        .selectAll('path')
        .attr('stroke', '#ECECEC')
        .attr('stroke-width', 1);      

      const self = this;

      svg
        .select('g.map')
        .selectAll('.towns')
        .on('mouseenter.tooltip', function mouseenter(event, d) { 
          d3.select(this).selectAll('path:not(:nth-child(1))').attr('stroke', '#F9F871').attr('stroke-width', 3);
  
          self.item = {
            location: d.properties.area,
            muslimPop: d.properties.MUSLIMS,
            mosque: d.properties.MOSQUE ? d.properties.MOSQUE : 0,
          };

          self.$emit('update-east-desc', self.item);      
        })
       .on('mouseleave.tooltip', function mouseeleave() { 
          d3.select('#map-sg-east').selectAll('g.town-sketch').selectAll('path:not(:nth-child(1))').attr('stroke', '#444444').attr('stroke-width', 1);

          self.item = {
            location: 'init',
            muslimPop: '',
            mosque: '',
          };

          self.$emit('update-west-desc', self.item);              
          // d3.selectAll('.western-islands').selectAll('g.town-sketch').selectAll('path').attr('stroke', '#ECECEC').attr('stroke-width', 1);
        });
              
      // draw filtered mosques
      svg.select('g.map')
        .selectAll('circle.mosques-section')      
        .data(this.data.filter(d => d.cluster === selectedCluster)).enter()
        .append('circle').attr('class', 'mosques-section')
        .attr('cx', function(d){ return projection([d.long, d.lat])[0] })
        .attr('cy', function(d){ return projection([d.long, d.lat])[1] })
        .attr('name', d => d.name)
        .attr('r', this.circleRadius / 3.5)
        .style('stroke', '#3C2530')
        .style('fill', '#FFD9A3');

      // svg.select('g.map')
      //   .selectAll('text.mosques-section')      
      //   .data(this.data.filter(d => d.cluster === selectedCluster)).enter()
      //   .append('text').attr('class', 'mosques-section')
      //   .attr('x', function(d){ return projection([d.long, d.lat])[0] })
      //   .attr('y', function(d){ return projection([d.long, d.lat])[1] })
      //   .attr('name', d => d.name)
      //   .text(d => d.name)
        // .attr('r', this.circleRadius / 4)
        // .style('fill', '#444444')
        // .attr('fill-opacity', (d => d.cluster === selectedCluster ? 1 : 0);

      
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

<style lang="scss">
.wrapper__map-sg-east {
  // border: 2px solid red;
  position: relative;
}

path.area {
  stroke-width: 0.3;
  fill: #dedede;
  stroke: white;
}

.mapSection__controls {
  position: absolute;
  top: 0;
  left: 0;
}
</style>


  