<template>
  <div class="section-map-sg my-16">
    <v-container outer>
      <SectionMapWest />

      <SectionMapEast />

      <SectionMapNorth />

      <SectionMapSouth />

      <!-- <div class="mb-8 map-cluster">
        <v-row align="end" justify="center" no-gutters>        
          <v-col cols="4" offset="1">
            <p class="text--h4">South</p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est porro, aliquam nulla delectus rerum fugiat debitis vel nobis velit! Nihil non quasi molestias perspiciatis sit nostrum assumenda iste recusandae explicabo.
          </v-col>                           
          <v-col cols="5">
            <VizMapSgSouth />
          </v-col>          
        </v-row>

        <div class="map-legend-wrapper-south">
          <p class="text--body-3 font-tertiary mb-1">
            No. of Muslims<br/>
            (in thousands)
          </p>
          <div 
            v-for="(j, i) in mapLegend"
            :key="i + '-legend-cluster-1'">
            <span class="crosshatch" :style="{ backgroundColor: j.color}" />
            <span class="text--caption mr-3">{{ j.label}}</span>
          </div>
        </div>          
      </div> -->

    </v-container>  
  </div>
</template>

<script>
import SectionMapNorth from '@/components/views/SectionMapNorth';
import SectionMapSouth from '@/components/views/SectionMapSouth';
import SectionMapEast from '@/components/views/SectionMapEast';
import SectionMapWest from '@/components/views/SectionMapWest';

export default {
  name: 'SectionScrolly',
  components: {
    SectionMapNorth,
    SectionMapSouth,
    SectionMapEast,
    SectionMapWest
  },
  data() {
    return {
      mapLegend: [
        { color: '#DCDCDC', label: 'No data' },
        { color: '#f8d9e6', label: '> 0 - 5' },
        { color: '#C5A8B4', label: '> 5 - 15' },
        { color: '#957985', label: '> 15 - 40' },
        { color: '#674D58', label: '> 40' },
      ],
      westItem: [
        { location: '' }, 
        { pop: '' },
        { mosqueCount: '' },
        { mosqueList: '' }
      ]
    }
  },
  mounted() {
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

<style lang="scss" scoped>
.map-cluster {
  position: relative;

  .map-legend-wrapper-west {
    position: absolute;
    top: 0px;
    left: 96px;
    
    .crosshatch {
      width: 20px;
      height: 20px;
      background-color: #ffd3c3;
      display: inline-block;
      vertical-align: middle;
      margin-right: 8px;
    }
  }

  .map-legend-wrapper-east {
    position: absolute;
    top: 0px;
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

  .map-legend-wrapper-north {
    position: absolute;
    bottom: 48px;
    left: 96px;
    
    .crosshatch {
      width: 20px;
      height: 20px;
      background-color: #ffd3c3;
      display: inline-block;
      vertical-align: middle;
      margin-right: 8px;
    }
  }  

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

  .map-tooltip-wrapper {
    border: 1px solid #2e2e2e; 
    padding: 8px;
  }
}
</style>
