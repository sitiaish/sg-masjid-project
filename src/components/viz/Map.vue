<template>
  <section>
  <button id="toggle-view" name="toggle-view" @click="toggleViews">Toggle View</button>    
  <div id="map" class="map">
    <!-- <Popup /> -->
  </div>
  </section>
</template>

<script>
import _Mapbox from '@/plugins/mapbox';
import * as d3 from 'd3';
import mapboxgl from "mapbox-gl";

export default {
  name: 'Map',
  data() {
    return {
      map: null,  
      view: 'map'
    };
  },
  computed: {
    defaultOptions() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return {
          container: 'map',
          style: 'mapbox://styles/mapbox/light-v10',
          center: [1103.822328, 1.357592],
          zoom: 2.8,          
        };
      }
      return {
        container: 'map',
        style: 'mapbox://styles/sitiaish/ckor7py26a9gi17p9oxgdokf7',
        center: [103.822328, 1.374592],
        zoom: 11,
        bearing: 5.50,
      };
    },
  },
  async mounted() {
    // // listen to window size
    // window.addEventListener('load', () => {
    //   let vh = window.innerHeight * 0.01;
    //   document.getElementById('map').style.setProperty('--vh', `${vh}px`);
    // }); 

    // init Mapbox
    this.map = _Mapbox.createMap(this.defaultOptions);

    // basic map interaction setting 
    this.map.addControl(
      _Mapbox.createControl({showCompass: false}), 
      this.$vuetify.breakpoint.smAndDown ? 'top-right' : 'bottom-left');

    this.map.touchZoomRotate.disableRotation();
    this.map.touchPitch.disable();

    var canvas = this.map.getCanvasContainer();
    this.svg = d3.select(canvas).append('svg').attr('id', 'map');    

    this.map.on('load', () => {
      // this.addMrtLinesLayer();
      // this.addPointsLayer();   
      this.addPoints();
    })
  },
  methods: {  
    async addPoints(){
      this.data = await d3.json("data/masjid.json")
      // console.log(this.data)
      this.drawData(this.data)
    },
    addPointsLayer() {
      this.map.addSource('points', {
        type: 'geojson',
        data: `data/masjid.json`,
      });     
      this.map.addLayer({
        id: 'project',
        type: 'circle',
        source: 'points',
        paint: {
          'circle-radius': [
            'interpolate', 
            ['linear'], ['zoom'], 
            1, 8,
            5, 10, 
            10, 10, 
            15, 10, 
          ],              
          'circle-stroke-color': 'white',
          'circle-stroke-width': 1,
          'circle-color': [
            'match',
            ['get', 'Cluster'],
            "Asian Graduate Forum", 
            '#EEE5A0',
            "Asian Migration", 
            '#E6CC84',
            "Asian Urbanisms", 
            '#EBA775',
            "Changing Family in Asia", 
            '#EB7870',
            "Cultural Studies in Asia", 
            '#DE7D94',
            "Identities", 
            '#9973B0',
            "Inter-Asian Engagements",
            '#8A80C6',
            "Joint Events", 
            '#9FACDB',
            "Religion & Globalisation", 
            '#8799DE',
            "Science, Technology & Society",
            '#DB9FD5',
            '#DB9FD5',
          ]          
        },
        layout: {
          'visibility': 'visible'
        }
      });
    },
    addMrtLinesLayer() {
      this.map.addSource('mrtlines', {
        type: 'geojson',
        data: `data/mrtlines.json`,
      });         
      this.map.addLayer({
        id: 'mrtlines',
        type: 'line',
        source: 'mrtlines',
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
        },        
        paint: {
          'line-opacity': 0.7,
          'line-width': 2,
          'line-color': [
            'match',
            ['get', 'category'],
            "Asian Graduate Forum", 
            '#EEE5A0',
            "Asian Migration", 
            '#E6CC84',
            "Asian Urbanisms", 
            '#EBA775',
            "Changing Family in Asia", 
            '#EB7870',
            "Cultural Studies in Asia", 
            '#DE7D94',
            "Identities", 
            '#9973B0',
            "Inter-Asian Engagements",
            '#8A80C6',
            "Joint Events", 
            '#9FACDB',
            "Religion & Globalisation", 
            '#8799DE',
            "Science, Technology & Society",
            '#DB9FD5',
            'red',
          ]
        },
      });
    },
    drawData(data) {
      this.svg
        .selectAll('circle.mosques')
        .data(data.features).enter()
        .append("circle")
        .attr('class', 'mosques')
        .attr("r", 16);

        // console.log('hello')

      // Call the this.update function
      this.update();

      // this.update on map interaction
      
      this.map.on("viewreset", () => { this.update(0); });
      this.map.on("move", () => { this.update(0); });
      // this.map.on("moveend", function() { update(0); });
    },  
    update(transitionTime) {
      // Default value = 0
      transitionTime = (typeof transitionTime !== 'undefined') ? transitionTime : 0;

      const map = this.map;

      function project(d) {
        return map.project(new mapboxgl.LngLat(+d[0], +d[1]));
      }

      // Map view
      if (this.view === "map") {
        this.svg
          .selectAll('circle.mosques')
          .transition()
          .duration(transitionTime)
          .attr("cx", function(d) { return project(d.geometry.coordinates).x })
          .attr("cy", function(d) { return project(d.geometry.coordinates).y });
        d3.selectAll('circle.mosques')
          .on('click', function(event, d) {console.log(d)})

      } else if (this.view === "grid") {
        var ix = 0,
            iy = 0,
            rows = 8,
            cols = 10;

        // Check window with and height
        var windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
            windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        var gridItemWidth = (windowWidth*0.65)/(cols+1);
        var gridItemHeight = (windowHeight - 80)/(rows+1);

            this.svg.selectAll("circle.mosques").each(function() {

                var circle = d3.select(this);

                // console.log("ix: " + ix + ", iy: " + iy);

                circle
                    .transition()
                    .duration(transitionTime)
                        .attr("cx", () => {
                            return (windowWidth*0.2) + (ix *gridItemWidth) + (0.5*gridItemWidth);
                        })
                        .attr("cy", function() {
                            return (iy*gridItemHeight) + gridItemHeight;
                        });
                circle.on('click', function(event, d) {console.log(d)})


                // Increase iterators
                ix++;
                if (ix === cols) { ix = 0; iy++; }
                if (iy === rows) { iy = 1; }
            });
        }
    },
    showMap() {
      this.setMapOpacity(1);
      // Enable map interaction
      this.map.doubleClickZoom.enable();
      this.map.scrollZoom.enable();
      this.map.dragPan.enable();
    },
    hideMap() {
      this.setMapOpacity(0.05);
      // Disable map interaction
      this.map.doubleClickZoom.disable();
      this.map.scrollZoom.disable();
      this.map.dragPan.disable();
    },
    setMapOpacity(value) {
      d3.selectAll(".mapboxgl-canvas")
        .transition()
        .duration(500)
        .style("opacity", value);

      d3.selectAll(".mapboxgl-control-container")
        .transition()
        .duration(500)
        .style("opacity", value);
    },
    toggleViews() {
      if (this.view == "map") {
          this.view = "grid";
          this.hideMap();
      } else if (this.view == "grid") {
          this.view = "map";
          this.showMap();
      }
      this.update(900);
    },
  },
};
</script>

