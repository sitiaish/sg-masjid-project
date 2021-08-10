<template>
  <div class="my-16 map-cluster">
    <v-row align="start" justify="start" no-gutters>
      <v-col cols="7">
        <VizMapSgWest @update-west-desc="updateWestDesc" />
      </v-col>
      <v-col cols="4">
        <div class="my-10">
          <p class="text--h4 mb-0">West side</p>
          <p class="text--body-2">16 mosques</p>

          <p class="text--body-3">
            The mosques in the West cluster comprises of n MBMF mosques. One of the largest is Masjid Assyakirin which has been serving the people in Boon Lay, Taman Jurong and Jurong West since 1978. Until recently in 2019, Masjid Maarof was built in Jurong West to ease the <a href="https://www.straitstimes.com/singapore/maarof-mosque-in-jurong-west-to-be-completed-in-time-for-hari-raya-haji-in-september" target="_blank">overcrowding at Assyakirin</a>. 
          </p>

          <p class="text--body-3">
            The lone dot on the Western Islands is Masjid Pulau Bukom that caters to the people working on the island.
          </p>
        </div>

        <div class="map-tooltip-wrapper">
          <!-- <p class="text--body-3 font-tertiary">
            Hover over the map areas to see the mosques in the West cluster.
          </p> -->

          The {{ westItem.location }} planning area. The 2015 Census recorded {{ westItem.muslimPop }} thousand Muslims here. There are 
          {{ westItem.mosqueCount }}. 
          
          {{ westItem.mosqueList }}

        </div>  
      </v-col>        
    </v-row>
    <MapLegendCluster class="map-legend-wrapper-west"/>           
  </div>
</template>

<script>
import VizMapSgWest from '@/components/viz/VizMapSgWest';
import MapLegendCluster from '@/components/viz/MapLegendCluster';

export default {
  name: 'SectionMapWest',
  components: {
    VizMapSgWest,
    MapLegendCluster
  },
  data() {
    return {
      westItem: [
        { location: '' }, 
        { pop: '' },
        { mosqueCount: '' },
        { mosqueList: '' }
      ]
    }
  },
  methods: {
    updateWestDesc(e) {
      this.westItem = e;
      this.westItem.mosqueCount = this.westItem.mosque ? this.westItem.mosque.length : 0;
      this.westItem.mosqueList = this.westItem.mosque.join(', ')
    }
  }
};
</script>
