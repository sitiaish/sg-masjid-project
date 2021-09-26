<template>
  <div class="section-cluster-s my-12 my-md-16">
    <v-container class="map-cluster outer">    
      <v-row align="center" justify="center" no-gutters>
        <v-col cols="12" md="4">
          <div class="my-md-10">
            <p class="text--h4 mb-0">South side</p>
            <p class="text--body-2">20 mosques</p>

            <p class="text--body-3">
              There are 2 MBMF mosques in the South cluster. But, I’m drawing your attention to two mosques that are housed within commercial buildings.
            </p>

            <p class="text--body-3">
              Masjid Al-Falah, in Orchard Road is housed in the lower floor of a commercial building with a link bridge into Paragon Mall. The tell-tale sign of the mosque is the minimalist dome-shaped embellishment over the front doors of the mosque, and the signboard that reads “Masjid Al-Falah”.
            </p>

            <p class="text--body-3 mb-0">
              Similarly, Masjid Moulana Mohd Ali M C is in the basement of UOB Plaza 1, near Raffles Place MRT and the Singapore River. You have to walk down a flight of stairs to enter the mosque. This is a Wakaf mosque, and the best part is that it is air-conditioned. 
            </p>
          </div>

          <div class="map-tooltip-wrapper">
            <div v-if="southItem.location !== 'init' ">
              <p class="text--reference mb-2"><b>Planing area:</b> <span style="text-transform: capitalize">{{ southItem.location }}</span> </p>
              <div v-if="southItem.mosqueCount !== 0">
                <p class="text--reference mb-2"><b>No. of Muslims (2015 census):</b>  {{ southItem.muslimPop === 0 ? 0 : southItem.muslimPop + ' thousand' }} </p>
                <p class="text--reference mb-2"><b>Mosque count:</b> {{ southItem.mosqueCount }} </p>
                <p class="text--reference mb-0 font-italic">{{ southItem.mosqueList }} </p>
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
        <v-col cols="12" md="5" offset-md="1">
          <VizMapSgSouth @update-south-desc="updateSouthDesc" />
        </v-col>      
      </v-row>
    </v-container>  
  </div>
</template>

<script>
import VizMapSgSouth from '@/components/viz/VizMapSgSouth';

export default {
  name: 'SectionMapSouth',
  components: {
    VizMapSgSouth,
  },
  data() {
    return {
      southItem: 
        { location: 'init', muslimPop: 0, mosqueCount: '', mosqueList: '' }
    }
  },
  mounted() {
  },
  methods: {
    updateSouthDesc(e) {
      this.southItem = e;
      this.southItem.location = (this.southItem.location.replace(/-/g, ' '));
      this.southItem.mosqueCount = this.southItem.mosque ? this.southItem.mosque.length : 0;
      if (e.mosque !== 0) {
        this.southItem.mosqueList = this.southItem.mosque.join(', ')
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