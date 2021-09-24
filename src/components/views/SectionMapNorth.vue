<template>
  <div class="map-cluster">
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12" md="4" offset-md="1" order-md="2">
        <div class="my-10">
          <p class="text--h4 mb-0">North side</p>
          <p class="text--body-2">16 mosques</p>

          <p class="text--body-3">
            NISA WRITE
          </p>
        </div>

        <div class="map-tooltip-wrapper hidden-sm-and-down">
          The {{ northItem.location }} planning area. The 2015 Census recorded {{ northItem.muslimPop }} thousand Muslims here. There are 
          {{ northItem.mosqueCount }}. 
          
          {{ northItem.mosqueList }}

        </div>  
      </v-col>  
      <v-col  cols="12" md="5" order-md="1">
        <VizMapSgNorth @update-north-desc="updateNorthDesc" />
      </v-col>            
    </v-row>
    <!-- <MapLegendCluster class="map-legend-wrapper-north"/>            -->
  </div>
</template>

<script>
import VizMapSgNorth from '@/components/viz/VizMapSgNorth';
// import MapLegendCluster from '@/components/viz/MapLegendCluster';

export default {
  name: 'SectionMapNorth',
  components: {
    VizMapSgNorth,
    // MapLegendCluster
  },
  data() {
    return {
      northItem: [
        { location: '' }, 
        { pop: '' },
        { mosqueCount: '' },
        { mosqueList: '' }
      ]
    }
  },
  methods: {
    updateNorthDesc(e) {
      this.northItem = e;
      this.northItem.mosqueCount = this.northItem.mosque ? this.northItem.mosque.length : 0;
      this.northItem.mosqueList = this.northItem.mosque.join(', ')
    }
  }
};
</script>
