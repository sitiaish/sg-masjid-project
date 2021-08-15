<template>
  <section class="section-land"> 
    <v-container class="pa-md-0 inner section-land-block mb-16">
      <div class="text-center mb-8">
        <img src="@/assets/title-2.svg" width="70px" class="scroll-embellish" />      
        <p class="text--h4 scroll-prompt font-weight-bold">The land where they stand</p>
      </div>

      <p class="text--body-2">
        The mosques listed on the MUIS website were tagged with a “type”, denoting the status of the land on which the mosque stands. Funny, what a weird way to categorise mosques. I further populated the dataset by adding the year the mosque was built. These are:
      </p>

      <ul class="text--body-2 ml-8 my-8">
        <li><em>Wakaf</em></li>
        <li>Mosque Building Mendaki Fund (MBMF). </li>
        <li>Temporary Occupation Licence (TOL)</li>
        <li>Leasehold</li>        
      </ul>

      <p class="text--body-2">
        The latter two types are basically According to SLA's website, lands marked as TOLs are on short, fixed terms with renewable yearly or monthly contracts. Leasehold lands in Singapore are for either on a 99-year or 999-year basis. Between these two, I guess mosques on TOL lands may be looked over when Singapore needs to use more land in the future?        
      </p>

      <p class="text--body-2">
        But some mosques are also protected under the Administration of Muslim Law Act (AMLA) and these are called <em>Wakaf</em> mosques. A property that is dedicated as <em>Wakaf</em> is a voluntary charitable endowment whose ownership is <a href="https://www.masjidjamaechulia.sg/welcome/history" taregt="_blank">placed in trust for the Muslim community</a>. 
      </p>

      <p class="text--body-2 mb-0">
        A land that has been <em>Wakaf</em> for a mosque must be used for that, and not any other purposes. This implicitly means that <em>Wakaf</em> mosques in Singapore are the older ones. These days, how many of us Singaporeans actually own land to build a mosque right? (Even our houses are BTO.) 
      </p>
    </v-container>

    <VizMosqueTypes />  

    <v-container class="pa-md-0 inner section-land-block"> 
      <p class="text--body-2">
        This brings us to the last type of mosque -- the MBMF mosques that are shaded blue above, and clusters towards the recent years of the timeline. Since 1974, every working Muslim in Singapore has been contributing a collective community fund called the Mosque Building Mendaki Fund (MBMF), formerly started as Mosque Building Fund (MBF). One of the purposes of this fund was to build a mosque in every town in Singapore. 
      </p>

      <p class="text--body-2 mb-0">
        To date, there has been a total of 4 phases of MBMF-mosque building projects since 1974.
        <br />
      </p> 

      <span class="font-weight-bold">NISA'S PART</span>
    </v-container> 
  </section>
</template>

<script>
import VizMosqueTypes from '@/components/viz/VizMosqueTypes'

export default {
  name: 'Section2Land',
  components: {
    VizMosqueTypes
  },
}
</script>

<style lang="scss" scoped>
.section-land {
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