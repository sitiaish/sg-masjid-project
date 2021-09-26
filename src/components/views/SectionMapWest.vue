<template>
  <div class="map-cluster">
    <v-row align="center" justify="start" no-gutters>
      <v-col cols="12" md="4" order-md="2">
        <div class="my-10 mt-md-0 mb-6">
          <p class="text--h4 mb-0">West side</p>
          <p class="text--body-2">16 mosques</p>

          <p class="text--body-3">
            There are 7 MBMF mosques in the West cluster.
          </p>

          <p class="text--body-3">
            One of the largest is Masjid Assyakirin which has been serving the people in Boon Lay, Taman Jurong and Jurong West since 1978. Until recently in 2019, Masjid Maarof was built in Jurong West to ease the <a href="https://www.straitstimes.com/singapore/maarof-mosque-in-jurong-west-to-be-completed-in-time-for-hari-raya-haji-in-september" target="_blank">overcrowding at Assyakirin</a>. 
          </p>

          <p class="text--body-3">
            The lone dot on the Western Islands is Masjid Pulau Bukom that caters to the people working on the island.
          </p>
        </div>

        <div class="map-tooltip-wrapper">
          <div v-if="westItem.location !== 'init' ">
            <p class="text--reference mb-2"><b>Planing area:</b> <span style="text-transform: capitalize">{{ westItem.location }}</span> </p>
            <div v-if="westItem.mosqueCount !== 0">
              <p class="text--reference mb-2"><b>No. of Muslims (2015 census):</b> {{westItem.muslimPop === 0 ? 0 : westItem.muslimPop + ' thousand'}}</p>
              <p class="text--reference mb-2"><b>Mosque count:</b> {{ westItem.mosqueCount }} </p>
              <p class="text--reference mb-0 font-italic">{{ westItem.mosqueList }} </p>
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

      <v-col cols="12" md="7" order-md="1">
        <VizMapSgWest @update-west-desc="updateWestDesc" />
      </v-col>       
    </v-row>
    <!-- <MapLegendCluster class="map-legend-wrapper-west"/>            -->
  </div>
</template>

<script>
import VizMapSgWest from '@/components/viz/VizMapSgWest';

export default {
  name: 'SectionMapWest',
  components: {
    VizMapSgWest,
  },
  data() {
    return {
      westItem: { location: 'init', muslimPop: 0, mosqueCount: '', mosqueList: '' },
    }
  },
  methods: {
    updateWestDesc(e) {
      this.westItem = e;
      this.westItem.location = (this.westItem.location.replace(/-/g, ' '));
      this.westItem.mosqueCount = this.westItem.mosque ? this.westItem.mosque.length : 0;
      if (e.mosque !== 0) {
        this.westItem.mosqueList = this.westItem.mosque.join(', ')
      }   
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