<template>
  <section class="section-land"> 
    <v-container class="pa-md-0 inner section-land-block mb-16">
      <div class="text-center mb-8">
        <img src="@/assets/title.svg" width="70px" class="scroll-embellish" />   
        <p class="text--h3 scroll-prompt font-weight-bold">Where they stand</p>
      </div>

      <p class="text--body-2">
        The mosques listed on the MUIS website were tagged with a “type”, denoting the status of the land they each stand on. These are:
      </p>

      <ul class="text--body-2 ml-8 my-8">
        <li><i>Wakaf</i></li>
        <li>Mosque Building Mendaki Fund (MBMF). </li>
        <li>Temporary Occupation License (TOL)</li>
        <li>Leasehold</li>        
      </ul>

      <p class="text--body-2">
        Land with TOL status carries a license issued by SLA for 
        <a href="https://www.ifaq.gov.sg/sla/apps/fcd_faqmain.aspx?qst=hRhkP9BzcBImsx2TBbssMsxu7lqt6UJK70a1wAEVmyeS%2FsKIBQni97KoyIEWYbqaOuQV95spiCB7hU9stXXumYDmXsSN43FLRMTSuN0LML%2FJ94RP144Vsrlofeg9NOogP%2FXRSQ4AiQfDWJtg7jS6vSwQ20FgPSPzmjLh8JafJy1NyeFsmxigq%2B9C8nmt8IPEw7E%2Fpb3PQi276vhP8D8D7K51GmihYYk9bU%2FFjiVi7J0%3D#FAQ_31016" target="_blank">
        "the temporary use of State land [...]"</a>.
        
        Leasehold lands in Singapore are for either on a 99-year or 999-year basis. Land used for developing mosques is given a <a href="https://www.nas.gov.sg/archivesonline/data/pdfdoc/lky19871003.pdf" target="_blank">
        99-year lease to facilitate the government's policy to have one mosque in every HDB New Town developed</a>.
      </p>

      <p class="text--body-2">
        Some mosques are also protected under the Administration of Muslim Law Act (AMLA) and these are called <i>wakaf</i> mosques. A property that is dedicated as <i>wakaf</i> is a voluntary charitable endowment whose ownership is <a href="https://www.masjidjamaechulia.sg/welcome/history" taregt="_blank">placed in trust for the Muslim community</a>. 
      </p>

      <p class="text--body-2">
        A land that has been <i>wakaf</i> for a mosque must be used for that, and not any other purposes. This implicitly means that <i>wakaf</i> mosques in Singapore are the older ones. These days, how many of us Singaporeans actually own land to build a mosque right? (Even our houses are BTO.) 
      </p>

      <p class="text--body-2">
        I want to single out a <i>wakaf</i> mosque that I found really interesting in my research: Masjid Temenggong Daeng Ibrahim. Earlier I mentioned that it wasn't in MUIS' official directory, but it's still open for people to do their prayers. 
      </p>

      <p class="text--body-2 mb-0">
       Located along Telok Blangah Road (near Vivo City Shopping Mall), this mosque actually belongs to the Johor Sultanate, and hence administered by Jabatan Agama Islam Negeri Johor (JAIJ), the religious governing body of Johor. Its <i>wakaf</i> status comes from the fact that it stands on the grounds of the palace first built for Temenggong Abdul Rahman in 1824, called <i>Istana Lama</i> (old palace). Today, this site houses the mosque and the tombs of Temenggong Abdul Rahman and his son, Daeng Ibrahim.
      </p>      
    </v-container>

    <VizMosqueTypes v-if="!$vuetify.breakpoint.mobile" />  
    <VizMosqueTypesMobile v-if="$vuetify.breakpoint.mobile" />  

    <v-container class="pa-md-0 inner section-land-block"> 
      <p class="text--body-2 mb-5">
        This brings us to the last type of mosque - the MBMF mosques that are shaded blue above, and clusters towards the recent years of the timeline. Since 1975, every working Muslim in Singapore has been contributing a collective community fund called the Mosque Building Mendaki Fund (MBMF), formerly started as Mosque Building Fund (MBF). One of the purposes of this fund was to <a href="https://www.muis.gov.sg/mosque/Mosque-Infrastructure/About-MBMF/About" target="_blank">build a mosque in every town in Singapore</a>. 
      </p>

      <p class="text--body-2 mb-6">
        To date, there has been a total of 4 phases of MBMF-mosque building projects. I refer to <a href="https://dr.ntu.edu.sg/bitstream/10356/75885/1/NOORISKANDAR_MASTERSTHESIS.pdf" target="_blank">Noor Iskandar's thesis</a> on mosque spaces in Singapore for the characterisation of these four phases:
      </p>

      <v-timeline :dense="$vuetify.breakpoint.smAndDown" class="my-md-16 my-8">
        <v-timeline-item
          v-for="n in mbmfPhases"
          :key="n.phase">
          <template v-slot:icon>
            <v-avatar>
              <img src="@/assets/title.svg" width="100%" style="background: #f1f1f1;"/>      
            </v-avatar>
          </template>

        <template v-slot:opposite>
          <img :src="require('@/assets/' + `${n.img}`)" width="100%"/>
        </template>
            
          <v-card class="elevation-0 pa-3">
            <span class="text--body-1 font-weight-bold font-tertiary mb-3">Phase {{ n.phase }}: {{ n.name }}</span>
            <p class="text--body-2 mb-4">{{ n.year}}</p>

            <p class="text--body-3 mb-0">{{ n.example}}</p>
          </v-card>
        </v-timeline-item>
      </v-timeline>                
    </v-container> 
  </section>
</template>

<script>
import VizMosqueTypes from '@/components/viz/VizMosqueTypes'
import VizMosqueTypesMobile from '@/components/viz/VizMosqueTypesMobile'

export default {
  name: 'Section2Land',
  components: {
    VizMosqueTypes,
    VizMosqueTypesMobile
  },
  data() {
    return {
      mbmfPhases: [
        { phase: 1, year: '1976 - 1980', name: 'Pioneers-Grand mosques', example: 'Some examples are Masjid Assyakirin and Masjid Al-Muttaqin. As the first few of the many to come, these mosques are massive.', img: 'assyakirin-wire-1.svg'},
        { phase: 2, year: '1981 - 1995', name: 'Nusantara', example: 'As the name suggests, some mosques like Masjid Alkaff Kampung Melayu and Masjid Darul Makmur among others, bear influence of Nusantara in their motifs and designs.', img: 'ghufran-pink.png'},   
        { phase: 3, year: '1996 - 2005', name: 'Contemporary Singapore Model of Compact Urban Mosques', example: 'Examples: Masjid Al-Istighfar and Masjid Assyafaah', img: 'assyafaah.svg'},       
        { phase: 4, year: '2006 - now', name: 'Performance-Friendly', example: 'These mosques feature environmentally-friendly features. Masjid Al-Mawaddah even achieved the Greenmark Certification from the Building and Construction Authority.', img: 'mawaddah-green.svg'},  
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.section-land {
  padding: 64px 0;
  background-color: #FFFFFF;
  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    padding: 48px 0;
  }
  
  .v-timeline-item {
    align-items: center;
    margin: 24px 0;
  }
}
</style>