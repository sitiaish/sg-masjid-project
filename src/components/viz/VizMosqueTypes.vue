<template>
<div>
Named after 
<v-select
  v-model='selectedNaming'
  :items='options'
  item-value='item'
  item-text='label'
/>

{{ selectedNaming}}
<div class="chart-wrapper--mosque-types">
  <svg id="svg--mosque-types" />
  <div class="tooltip-wrapper"/>
</div>
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
      selectedNaming: '',
      options: [
        { label :'the benefactors/people', item: 'adil_prog' },
        { label :'Arabic virtues', item: 'alive_prog' },
        { label :'places', item: 'barrier-free' },
      ],
      names:[
        {id: 1, name: 'Paul', age: 23},
        {id: 2, name: 'Marcelo', age: 15},
        {id: 3, name: 'Any', age: 30},
      ]      
    };
  },
  watch: {
    selectedNaming(newVal) {
      d3.selectAll('circle.mosque').attr('fill', 'none');

      d3.selectAll('circle.mosque')
        .attr('fill', d => d[newVal] ===  'Yes' ? 'purple' : 'yellow').attr('opacity', 1);
    }
  },
  computed: {
    height() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return 350;
      }
      return window.innerHeight * 0.7;
    },
    width() {
      const width = d3.select('.chart-wrapper--mosque-types').node().getBoundingClientRect().width
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
    this.loadData();
  },
  methods: {
    async loadData() {
      this.data = await d3.csv('/data/data.csv');
      this.$nextTick(() => {
        this.initChart();
        this.drawBeeswarm(this.data);
      });           
    },
    initChart() {
      const chartSVG = d3.select('#svg--mosque-types');
      // draw base
      chartSVG
        .attr('width', this.width)
        .attr('height', this.height)
        .style('border', '1px solid black')
        .call(this.responsivefy)
        .append('g')
        .attr('class', 'chartarea').attr('transform', `translate(50, ${this.chartMargin.top})`)
    }, 
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
    colorByLanduse() {
      const LanduseColor = {
        Wakaf: 'red', 
        TOL: 'yellow',
        MBMF: 'green',
        Leasehold: 'purple'
      }
      d3.selectAll('circle.mosque')
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
      const width = this.chartSettings.innerWidth - 100;
      const height = this.chartSettings.innerHeight;
      const xScale = d3.scaleLinear().domain([1819.5, 2020.5]).range([0, width]);
      const selectChart = d3.select('#svg--mosque-types').select('g.chartarea');

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
        .selectAll('circle.mosque')
        .data(data).enter()
        .append('circle')
        .attr('class', 'mosque')
        .attr('class', d => `mosque ${d.name}`)
        .attr('cx', this.width / 2 )
        .attr('cy', this.height / 2)
        .attr('r', 20);

      circles
      .on('mouseenter.tooltip', function mouseenter(event, d) {
        d3.select(this).attr('fill', 'red').transition().duration(100).attr('opacity', 1);

        const selectedBubble = d3.select(this).node().getBoundingClientRect();
        
        const container = d3.select('.chart-wrapper--mosque-types').node().getBoundingClientRect();

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
            <p class="text--caption mb-0">${d.name}</p>
            <p class="text--caption font-talic mb-0">${d.type}</p>
            <p class="text--caption mb-0">${d.year_built}</p>          
          `);
      })
      .on('mouseleave.design', function mouseleave() {
        // code for mouse leave
      });

      d3.forceSimulation()
        .force('x', d3.forceX(d => xScale(d.year_built)).strength(1.2))
        .force('y', d3.forceY((d, i) => this.chartSettings.innerHeight / 2.5 + 2 * (i % 2) * 10).strength(0.1))
        .force('collision', d3.forceCollide().radius(25))
        .nodes(data)
        .alpha(0.7)
        .on('tick', function updateNodes() {
          d3.selectAll('circle.mosque')
            .transition()
            .duration(20)      
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);
        })
        .on("end", function (){
          const rc = rough.svg(d3.select('svg').node())
          // circle to rough circle
          const allCircles = d3.selectAll('circle')
          allCircles.each(function() {
            const aCircle = d3.select(this);
            const container = d3.select(this.parentNode);
            const mosqueType = aCircle.data()[0].type

            function fillColor(mosqueType) {
              const LanduseColor = {
                Wakaf: 'red', 
                TOL: 'yellow',
                MBMF: 'green',
                Leasehold: 'purple'
              }           
              return LanduseColor[mosqueType]
            }

            let options = { fill: fillColor(mosqueType) , fillStyle: 'dashed', fillWeight: 3 };

            const rCircle = rc.circle(
              +aCircle.attr("cx"), 
              +aCircle.attr("cy"), 
              +aCircle.attr("r")*2,
              options);
            container.node().appendChild(rCircle)
            // .classList.add('test');

            // d3.selectAll('g.test')
            //   .on('mouseover', function something() {
            //     d3.select(this).attr('r', '10')
            //   })


            aCircle.attr('opacity', '0');
          })                          
        });


      this.colorByLanduse();  
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
.chart-wrapper--mosque-types {
  position: relative;
}

.tooltip-wrapper {
  border: 2px solid #3e3e3e;
  background:goldenrod;
  position: absolute;
  visibility: hidden;
  min-width: 120px;
  max-width: 250px;
  padding: 8px;
}
</style>


  