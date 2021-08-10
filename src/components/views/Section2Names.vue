<template>
  <section class="section_wrapper"> 
    <v-container inner py-12>
      <p class="text--body-2 mb-12">
        I started with listing out all the mosques that I found on the <a href="https://www.muis.gov.sg/mosque/Our-Mosques/Mosque-Directory" target="_blank">MUIS website</a> to create this dataset. The Majlis Ugama Islam Singapura (MUIS), or the Islamic Religious Council of Singapore, administers mosques in Singapore and has a list of mosques under their purview since their formation in 1968. Previously, mosques operated under their own management without an overarching body to report to. 
      </p>

      <div class="text-center mb-8">
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

    <v-container inner class="my-12"> 
      <div class="text-center mb-8">
        <img src="@/assets/title-2.svg" width="70px" class="scroll-embellish" />      
        <p class="text--h4 scroll-prompt font-weight-bold">Where they stand</p>
      </div>

      <p class="text--body-2">
        The mosques listed on the MUIS website were tagged with a “type”, denoting the status of the land on which the mosque stands. These are <em>Wakaf</em>, Temporary Occupation Licence (TOL), Leasehold, Mosque Building and Mendaki Fund (MBMF). Funny, what a weird way to categorise mosques. I further populated the dataset by adding the year the mosque was built.

      </p>
      <p class="text--body-2">
        According to SLA's website, lands marked as TOLs are on short, fixed terms with renewable yearly or monthly contracts. Leasehold lands in Singapore are for either on a 99-year or 999-year basis. Between these two, I guess mosques on TOL lands may be looked over when Singapore needs to use more land in the future?         
      </p>    
    </v-container>

    <VizMosqueTypes />  

    <v-container inner class="my-12"> 
      <p class="text--body-2">
        But some mosques are also protected under the Administration of Muslim Law Act (AMLA) and these are called <em>Wakaf</em> mosques. A property that is dedicated as <em>Wakaf</em> is a voluntary charitable endowment whose ownership transferred to God. A land that has been <em>Wakaf</em> for building a mosque must be used for that.
      </p>
      <p class="text--body-2">
        So, <em>Wakaf</em> mosques are older mosques because these days how many of us Singaporeans actually own land to build a mosque right? 
      </p>
      <p class="text--body-2">
        Kinda. 
      </p> 
      <p class="text--body-2">
        To be fair, every working Muslim in Singapore since 1974 has contributed to building the new mosques in Singapore in a community fund called the Mosque Building Fund (MBF). The purpose of this fund was to build a mosque in every town in Singapore.  
      </p>
      <p class="text--body-2">
        MBF expanded to include Mendaki which covers educational and social programmes for the community in 1984 on top of mosque building. So it became Mosque Building <em>Mendaki</em> Fund or MB<em>M</em>F. 
      </p>     
      <p class="text--body-2">
        Which brings me to this: Is there a mosque in every town in Singapore? 
      </p>           

      <p class="text--caption">
        Data: 
        <a href="https://data.gov.sg/dataset/resident-population-aged-15-years-and-over-by-planning-area-and-religion-2015?resource_id=f4cd606f-b4a1-4f8d-a517-095e4af8c964" target="_blank">
        Resident Population Aged 15 Years and Over by Planning Area and Religion, 2015
        </a>
      </p>      
    </v-container> 
  </section>
</template>

<script>
import VizNamesScrollySide from '@/components/viz/VizNamesScrollySide'
import VizMosqueTypes from '@/components/viz/VizMosqueTypes'

export default {
  name: 'Section2Names',
  components: {
    VizNamesScrollySide,
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