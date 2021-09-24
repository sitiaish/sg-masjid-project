<template>
  <section class="section-towns"> 
    <v-container class="pa-md-0 inner section-towns-block mb-md-12">
      <div class="text-center mb-8">
        <img src="@/assets/title.svg" width="60px" class="scroll-embellish" />      
        <p class="text--h3 scroll-prompt font-weight-bold">A mosque for every town?</p>
      </div>

      <p class="text--body-2">
        Is there a mosque in every town in Singapore?
      </p>

      <p class="text--body-2">
        MUIS regrouped the mosques by cardinal directions in 
        <a href="https://www.nas.gov.sg/archivesonline/data/pdfdoc/20180407001/Fact%20Sheet%20-%20Work%20Plan%20Seminar%202018.pdf" target="_blank">2018 under the Enhanced Mosque Cluster</a>. 
      </p>

      <p class="text--body-2">
        This reduced the initial six clusters down to four.
      </p>
        
      <p class="text--body-2">
        The North, East and West clusters have similar archetypes. Each comprises approximately equal numbers of MBMF and non-MBMF mosques  in a strategic way to better 
        <a href="https://www.nas.gov.sg/archivesonline/data/pdfdoc/20180407001/Fact%20Sheet%20-%20Work%20Plan%20Seminar%202018.pdf" target="_blank">“cater to the needs of congregants” in the areas</a>. 
      </p>
      
      <p class="text--body-2">        
        For instance, MBMF mosques are proximally accessible to nearby Social Service Centers (SSC) which helps ease zakat allocation to beneficiaries. As a large-capacity mosque, they would be equipped with larger manpower, administration and amenities. 
      </p>

      <p class="text--body-2 mb-0">
        On weekends, mosques in these clusters are more likely to provide islamic education programmes like Kids-, Tweens-, Teens-, Youth-aLIVE. Adult programmes known as ADIL are also available throughout the week, presumably targeted at the silver generation or stay-at-home parents. 
      </p>


    </v-container> 

    <div class="section-map-wrapper">
      <v-btn
        icon
        @click.stop="dialog = true"
        class="map-button"
      >
        <v-icon>mdi-help-circle</v-icon>
      </v-btn>

      <Section3Sub1NorthEastWest />

      <v-container class="pa-md-0 inner section-towns-block">
        <p class="text--body-2 mb-0">
          The South cluster looks different from the former three -- there’s less residential areas here. These mosques are bustling during the day because it’s near the Central Business District. Lunch time overlaps with Zohor (mid-day prayer) time giving people nearby the convenience to pop over to a nearby mosque for their prayer. I quote Noor Iskandar from <a href="https://dr.ntu.edu.sg/bitstream/10356/75885/1/NOORISKANDAR_MASTERSTHESIS.pdf" target="_blank">his thesis on mosques in Singapore</a>: 
          
          “Mosques is the most public place to have a private endeavour for a practicing Muslim.”
        </p>
      </v-container>

      <Section3Sub2South />

      <v-container class="pa-md-0 inner section-towns-block">
        <p class="text--body-2 mb-0">
          The mosques in this cluster might not see the same crowd during the weekends. But I personally rejoice having these mosques around because of their convenient location when I’m out and about in town on the weekends. 
        </p>
      </v-container>
    </div>

    <v-dialog
      v-model="dialog"
      width="400">
      <div class="pa-2 pa-md-3 dialog-wrapper">
        <v-btn
          icon
          @click="dialog = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>  

        <div class="px-4 px-md-6 my-2 dialog-wrapper">     
          <p class="text--body-3 mb-2">
            About the mini maps
          </p>        
          <p class="text--reference mb-4">
            The maps display the planning areas in Singapore in from this dataset that was released in 2019. The planning area is shaded according to the number of people who identify as Muslims from the 2015 census which also recorded the towns that they live in. This map combines the data from these two sources.
          </p>
          <MapLegendCluster />           
        </div>
      </div>          

    </v-dialog>
  </section>
</template>

<script>
import Section3Sub1NorthEastWest from '@/components/views/Section3Sub1NorthEastWest'
import Section3Sub2South from '@/components/views/Section3Sub2South'
import MapLegendCluster from '@/components/viz/MapLegendCluster';

export default {
  name: 'Section3Towns',
  components: {
    Section3Sub1NorthEastWest,
    Section3Sub2South,
    MapLegendCluster
  },
  data() {
    return {
      dialog: false,
    }
  }
}
</script>

<style lang="scss" scoped>
.section-towns {
  background-color: #FFFFFF;
  padding: 64px 0;
  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    padding: 48px 0;
  }  
}
.dialog-wrapper {
  background-color: #FFFFFF;
  .v-btn {
    display: block;
    margin-left: auto;    
  }
}

.section-map-wrapper {
  .map-button {
    position: sticky;
    top: 40px;
    left: 64px;
    z-index: 5;
    @media #{map-get($display-breakpoints, 'sm-and-down')} {
      left: 87%;
    }          
  }  
}

</style>