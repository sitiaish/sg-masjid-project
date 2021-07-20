<template>
  <section class="section_wrapper"> 
    <v-container inner class="mb-12"> 
      <p class="text--h4 font-weight-bold mb-4">Something old, something new</p>
      <p class="text--body-1 mb-6">
        The mosques listed on the MUIS website were tagged with a “type”, denoting the status of the land on which the mosque stands. These are Wakaf, Temporary Occupation Licence (TOL), Leasehold, Mosque Building and Mendaki Fund (MBMF).
      </p>
      <p>
        I further populated the dataset by adding the year the mosque was built. It’s intuitive to characterise the older mosques that were standing way before Singapore started the land acquisition as one distinct archetype. And the rest that comes after as separate archetypes.
      </p>
    </v-container>
    <v-container class="mb-12"> 
      <VizMosqueTypes />  
    </v-container>
  </section>
</template>

<script>
import VizMosqueTypes from '@/components/viz/VizMosqueTypes'

export default {
  name: 'Section3MosqueTypes',
  components: {
    VizMosqueTypes
  },
  data() {
    return {
    };
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.section_wrapper {
  background-color: #FFFFFF;
}

span.name {
  background-color: lightslategray;
  color: white;
  padding: 0 4px;
}


</style>