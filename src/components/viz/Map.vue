<template>
  <div id="map" class="map">
    <!-- <Popup /> -->
  </div>
</template>

<script>
import _Mapbox from '@/plugins/mapbox';

export default {
  name: 'Map',
  data() {
    return {
      map: null,  
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
  mounted() {
    // listen to window size
    window.addEventListener('load', () => {
      let vh = window.innerHeight * 0.01;
      document.getElementById('map').style.setProperty('--vh', `${vh}px`);
    }); 

    // init Mapbox
    this.map = _Mapbox.createMap(this.defaultOptions);

    // basic map interaction setting 
    this.map.addControl(
      _Mapbox.createControl({showCompass: false}), 
      this.$vuetify.breakpoint.smAndDown ? 'top-right' : 'bottom-left');

    this.map.touchZoomRotate.disableRotation();
    this.map.touchPitch.disable();

    this.map.on('load', () => {
      this.addMrtLinesLayer();
      this.addPointsLayer();
    })
  },
  methods: {  
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
    } 
  },
};
</script>

<style lang="scss" scoped>
@import '~mapbox-gl/dist/mapbox-gl.css';

#map {
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
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
    background: linear-gradient(180deg, #fff 0,rgba(255,255,255,0) 170px);
    background-blend-mode: overlay;
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
</style>


  