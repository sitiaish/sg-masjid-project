<template>
  <div class="my-16 map-cluster">
    <v-row align="start" justify="end" no-gutters>
      <v-col cols="4">
        <div class="my-10">
          <p class="text--h4 mb-0">East side</p>
          <p class="text--body-2">16 mosques</p>

          <p class="text--body-3">
            It does seem that there's a number of mosques in Bedok and Geylang planning areas based on the spatter of circles. But these planning areas are made of smaller populous towns like Eunos, Kembangan and Paya Lebar.
          </p>

          <p class="text--body-3">
            Tampines is home to another huge MBMF mosque, Masjid Darul Ghufran. After undergoing upgrading works in 2018, Masjid Darul Ghufran can hold up 
            <a href="https://www.roots.gov.sg/places/places-landing/Places/landmarks/tampines-heritage-trail-religious-institutions-trail/Masjid-Darul-Ghufran" target="_blank">
            to more than 5,500 congregants
            </a> (pre-COVID-19, of course).
          </p>
        </div>

        <div class="map-tooltip-wrapper">
          <!-- <p class="text--body-3 font-tertiary">
            Hover over the map areas to see the mosques in the West cluster.
          </p> -->

          The {{ eastItem.location }} planning area. The 2015 Census recorded {{ eastItem.muslimPop }} thousand Muslims here. There are 
          {{ eastItem.mosqueCount }}. 
          
          {{ eastItem.mosqueList }}

        </div>                              
      </v-col>       
      <v-col cols="7">
        <VizMapSgEast @update-east-desc="updateEastDesc" />
      </v-col>        
    </v-row>

    <MapLegendCluster class="map-legend-wrapper-east"/>           
  </div>
</template>

<script>
import VizMapSgEast from '@/components/viz/VizMapSgEast';
import MapLegendCluster from '@/components/viz/MapLegendCluster';

export default {
  name: 'SectionMapEast',
  components: {
    VizMapSgEast,
    MapLegendCluster
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