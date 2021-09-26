<template>
  <div class="map-cluster">
    <v-row align="center" justify="end" no-gutters>
      <v-col cols="12" md="4">
        <div class="my-10 mt-md-0 mb-10">
          <p class="text--h4 mb-0">East side</p>
          <p class="text--body-2">18 mosques</p>

          <p class="text--body-3">
            There are 8 MBMF mosques in the East cluster.
          </p>

          <p class="text--body-3">
            It does seem that there's a number of mosques in Bedok and Geylang planning areas based on the spattering of circles. But these planning areas are made of smaller populous towns like Eunos, Kembangan, and Paya Lebar.
          </p>

          <p class="text--body-3">
            Tampines is home to another huge MBMF mosque, Masjid Darul Ghufran. After undergoing upgrading works in 2018, Masjid Darul Ghufran can hold up <a href="https://www.roots.gov.sg/places/places-landing/Places/landmarks/tampines-heritage-trail-religious-institutions-trail/Masjid-Darul-Ghufran" target="_blank">
            to more than 5,500 congregants
            </a> (pre-COVID-19, of course).
          </p>
        </div>

        <div class="map-tooltip-wrapper">
          <div v-if="eastItem.location !== 'init' ">
            <p class="text--reference mb-2"><b>Planing area:</b> <span style="text-transform: capitalize">{{ eastItem.location }}</span> </p>
            <div v-if="eastItem.mosqueCount !== 0">
              <p class="text--reference mb-2"><b>No. of Muslims (2015 census):</b>  {{eastItem.muslimPop === 0 ? 0 : eastItem.muslimPop + ' thousand'}} </p>
              <p class="text--reference mb-2"><b>Mosque count:</b> {{ eastItem.mosqueCount }} </p>
              <p class="text--reference mb-0 font-italic">{{ eastItem.mosqueList }} </p>
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
      <v-col cols="12" md="7">
        <VizMapSgEast @update-east-desc="updateEastDesc" />
      </v-col>        
    </v-row>
  </div>
</template>

<script>
import VizMapSgEast from '@/components/viz/VizMapSgEast';
// import MapLegendCluster from '@/components/viz/MapLegendCluster';

export default {
  name: 'SectionMapEast',
  components: {
    VizMapSgEast,
    // MapLegendCluster
  },
  data() {
    return {
      eastItem: { location: 'init', muslimPop: 0, mosqueCount: '', mosqueList: '' }

    }
  },
  methods: {
    updateEastDesc(e) {
      this.eastItem = e;
      this.eastItem.location = (this.eastItem.location.replace(/-/g, ' '));
      this.eastItem.mosqueCount = this.eastItem.mosque ? this.eastItem.mosque.length : 0;

      if (e.mosque !== 0) {
        this.eastItem.mosqueList = this.eastItem.mosque.join(', ')
      }      
    }
  }
};
</script>

<style scoped lang="scss">
.map-tooltip-wrapper {
  border-left: 4px solid #e2e2e2;
  padding-left: 16px;
  height: 140px;
  display: flex;
  align-items: center;
}
</style>