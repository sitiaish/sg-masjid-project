<template>
  <div class="map-cluster">
    <v-row align="center" justify="start" no-gutters>
      <v-col cols="12" md="4" order-md="2">
        <div class="mb-12">
          <p class="text--h4 mb-0">West side</p>
          <p class="text--body-2">16 mosques</p>

          <p class="text--body-3">
            There are 7 MBMF mosques in the West cluster.
          </p>

          <p class="text--body-3">
            The mosques in the West cluster comprises of n MBMF mosques. One of the largest is Masjid Assyakirin which has been serving the people in Boon Lay, Taman Jurong and Jurong West since 1978. Until recently in 2019, Masjid Maarof was built in Jurong West to ease the <a href="https://www.straitstimes.com/singapore/maarof-mosque-in-jurong-west-to-be-completed-in-time-for-hari-raya-haji-in-september" target="_blank">overcrowding at Assyakirin</a>. 
          </p>

          <p class="text--body-3">
            The lone dot on the Western Islands is Masjid Pulau Bukom that caters to the people working on the island.
          </p>

          <div class="map-tooltip-wrapper hidden-sm-and-down">
            The {{ westItem.location }} planning area. The 2015 Census recorded {{ westItem.muslimPop }} thousand Muslims here. There are 
            {{ westItem.mosqueCount }}. 
            
            {{ westItem.mosqueList }}

          </div>
        </div>
      </v-col> 

      <v-col cols="12" md="7" order-md="1">
        <VizMapSgWest @update-west-desc="updateWestDesc" />
      </v-col>       
    </v-row>
    <!-- <MapLegendCluster class="map-legend-wrapper-west"/>            -->
  </div>
</template>

<script>
import VizMapSgWest from '@/components/viz/VizMapSgWest';
// import MapLegendCluster from '@/components/viz/MapLegendCluster';

export default {
  name: 'SectionMapWest',
  components: {
    VizMapSgWest,
    // MapLegendCluster
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
