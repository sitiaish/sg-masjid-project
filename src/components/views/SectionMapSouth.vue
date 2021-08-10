<template>
  <div class="my-16 map-cluster">
    <v-row align="start" justify="center" no-gutters>
      <v-col cols="4">
        <div class="my-10">
          <p class="text--h4 mb-0">South side</p>
          <p class="text--body-2">16 mosques</p>

          <p class="text--body-3">
            The mosques in the South cluster comprises of n MBMF mosques. One of the largest is Masjid Assyakirin which has been serving the people in Boon Lay, Taman Jurong and Jurong South since 1978. Until recently in 2019, Masjid Maarof was built in Jurong South to ease the <a href="https://www.straitstimes.com/singapore/maarof-mosque-in-jurong-south-to-be-completed-in-time-for-hari-raya-haji-in-september" target="_blank">overcrowding at Assyakirin</a>. 
          </p>

          <p class="text--body-3">
            The lone dot on the Southern Islands is Masjid Pulau Bukom that caters to the people working on the island.
          </p>
        </div>

        <div class="map-tooltip-wrapper">
          <!-- <p class="text--body-3 font-tertiary">
            Hover over the map areas to see the mosques in the South cluster.
          </p> -->

          The {{ southItem.location }} planning area. The 2015 Census recorded {{ southItem.muslimPop }} thousand Muslims here. There are 
          {{ southItem.mosqueCount }}. 
          
          {{ southItem.mosqueList }}

        </div>  
      </v-col>        
      <v-col cols="5" offset="1">
        <VizMapSgSouth @update-south-desc="updateSouthDesc" />
      </v-col>      
    </v-row>
    <MapLegendCluster class="map-legend-wrapper-south"/>           
  </div>
</template>

<script>
import VizMapSgSouth from '@/components/viz/VizMapSgSouth';
import MapLegendCluster from '@/components/viz/MapLegendCluster';

export default {
  name: 'SectionMapSouth',
  components: {
    VizMapSgSouth,
    MapLegendCluster
  },
  data() {
    return {
      southItem: [
        { location: '' }, 
        { pop: '' },
        { mosqueCount: '' },
        { mosqueList: '' }
      ]
    }
  },
  methods: {
    updateSouthDesc(e) {
      this.southItem = e;
      this.southItem.mosqueCount = this.southItem.mosque ? this.southItem.mosque.length : 0;
      this.southItem.mosqueList = this.southItem.mosque.join(', ')
    }
  }
};
</script>
