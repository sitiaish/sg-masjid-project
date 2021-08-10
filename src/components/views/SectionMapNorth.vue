<template>
  <div class="my-16 map-cluster">
    <v-row align="start" justify="center" no-gutters>
      <v-col cols="5">
        <VizMapSgNorth @update-north-desc="updateNorthDesc" />
      </v-col>
      <v-col cols="4" offset="1">
        <div class="my-10">
          <p class="text--h4 mb-0">North side</p>
          <p class="text--body-2">16 mosques</p>

          <p class="text--body-3">
            The mosques in the North cluster comprises of n MBMF mosques. One of the largest is Masjid Assyakirin which has been serving the people in Boon Lay, Taman Jurong and Jurong North since 1978. Until recently in 2019, Masjid Maarof was built in Jurong North to ease the <a href="https://www.straitstimes.com/singapore/maarof-mosque-in-jurong-north-to-be-completed-in-time-for-hari-raya-haji-in-september" target="_blank">overcrowding at Assyakirin</a>. 
          </p>

          <p class="text--body-3">
            The lone dot on the Northern Islands is Masjid Pulau Bukom that caters to the people working on the island.
          </p>
        </div>

        <div class="map-tooltip-wrapper">
          <!-- <p class="text--body-3 font-tertiary">
            Hover over the map areas to see the mosques in the North cluster.
          </p> -->

          The {{ northItem.location }} planning area. The 2015 Census recorded {{ northItem.muslimPop }} thousand Muslims here. There are 
          {{ northItem.mosqueCount }}. 
          
          {{ northItem.mosqueList }}

        </div>  
      </v-col>        
    </v-row>
    <MapLegendCluster class="map-legend-wrapper-north"/>           
  </div>
</template>

<script>
import VizMapSgNorth from '@/components/viz/VizMapSgNorth';
import MapLegendCluster from '@/components/viz/MapLegendCluster';

export default {
  name: 'SectionMapNorth',
  components: {
    VizMapSgNorth,
    MapLegendCluster
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
