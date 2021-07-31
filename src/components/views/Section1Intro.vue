<template>
  <section class="section_wrapper">    
    <v-container inner pt-12>
      <!-- <v-row justify="center">  
        <v-col cols="12" md="8"> -->
          <div class="py-md-12 py-8">
            <p class="text--body-1">
              Most of my growing years were spent going to the mosque - be it for congregational prayers, major Islamic events like Hari Raya, or religious classes. Plus, my mom worked in the mosque near our house. On most days when no one was free to mind kid-me, I’d followed her around the mosque as she went about her day.  
            </p>

            <p class="text--body-1">
              This is my project to document the mosques in Singapore in the way that I know best - through datavis and interactive exploration. 
            </p>

            <h3 class="text--body-1 font-italic my-6">Where do we even start?</h3>

            <p class="text--body-1">
              The Majlis Ugama Islam Singapura (MUIS), or the Islamic Religious Council of Singapore, administers mosques in Singapore and has a list of mosques under their purview since their formation in 1968. Previously, each mosque would operate under their own management without an overarching body to report to. 
            </p>

            <p class="text--body-1">
              This means that all the mosques that existed then went under MUIS and of course not every mosque survived the rapid urbanisation that Singapore went through. (Because there was not enough land amirite.) But over the years new mosques were built, and remaining old mosques were upgraded. 
            </p>

            <p class="text--body-1">
              I started with listing out all the mosques that I found on the <a href="https://www.muis.gov.sg/mosque/Our-Mosques/Mosque-Directory" target="_blank">MUIS website</a> to create this dataset. Immediately, I find that I’m drawn to the names of the mosques in the dataset. 
            </p>
          </div>       
        <!-- </v-col>
      </v-row> -->
    </v-container>
  </section>
</template>

<script>
export default {
  name: 'Section1Intro',
}
</script>

<style lang="scss" scoped>
.section_wrapper {
  background-color: #FFFFFF;
}
</style>