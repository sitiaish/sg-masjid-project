<template>
  <div class="section-cluster-s my-16">
    <v-container class="map-cluster outer">    
      <v-row align="center" justify="center" no-gutters>
        <v-col cols="4">
          <div class="my-10">
            <p class="text--h4 mb-0">South side</p>
            <p class="text--body-2">20 mosques</p>

            <p class="text--body-3">
              There are 2 MBMF mosques in the South cluster. But, I’m drawing your attention to two mosques that are housed within commercial buildings.
            </p>

            <p class="text--body-3">
              Masjid Al-Falah, in Orchard Road is housed in the lower floor of a commercial building with a linkbridge into Paragon Mall. The tell-tale sign of the mosque is the minimalist dome-shaped embellishment over the front doors of the mosque, and the signboard that reads “Masjid Al-Falah”.
            </p>

            <p class="text--body-3 mb-0">
              Similarly, Masjid Moulana Mohd Ali M C is in the basement of UOB Plaza 1, near Raffles Place MRT and the Singapore River. You have to walk down a flight of stairs to enter the mosque. This is a Wakaf mosque, and the best part is that it is air-conditioned. 
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
    </v-container>  
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

<style lang="scss" scoped>
.map-cluster {
  position: relative;
  .map-legend-wrapper-south {
    position: absolute;
    bottom: 48px;
    right: 48px;
    
    .crosshatch {
      width: 20px;
      height: 20px;
      background-color: #ffd3c3;
      display: inline-block;
      vertical-align: middle;
      margin-right: 8px;
    }
  }    
}
</style>

