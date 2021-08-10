<template>
<div>
  <div class="wrapper__scrolly-chart-circle">
    <div class="mapSection__controls" v-show="step === '4'">
      <v-btn @click="drawMapBySelection('North')">North</v-btn>
      <v-btn @click="drawMapBySelection('South')">South</v-btn>
      <v-btn @click="drawMapBySelection('East')">East</v-btn>
      <v-btn @click="drawMapBySelection('West')">West</v-btn>
    </div>
    <svg id="scrolly-chart-circle" />
  </div>
</div>
</template>

<script>
import * as d3 from 'd3';
import _kebabCase from 'lodash.kebabcase';
import rough from 'roughjs/bundled/rough.esm.js';

export default {
  name: 'VizScrollyChart',
  props: {
    step: {
      type: String,
      required: true,
    },
    direction: {
      type: String,
      required: true,
    },
  },
  watch: {
    step(currentStep) {
      this.handleView(currentStep);
    },
  },
  data() {
    return {
      data: null,
      map: null,
      comcare: null,
    };
  },
  computed: {
    height() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return 350;
      }
      return window.innerHeight * 0.95;
    },
    circleRadius() {
      return this.height / 35
    },
    width() {
      const width = d3.select('.wrapper__scrolly-chart-circle').node().getBoundingClientRect().width
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
      // this.comcare = await d3.csv('data/comcare.csv');
      this.$nextTick(() => {
        this.initChart(this.data);
        this.initMap(this.map, this.comcare)
        this.drawAllmosques();
      });           
    },
    initChart(data) {
      const chartSVG = d3.select('#scrolly-chart-circle');
      // draw base
      chartSVG
        .attr('width', this.width)
        .attr('height', this.height)
        .style('border', '1px solid black')
        .call(this.responsivefy)
      
      chartSVG
        .append('g').attr('class', 'chartarea')
        .append('g').attr('class', 'circle-group')
        .selectAll('circle.mosques')
        .data(data).enter()
        .append('circle').attr('class', 'mosques')
        .attr('cx', this.width / 2 )
        .attr('cy', this.height / 2)
        .attr('r', this.circleRadius)      

      // const rc = rough.svg(d3.select('#scrolly-chart-circle').node());

      // const allCircles = d3.selectAll('circle.mosques');
      // allCircles.each(function() {
      //   const aCircle = d3.select(this);
      //   const container = d3.select(this.parentNode);
      //   let options = { fill: 'red', fillWeight: 1};

      //   const rCircle = rc.circle(
      //     +aCircle.attr("cx"), 
      //     +aCircle.attr("cy"), 
      //     +aCircle.attr("r")*2,
      //     options);
      //   container
      //     .node()
      //     .appendChild(rCircle)
      //     .classList.add('circles-mosques');

      //   aCircle.remove();

      //   // aCircle.attr('opacity', '0');
      // })                       
    },
    initMap(mapData) {
      const projection = d3.geoMercator().fitSize([this.width,this.height], mapData);
      const geoPath = d3.geoPath(projection);
      const colorScale = d3.scaleThreshold()
        .domain([0, 10, 20, 30, 70])
        .range(['#9E8E7A', '#F8D9E6', '#FFD3C3', '#FFD9A3', '#F9F871']);

      var rc = rough.svg(document.getElementById('scrolly-chart-circle'));

      const svg = d3.select('#scrolly-chart-circle');
      svg
        .append('g')
        .attr('class', 'map')
        .lower();  

      svg.select('g.map')
        .selectAll('.towns')
        .data(mapData.features).enter()
        .append('g')
        .attr('class', d => `towns ${d.properties.PLN_AREA_N}`);

      svg.select('g.map').selectAll('.towns').each(function(d) {
        d3.select(this)
          .node()
          .appendChild(
            rc.path(geoPath(d), {
              fill: d.properties.MUSLIMS === 0 ?  '#DCDCDC' : colorScale(d.properties.MUSLIMS),
              fillStyle: 'cross-hatch',
              roughness: d.properties.MUSLIMS === 0 ? 5 : 3,
              simplification: 1,
              fillWeight: d.properties.MUSLIMS === 0 ? 1 : 2
            })
          );
      });                
        
      svg.select('g.map').attr('opacity', 0);
    },    
    // step 1
    drawAllmosques() {
      const chartarea = d3.select('#scrolly-chart-circle').select('g.chartarea');
      chartarea
        .attr('transform', `translate(240, 160)`)
        .select('g.circle-group')
        .attr('transform', `translate(0, 0)`);           

      chartarea.selectAll('circle.mosques')
        .transition('enter1')
        .duration(1000)        
        .attr('cx',  (d, i) => i % 12 * (this.circleRadius * 3))
        .attr('cy', (d, i) => Math.floor(i / 12) * (this.circleRadius * 4))
        .attr('r', this.circleRadius)
        .attr('fill', '#c6c6c6');
    },
    // step 2
    drawByCluster(data) {
      const chartarea = d3.select('#scrolly-chart-circle').select('g.chartarea');
      chartarea
        .attr('transform', `translate(200, 100)`)
        .select('g.circle-group')
        .attr('transform', `translate(${this.circleRadius}, ${this.circleRadius * 2})`);       

      const clusterSettings = {
        North: { x: 0, y: 0, count: 0 },
        South: { x: 0, y: this.height / 2.45, count: 0 },
        East: { x: this.width / 2.5, y: 0, count: 0 },
        West: { x: this.width / 2.5, y: this.height / 2.45, count: 0 },
      }

      const clusterCoord = this.getCoordinates(data, clusterSettings, 'cluster');

      chartarea
        .selectAll('circle.mosques')
        .transition('enter2')
        .duration(1000)
        .attr('cx', (d, i) => clusterCoord[i].x)
        .attr('cy', (d, i) => clusterCoord[i].y)
        .attr('r', this.circleRadius)
        .style('fill', '#c6c6c6')

      const labelData = d3.group(data, d => d.cluster);

      const textgroup = chartarea
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
    // step 3
    drawmosquesMap(mapData) {
      const projection = d3.geoMercator().fitSize([this.width,this.height], mapData);

      d3.selectAll('circle.mosques')
        .attr('r', this.circleRadius)
        .transition('mapmosquesEnter').duration(500)
        .attr('r', this.circleRadius / 4)        
        .attr('cx', function(d){ return projection([d.long, d.lat])[0] })
        .attr('cy', function(d){ return projection([d.long, d.lat])[1] })
        .attr('name', d => d.name)
        .transition('enter4').duration(1000)
        .attr('r', this.circleRadius / 2)
        .attr('stroke', '#69b3a2')
        .attr('stroke-width', 0.3)
        .attr('fill-opacity', .8);
                  
      d3.select('#scrolly-chart-circle')
        .select('g.map')
        .transition('mapmosquesFade')
        .duration(200)
        .attr('opacity', 1); 

      const chartarea = d3.select('#scrolly-chart-circle').select('g.chartarea');
      chartarea   
        .attr('transform', `translate(0, 0)`)
        .select('g.circle-group')      
        .attr('transform', `translate(0, 0)`);            
    },
    // step 4
    drawComcareMap(mapData, comcare) {
      const projection = d3.geoMercator().fitSize([this.width,this.height], mapData);
      d3.select('g.map')
        .append('g').attr('class', 'comcare-group')
        .selectAll('circle.comcare')
        .data(comcare).enter()
        .append('circle').attr('class', 'comcare')
        .attr('cx', function(d){ return projection([d.long, d.lat])[0] })
        .attr('cy', function(d){ return projection([d.long, d.lat])[1] })
        .attr('r', 0)
        .transition('fadein')
        .duration(100)
        .attr('r', 3)
        .delay((d, i) => 100 * i)       
        .style('fill', 'black')
        .attr('stroke', '#69b3a2')
        .attr('stroke-width', 0.3)
        .attr('fill-opacity', .4);  
    },
    // step 4.1-4    
    drawMapBySelection(selectedCluster) {
      // clear map
      d3.selectAll('g.map, circle.mosques').attr('opacity', 0);
      d3.selectAll('g.map-section').remove();

      // draw new map
      const selectedMap = {
        "type":"FeatureCollection",
        "features": this.map.features.filter(d => d.properties['CLUSTER'] === selectedCluster)
      };

      const projection = d3.geoMercator().fitSize([this.width,this.height], selectedMap);
      const geoPath = d3.geoPath(projection);      

      d3.select('g.chartarea')
        .append('g').attr('class', 'map-section')
        .selectAll('path')
        .data(selectedMap.features).enter()
        .append('path')
        .attr('d', geoPath)
        .style('fill', 'white')
        .attr('stroke', 'black')
        .attr('stroke-width', 0.3);

      // draw filtered sso
      d3.select('g.map-section')
        .selectAll('circle.comcare-section')
        .data(this.comcare).enter()
        .append('circle').attr('class', 'comcare-section')
        .attr('cx', function(d){ return projection([d.long, d.lat])[0] })
        .attr('cy', function(d){ return projection([d.long, d.lat])[1] })
        .attr('r', 4)
        .attr('name', d => d.name)
        .attr('transform', 'translate(2, 2)')
        .style('fill', 'red')
        .attr('fill-opacity', d => d.cluster === selectedCluster ? .4 : 0);         

      // // draw filtered mosques
      d3.select('g.map-section')
        .selectAll('circle.mosques-section')      
        .data(this.data).enter()
        .append('circle').attr('class', 'mosques-section')
        .attr('cx', function(d){ return projection([d.long, d.lat])[0] })
        .attr('cy', function(d){ return projection([d.long, d.lat])[1] })
        .attr('name', d => d.name)
        .attr('r', this.circleRadius)
        // .attr('transform', 'translate(0, 10)')
        .style('fill', '#69b3a2')
        .attr('fill-opacity', d => d.cluster === selectedCluster ? .4 : 0);
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
        TOL: { x: 0, y: this.height / 2, count: 0, label: 'Temporary Occupation Licence' },
        MBMF: { x: this.width / 2, y: 0, count: 0, label: 'mosques Building & Mendaki Fund' },
        Leasehold: { x: this.width / 2, y: this.height / 2, count: 0, label: 'Leasehold' },
        Others: { x: 0, y: 4 * this.height / 5, count: 0, label: 'Other' },        
      }

      const landuseCoord = this.getCoordinates(data, LanduseSettings, 'type');

      d3.select('.chartarea')
        .selectAll('circle.data')
        .transition()
        .duration(1500) 
        .attr('cx', (d, i) => landuseCoord[i].x + 15)
        .attr('cy', (d, i) => landuseCoord[i].y + 20)
        .attr('r', 15);

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
    getCoordinates(data, coordInit, groupBy) {
      const radius = this.circleRadius;
      const coordinates = 
      data.map(d => {
        const i = coordInit[d[groupBy]].count
        let start = 
          { x: coordInit[d[groupBy]].x, y: coordInit[d[groupBy]].y }
        start.x += radius * 2.5 * (i % 6)
        start.y += radius * 2.6 * Math.floor(i / 6)

        coordInit[d[groupBy]].count += 1
        return start
      })
      return coordinates
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
    handleView(currentStep) {
      switch (currentStep) {
        case '1':
          if (this.direction === 'up') {
            d3.selectAll('g.text-group').remove();
            this.drawAllmosques();
          }
          break;

        case '2':
          if (this.direction === 'up') {
            d3.select('g.map').attr('opacity', 0);
            this.drawByCluster(this.data);
          } else {
            this.drawByCluster(this.data);
          }   
          break;

        case '3':
          if (this.direction === 'up') {
            d3.selectAll('circle.comcare, g.map-section').remove();
            d3.selectAll('g.map, circle.mosques').transition('fadein').duration(350).attr('opacity', 1);
          } else {
            d3.selectAll('g.text-group').remove();
            this.drawmosquesMap(this.map);
          }             
          break;

        case '4':
          if (this.direction === 'up') {
            d3.selectAll('circle.comcare').attr('r', 0);
            d3.selectAll('g.map-section').remove();            
          } else {
            this.drawComcareMap(this.map, this.comcare);
          }             
          break;          

        default:
          break;
      }
    },        
  },
};
</script>

<style lang="scss">
.wrapper__scrolly-chart-circle {
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


  