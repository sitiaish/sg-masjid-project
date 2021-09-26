<template>
  <div class="map-cluster">
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12" md="4" offset-md="1" order-md="2">
        <div class="my-10 mt-md-0 mb-6">
          <p class="text--h4 mb-0">North side</p>
          <p class="text--body-2">16 mosques</p>

          <p class="text--body-3">
            There are 9 MBMF mosques in the North cluster, the highest among the four.
          </p>

          <p class="text--body-3">
            Masjid Muhajirin in Bishan is the first mosque built under the MBMF scheme in 1977. To date, it still serves as maximum capacity of 1400. Th newest mosque under the MBMF is also located in this cluster: Masjid Yusof Ishak. Built in 2017 with the capacity to serve 4500 congregants, it’s the second mosque located in Woodlands after Masjid An-Nur - a testament to the huge Muslim community there. 
          </p>
        </div>

        <div class="map-tooltip-wrapper">
          <div v-if="northItem.location !== 'init' ">
            <p class="text--reference mb-2"><b>Planing area:</b> {{ northItem.location }} </p>
            <div v-if="northItem.muslimPop !== 0">
              <p class="text--reference mb-2"><b>No. of Muslims (2015 census):</b>  {{northItem.muslimPop === 0 ? 0 : northItem.muslimPop + 'thousand'}} </p>
              <p class="text--reference mb-2"><b>Mosque count:</b> {{ northItem.mosqueCount }} </p>
              <p class="text--reference mb-0 font-italic">{{ northItem.mosqueList }} </p>
            </div>
            <div v-else>
              There's no data in this planning area. Hover over the coloured ones to see more!
            </div>
          </div>

          <div v-else>
            <p>Hover over the planning areas for more details</p>
          </div>      
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
      northItem: { location: 'init', muslimPop: 0, mosqueCount: '', mosqueList: '' },
    }
  },

  methods: {
    updateNorthDesc(e) {
      this.northItem = e;
      this.northItem.mosqueCount = this.northItem.mosque ? this.northItem.mosque.length : 0;
      this.northItem.mosqueList = this.northItem.mosque
    }
  }
};
</script>

<style scoped lang="scss">
.map-tooltip-wrapper {
  border-left: 4px solid #e2e2e2;
  padding-left: 16px;
  height: 100px;
  display: flex;
  align-items: center;
}
</style>
