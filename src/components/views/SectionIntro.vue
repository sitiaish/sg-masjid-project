<template>
  <section class="section-intro">
    <v-container class="pa-md-0 inner section-intro-block mb-16">
      <p class="text--body-2">
        It’s Pandemic Year 2, y’all. 
      <p>
        
      <p class="text--body-2">
        One of the things that I miss is going to the mosque, especially during Ramadan and for Hari Raya prayers for congregational prayers.
      </p>

      <p class="text--body-2">
        We have a 
        <a href="https://ourmosques.commonspaces.sg/" target="_blank">booking system</a> 
        in place for Muslims to 
        <span class="font-italic">chope</span> 
        a slot for daily and Jumaah congregational prayers. Said system broke down at 10AM on 11/5/2021 - the exact moment that booking slots were released for Hari Raya congregational prayers this year. 
      </p>

      <p class="text--body-2">
        So I made this project about mosques in Singapore.
      </p>

      <p class="text--caption">
        Note: colors/sketch dimensions is not to scale
      </p>      
    </v-container>

    <div class="section-intro-title my-16">
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="8" md="6">
            <div class="landing-mosque mb-12 mb-md-0">
              <img src="@/assets/ghufran-pink.png" width="100%"/>
              <p class="text--caption">
                Darul Ghufran, Tampines
              </p>
            </div>
          </v-col>

          <v-col cols="12" md="6" class="text-left"> 
            <h1 class="text--h1 font-weight-regular mb-8">This is a mosque somewhere in Singapore.</h1> 
            <p class="text--body-2">
              It's where me and other Muslims can go for congregational prayers and maybe attend a religious class or two. 
            </p>
            <p class="text--body-2">
              There are ~72 mosques still standing in Singapore. This is an exploration of some of them.
            </p>               
          </v-col>
        </v-row>
      </v-container>     
    </div>
    
    <v-container class="pa-md-0 inner section-intro-block">
      <p class="text--body-2 mb-0">
        I started with listing out all the mosques that I found on the <a href="https://www.muis.gov.sg/mosque/Our-Mosques/Mosque-Directory" target="_blank">MUIS website</a> to create this dataset. The Majlis Ugama Islam Singapura (MUIS), or the Islamic Religious Council of Singapore, administers mosques in Singapore and has a list of mosques under their purview since their formation in 1968. Previously, mosques operated under their own management without an overarching body to report to. 
      </p>
    </v-container>
  </section>
</template>  

<script>
export default {
  name: 'SectionIntro',
}
</script>

<style lang="scss" scoped>
.section-intro {
    padding: 64px 0;

  .section-intro-title {
    background-color: #f5f5f5;

    .landing-mosque {
      position: relative;

      p {
        position: absolute;
        bottom: 0;
        left: -24px;
        writing-mode: vertical-rl;
        text-orientation: mixed;
        display: inline;
      }
    }
  }
}
</style>