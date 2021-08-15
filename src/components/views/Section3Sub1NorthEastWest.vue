<template>
  <div class="section-cluster-new">
    <v-container outer>
      <SectionMapWest class="my-16" />

      <SectionMapEast class="my-16" />

      <SectionMapNorth class="my-16"/>
    </v-container>  
  </div>
</template>

<script>
import SectionMapNorth from '@/components/views/SectionMapNorth';
import SectionMapEast from '@/components/views/SectionMapEast';
import SectionMapWest from '@/components/views/SectionMapWest';

export default {
  name: 'Section3Sub1NorthEastWest',
  components: {
    SectionMapNorth,
    SectionMapEast,
    SectionMapWest
  },
};
</script>

<style lang="scss" scoped>
.section-cluster-new {
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
  }
}
</style>
