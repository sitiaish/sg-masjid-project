<template>
  <section class="section-names"> 
    <v-container class="pa-md-0 inner section-names-block mb-16">
      <div class="text-center mb-8">
        <img src="@/assets/title.svg" width="60px" class="scroll-embellish" />      
        <p class="text--h4 scroll-prompt font-weight-bold">What's in a name?</p>
      </div>

      <p class="text--body-2">
        Immediately, I find that I’m drawn to the names of the mosques in the dataset. The names of some mosques honor the benefactors that contributed significant wealth to raise the mosque from nothing. Others may be signposting their location relative to the landmarks that are around the area.
      </p>

      <p class="text--body-2 mb-0">
        And a number of them are named after good virtues, in Arabic. (Is this Arabisation in Singapore? Kidding.) 
      </p>
    </v-container> 

    <VizNamesScrollySide v-if="!$vuetify.breakpoint.mobile"/>
    <VizNamesScrollyOverlay v-if="$vuetify.breakpoint.mobile"/>

    <v-container class="pa-md-0 inner section-names-block my-16">
      <p class="text--body-2">
        While populating the dataset, I found that Masjid Al-Firdaus and Masjid Al-Taqua are located on roads with names referencing the mosque. 
      </p>

      <p class="text--body-2">
        Masjid Al-Firdaus is located on Jalan Ibadat. Ibadat in Malay translates to acts of worship to God. While in Arabic, it may refer to service or servitude, or Islamic jurisprudence (fiqh) of Muslim religious rituals. 
      </p>

      <p class="text--body-2 mb-0">
        Similarly, Masjid Al-Taqua is located on Jalan Bilal. Bilal may be a reference to the name Bilal Ibn Rabah, the Islamic Prophet Muhammad’s companion who was known to be the first person to call the adhan (call to prayer) at a mosque. In the Malay language, bilal is the title given to the person who calls the adhan. 
      </p>
    </v-container>

    <v-container class="pa-md-0 my-8 my-md-16">
      <v-row no-gutters align="start" justify="space-around">
        <v-col cols="6" md="5">
          <img src="@/assets/map1.svg" width="100%" />       
        </v-col>

        <v-col cols="6" md="5">
          <img src="@/assets/map1.svg" width="100%" />       
        </v-col>        
      </v-row>
    </v-container>

    <v-container class="pa-md-0 inner mt-md-16">
      <p class="text--body-2">
        Which came first - the mosque or the road name? I’d like to think that these are remnants of other small kampong mosques that had been demolished long ago. 
      </p>

      <p class="text--body-2 mb-0">
        Masjid Al-Taqua, a quaint one story mosque, nestled amidst the luxurious landed properties of Bedok. Masjid Kampong Delta, a two story mosque, hidden among the many HDB high-rise of River Valley. Masjid Huda, affectionately known as Masjid Coronation alluding to Coronation Road, among the bungalows and terraces of Sixth Avenue. 
      </p>
    </v-container>    
  </section>
</template>

<script>
import VizNamesScrollySide from '@/components/viz/VizNamesScrollySide'

export default {
  name: 'Section1Names',
  components: {
    VizNamesScrollySide,
  },
}
</script>

<style lang="scss" scoped>
.section-names {
  padding: 64px 0;
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