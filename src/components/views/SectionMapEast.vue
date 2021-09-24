<template>
  <div class="map-cluster">
    <v-row align="center" justify="end" no-gutters>
      <v-col cols="12" md="4">
        <div>
          <p class="text--h4 mb-0">East side</p>
          <p class="text--body-2">18 mosques</p>

          <p class="text--body-3">
            There are 8 MBMF mosques in the East cluster.
          </p>

          <p class="text--body-3">
            It does seem that there's a number of mosques in Bedok and Geylang planning areas based on the spatter of circles. But these planning areas are made of smaller populous towns like Eunos, Kembangan and Paya Lebar.
          </p>

          <p class="text--body-3 mb-0">
            Tampines is home to another huge MBMF mosque, Masjid Darul Ghufran. After undergoing upgrading works in 2018, Masjid Darul Ghufran can hold up <a href="https://www.roots.gov.sg/places/places-landing/Places/landmarks/tampines-heritage-trail-religious-institutions-trail/Masjid-Darul-Ghufran" target="_blank">
            to more than 5,500 congregants
            </a> (pre-COVID-19, of course).
          </p>
        </div>

        <div class="map-tooltip-wrapper hidden-sm-and-down">
          The {{ eastItem.location }} planning area. The 2015 Census recorded {{ eastItem.muslimPop }} thousand Muslims here. There are 
          {{ eastItem.mosqueCount }}. 
          
          {{ eastItem.mosqueList }}

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
      eastItem: [
        { location: '' }, 
        { pop: '' },
        { mosqueCount: '' },
        { mosqueList: '' }
      ]
    }
  },
  methods: {
    updateEastDesc(e) {
      this.eastItem = e;
      this.eastItem.mosqueCount = this.eastItem.mosque ? this.eastItem.mosque.length : 0;
      this.eastItem.mosqueList = this.eastItem.mosque.join(', ')
    }
  }
};
</script>