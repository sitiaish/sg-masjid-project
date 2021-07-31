<template>
  <section class="section_wrapper"> 
    <v-container inner py-12>
      <p class="text--body-2">
        I started with listing out all the mosques that I found on the <a href="https://www.muis.gov.sg/mosque/Our-Mosques/Mosque-Directory" target="_blank">MUIS website</a> to create this dataset. The Majlis Ugama Islam Singapura (MUIS), or the Islamic Religious Council of Singapore, administers mosques in Singapore and has a list of mosques under their purview since their formation in 1968. Previously, mosques operated under their own management without an overarching body to report to. 
      </p>

      <div class="text-center my-6">
        <img src="@/assets/title.svg" width="60px" class="scroll-embellish" />      
        <p class="text--h4 scroll-prompt font-weight-bold">What's in a name?</p>
      </div>

      <p class="text--body-2">
        Immediately, I find that I’m drawn to the names of the mosques in the dataset. The names of some mosques honor the benefactors the contributed significant wealth to raise the mosque from nothing. Others may be signposting their location relative to the landmarks that are around the area. 
      </p>

      <p class="text--body-2">
        And a number of them are named after good virtues, in Arabic. (Is this Arabisation in Singapore? Kidding.)
      </p>
    </v-container> 

    <VizNamesScrollySide v-if="!$vuetify.breakpoint.mobile"/>
    <VizNamesScrollyOverlay v-if="$vuetify.breakpoint.mobile"/>

    <v-container inner class="mt-12"> 
      <div class="text-center my-6">
        <img src="@/assets/title-2.svg" width="70px" class="scroll-embellish" />      
        <p class="text--h4 scroll-prompt font-weight-bold">Mosque as nodes</p>
      </div>


    </v-container>    
  </section>
</template>

<script>
import VizNamesScrollySide from '@/components/viz/VizNamesScrollySide'

export default {
  name: 'Section2Names',
  components: {
    VizNamesScrollySide
  },
  data() {
    return {
    };
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.section-name {
  background-color: #FFFFFF;
}

.scroll-embellish {
  display: inline-block;
}

.scroll-prompt {
  position: relative;
  display: inline-block;
  margin-left: 24px;
}

.scroll-prompt:before {
  content: ' ';
  position: absolute;
  top: 0;
  bottom: 0;
  left: -12px;
  border-left: 3px solid #2e2e2e;
}


</style>