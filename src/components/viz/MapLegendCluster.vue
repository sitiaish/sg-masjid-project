<template>
  <div>
    <p class="text--body-3 font-tertiary mb-1">
      No. of Muslims (in thousands)
    </p>
    <div 
      v-for="(j, i) in mapLegend"
      :key="i + '-legend-cluster-1'">
      <span class="crosshatch" :style="{ backgroundColor: j.color}" />
      <span class="text--caption mr-3">{{ j.label}}</span>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'MapLegendCluster',
  data() {
    return {
      mapLegend: [
        { color: '#DCDCDC', label: 'No data' },
        { color: '#f8d9e6', label: '> 0 - 5' },
        { color: '#C5A8B4', label: '> 5 - 15' },
        { color: '#957985', label: '> 15 - 40' },
        { color: '#674D58', label: '> 40' },
      ],
    }
  },
};
</script>

<style lang="scss" scoped>
.crosshatch {
  width: 20px;
  height: 20px;
  background-color: #ffd3c3;
  display: inline-block;
  vertical-align: middle;
  margin-right: 8px;
}
</style>
