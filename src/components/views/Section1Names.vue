<template>
  <section class="section-names"> 
    <v-container class="pa-md-0 inner section-names-block mb-16">
      <div class="text-center mb-8">
        <img src="@/assets/title.svg" width="60px" class="scroll-embellish" />      
        <p class="text--h3 scroll-prompt font-weight-bold">What's in a name?</p>
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
        Masjid Al-Firdaus is located on Jalan Ibadat. <em>Ibadat</em> in Malay translates to acts of worship to God. While in Arabic, it may refer to service or servitude, or Islamic jurisprudence (fiqh) of Muslim religious rituals. 
      </p>

      <p class="text--body-2 mb-0">
        Similarly, Masjid Al-Taqua is located on Jalan Bilal. <em>Bilal</em> may be a reference to Bilal Ibn Rabah, a companion of the Islamic Prophet Muhammad’s. He was known as first person to call the <em>adhan</em> (call to prayer). In the Malay language, <em>bilal</em> is the designation given to the person who calls the <em>adhan</em>. 
      </p>
    </v-container>

    <v-container class="pa-md-0 my-8 my-md-16">
      <v-row align="start" justify="space-around">
        <v-col cols="9" md="5">
          <img src="@/assets/map1.svg" width="100%" />       
        </v-col>

        <v-col cols="9" offset="3" offset-md="0" md="5">
          <img src="@/assets/map1.svg" width="100%" />       
        </v-col>        
      </v-row>
    </v-container>

    <v-container class="pa-md-0 inner mt-md-16">
      <p class="text--body-2">
        Which came first - the mosque or the road name? I’d like to think that these are remnants of small kampong mosques that stayed on while the actual kampong houses were demolished to make way for urbanisation.
      </p>

      <!-- <p class="text--body-2 mb-0">
        Masjid Al-Taqua, a quaint one story mosque, nestled amidst the luxurious landed properties of Bedok. Masjid Kampong Delta, a two story mosque, hidden among the many HDB high-rise of River Valley. Masjid Huda, affectionately known as Masjid Coronation alluding to Coronation Road, among the bungalows and terraces of Sixth Avenue. 
      </p> -->
    </v-container>    
  </section>
</template>

<script>
import VizNamesScrollySide from '@/components/viz/VizNamesScrollySide'
import VizNamesScrollyOverlay from '@/components/viz/VizNamesScrollyOverlay'

export default {
  name: 'Section1Names',
  components: {
    VizNamesScrollySide,
    VizNamesScrollyOverlay
  },
}
</script>

<style lang="scss" scoped>
.section-names {
  padding: 64px 0;
  background-color: #FFFFFF;
}
</style>