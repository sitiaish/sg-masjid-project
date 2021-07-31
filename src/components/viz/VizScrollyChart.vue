<template>
<div>
  <div class="wrapper__scrolly-chart">
    <div class="mapSection__controls" v-show="step === '4'">
      <v-btn @click="drawMapBySelection('North')">North</v-btn>
      <v-btn @click="drawMapBySelection('South')">South</v-btn>
      <v-btn @click="drawMapBySelection('East')">East</v-btn>
      <v-btn @click="drawMapBySelection('West')">West</v-btn>
    </div>
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
        innerWidth: this.width,
        innerHeight: this.height - this.chartMargin.top - this.chartMargin.bottom,
      };
    },
  },  
  mounted() {
    this.parseData();
  },
  methods: {
    async parseData() {
      this.data = await d3.csv('data/data.csv'); 
      this.map = await d3.json('data/sg.json');
      this.comcare = await d3.csv('data/comcare.csv');
      this.$nextTick(() => {
        this.initChart(this.data);
        this.initMap(this.map, this.comcare)
        this.drawAllMosques();
      });           
    },
    initChart(data) {
      const chartSVG = d3.select('#scrolly-chart');
      // draw base
      chartSVG
        .attr('width', this.width)
        .attr('height', this.height)
        .style('border', '1px solid black')
        .call(this.responsivefy)
        .append('g')
        .attr('class', 'chartarea').attr('transform', `translate(0, ${this.chartMargin.top})`)
        .selectAll('circle.mosque')
        .data(data).enter()
        .append('circle').attr('class', 'mosque')
        .attr('cx', this.width / 2 )
        .attr('cy', this.height / 2)

      // draw pattern 
      chartSVG
        .append('g')
        .attr('class', 'patterns')
        .selectAll('defs')
        .data(data)
        .enter()
        .append('defs')
        .append('pattern')
        .attr('id', (d) => d.name)
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', '0 0 120 120')
        .append('image')
        .attr('href', d => `data/${d.name}.svg`)
        .attr('width', '120')
        .attr('height', '120')
        .attr('x', 0)
        .attr('y', 0);      
    },
    initMap(mapData) {
      const projection = d3.geoMercator().fitSize([this.chartSettings.innerWidth,this.chartSettings.innerHeight], mapData);
      const geoPath = d3.geoPath(projection);

      // const clusterColors = {
      //   EAST: 'pink',
      //   NORTH: 'red',
      //   SOUTH: 'blue',
      //   WEST: 'green'
      // };

      d3.select('g.chartarea').append('g').attr('class', 'map').lower();

      d3.select('g.map')
        .selectAll('path')
        .data(mapData.features).enter()
        .append('path')
        .attr('d', geoPath)
        .style('fill', 'white')
        .attr('stroke', 'grey')
        .attr('stroke-width', 0.3)
        
      d3.select('g.map').attr('opacity', 0);
        
    },    
    // step 1
    drawAllMosques() {
      const chartarea = d3.select('g.chartarea');

      chartarea.selectAll('circle.mosque')
        .transition('allMosqueEnter')
        .duration(1000)        
        .attr('cx',  (d, i) => 50 + i % 11 * 75)
        .attr('cy', (d, i) => 20 + Math.floor(i / 11) * 75)
        .attr('r', 18)
        // .style('fill', d => `url(#${d.name})`);
        .attr('fill', '#c6c6c6');
    },
    // step 2
    drawByCluster(data) {
      const clusterSettings = {
        North: { x: 0, y: 0, count: 0 },
        South: { x: 0, y: this.chartSettings.innerHeight / 2, count: 0 },
        East: { x: this.chartSettings.innerWidth / 2, y: 0, count: 0 },
        West: { x: this.chartSettings.innerWidth / 2, y: this.chartSettings.innerHeight / 2, count: 0 },
      }

      const clusterCoord = this.getCoordinates(data, clusterSettings, 'cluster');

      d3.selectAll('circle.mosque')
        .transition('clusterMosqueEnter')
        .duration(1000)
        .attr('cx', (d, i) => clusterCoord[i].x + 15)
        .attr('cy', (d, i) => clusterCoord[i].y + 40)
        .attr('r', 15)
        .style('fill', '#c6c6c6')

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
    // step 3
    drawMosqueMap(mapData) {
      const projection = d3.geoMercator().fitSize([this.chartSettings.innerWidth,this.chartSettings.innerHeight], mapData);

      d3.selectAll('circle.mosque')
        .transition('mapMosqueEnter').duration(1500)
        .attr('cx', function(d){ return projection([d.long, d.lat])[0] })
        .attr('cy', function(d){ return projection([d.long, d.lat])[1] })
        .attr('name', d => d.name)
        .attr('r', 10)
        // .attr('transform', 'translate(5, 5)')
        .style('fill', 'red')
        .attr('stroke', '#69b3a2')
        .attr('stroke-width', 0.3)
        .attr('fill-opacity', .8);

      d3.select('g.map').transition('mapMosqueFade').duration(500).attr('opacity', 1);

    },
    // step 4
    drawComcareMap(mapData, comcare) {
      const projection = d3.geoMercator().fitSize([this.chartSettings.innerWidth,this.chartSettings.innerHeight], mapData);
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
      d3.selectAll('g.map, circle.mosque').attr('opacity', 0);
      d3.selectAll('g.map-section').remove();

      // draw new map
      const selectedMap = {
        "type":"FeatureCollection",
        "features": this.map.features.filter(d => d.properties['CLUSTER'] === selectedCluster)
      };

      const projection = d3.geoMercator().fitSize([this.chartSettings.innerWidth,this.chartSettings.innerHeight], selectedMap);
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

      // // draw filtered mosque
      d3.select('g.map-section')
        .selectAll('circle.mosque-section')      
        .data(this.data).enter()
        .append('circle').attr('class', 'mosque-section')
        .attr('cx', function(d){ return projection([d.long, d.lat])[0] })
        .attr('cy', function(d){ return projection([d.long, d.lat])[1] })
        .attr('name', d => d.name)
        .attr('r', 15)
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
    drawBeeswarm(data) {

      d3.selectAll('text.landuse-name').remove();


      const width = this.chartSettings.innerWidth - 100;
      const height = this.chartSettings.innerHeight;

      const xScale = d3.scaleLinear().domain([1819.5, 2020.5]).range([0, width]);      
      d3.select('g.chartarea')
        .append('g').attr('class', 'XAxis')
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
        .selectAll('circle.data')
        .attr('class', d => `data ${d.name}`)
        .attr('r', 15)
        // .attr('fill', 'pink');

      d3.forceSimulation()
        .force('x', d3.forceX(d => xScale(d.year_built)).strength(1.2))
        .force('y', d3.forceY((d, i) => this.chartSettings.innerHeight / 2.5 + 2 * (i % 2) * 10).strength(0.1))
        .force('collision', d3.forceCollide().radius(18))
        .nodes(data)
        .alpha(0.5)
        .on('tick', function updateNodes() {
          d3.selectAll('circle.data')
            .transition()
            .duration(80)      
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);   
        });
    },
    getCoordinates(data, coordInit, groupBy) {
      const coordinates = 
      data.map(d => {
        const i = coordInit[d[groupBy]].count
        let start = 
          { x: coordInit[d[groupBy]].x, y: coordInit[d[groupBy]].y }
        start.x += 45 * (i % 6)
        start.y += 45 * Math.floor(i / 6)

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
            this.drawAllMosques();
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
            d3.selectAll('g.map, circle.mosque').transition('fadein').duration(350).attr('opacity', 1);
          } else {
            d3.selectAll('g.text-group').remove();
            this.drawMosqueMap(this.map);
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
.wrapper__scrolly-chart {
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


  