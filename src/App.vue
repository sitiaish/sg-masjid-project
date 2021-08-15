<template>
  <v-app>
    <v-main>
      <SectionIntro />
      <Section1Names />
      <Section2Land />
      <Section3Towns />
      <Section4Architecture />
      <SectionConclusion />

      <!-- <div class="landing-mosque ml-16">
        <img src="@/assets/assyakirin-wire.svg" height="450px" />
        <p class="text--caption">
          Assyakirin, Taman Jurong
        </p>
      </div> 
      
      <div class="landing-mosque ml-16">
        <img src="@/assets/ghufran-pink.png" height="450px" />
        <p class="text--caption">
          Assyakirin, Taman Jurong
        </p>
      </div>       -->
    </v-main>
  </v-app>
</template>

<script>
import SectionIntro from '@/components/views/SectionIntro'
import Section1Names from '@/components/views/Section1Names'
import Section2Land from '@/components/views/Section2Land'
import Section3Towns from '@/components/views/Section3Towns'
import Section4Architecture from '@/components/views/Section4Architecture'
import SectionConclusion from '@/components/views/SectionConclusion'

export default {
  name: 'App',  
  components: {
    SectionIntro,
    Section1Names,
    Section2Land,
    Section3Towns,
    Section4Architecture,
    SectionConclusion            
  },
};
</script>

<style lang="scss">
@import 'styles/_grid.scss';
@import 'styles/_typography.scss';
</style>