<style lang="scss">
@import '~mapbox-gl/dist/mapbox-gl.css';

#map {
  width: 100%;
  // height: calc(var(--vh, 1vh) * 100);
  height: calc(100vh - 72px);
  position: relative;
  
  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    height: calc(var(--vh, 1vh) * 100);

    ::v-deep .mapboxgl-ctrl-group {
      margin-top: 80px;
    }
  }

  // linear-gradient(#0e4e79,#44a5eb);

  &:after {
    content: '';
    // background: linear-gradient(180deg, #fff 0,rgba(255,255,255,0) 170px);
    // background-blend-mode: overlay;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
  }      
}



// ::v-deep .custom-tooltip {
//   .mapboxgl-popup-content {
//     border-radius: 3px;
//     padding: 16px;
//     background-color: rgba(233, 226, 218, 0.9);
//     box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
//     border: 2px solid #6d58ad;  
//   }
//   .mapboxgl-popup-tip {
//     display: none !important;
//   }
// }

#toggle-view {
  position: fixed;
  left: 0px;
  top: 50%;
  margin-top: -50px;
  z-index: 9;

  border: none;
  appearance: none;
  cursor: pointer;

  display: block;
  width: 100px;
  height: 100px;
  outline: none;
  /*border-radius: 50%;*/

  font: 18px/1.3 Arial;
  font-weight: bold;
  background-color: #33839c;
  color: white;

  transition: 0.5s all;
}

#toggle-view:hover {
  background-color: #3b9bb9;
}

circle {
    fill: #e55e5e;
    stroke: #e55e5e;
    stroke-width: 0;
    cursor: pointer;
    transition: 0.5s fill, 0.5s stroke-width;
}
circle:hover {
  fill: #5e5ee5;
  stroke-width: 18;
}

svg {
  position: absolute;
  width: 100%;
  height: 100%;
}

</style>


  