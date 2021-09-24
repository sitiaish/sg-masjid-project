<template>
  <section class="section-archi"> 
    <v-container class="pa-md-0 inner section-archi-block"> 
      <div class="text-center mb-8">
        <img src="@/assets/title.svg" width="70px" class="scroll-embellish" />    
        <p class="text--h3 scroll-prompt font-weight-bold">Do all mosques look the same?</p>
      </div>

      <v-row justify="space-between" align="center" no-gutters class="mb-8">
        <v-col cols="12" md="2" offset-md="1" class="hidden-sm-and-down">
          <img src="@/assets/archi-onion-tower.png" width="100%" />      
        </v-col>

        <v-col cols="12" md="8">
          <!-- <div class="archi-disclaimer mb-8">
            <p class="text--body-2 mb-0">
              Note: I am not trained as an architect or a historian. This is a chill project to collect data about mosques in Singapore and make a data story from it.
            </p>
          </div> -->

          
          <p class="text--body-2">
            I had a friend describe a mosque to me. He said, 
          </p>

          <div class="archi-quote">
            <img src="@/assets/archi-onion-tower.png" width="15%" class="hidden-md-and-up" />      

            <p class="text--blockquote mb-0">
              “They’re places with an onion-shaped dome on top of a tall tower, and there’s a crescent and star at the top of that dome”. 
            </p>
          </div>
        </v-col>
      </v-row>

      <p class="text--body-2">
        He’s not wrong - that's one way to describe it. But, as someone who Googled 72 mosques for this project, here are some of the interesting findings. OH! And "onion-shaped" has a less crude alternative for it; try 'ogee-shaped'. 
      </p>

      <p class="text--body-2 mb-12">
        No matter what the exterior of the mosque looks like though, one can almost always expect similar offerings in the interior: a space to take ablution and a place to pray.
      </p>         

      <p class="text--body-2">
      SECTION MOSQUE ARCHI
      </p>
      
    </v-container>  
  </section>
</template>

<script>
export default {
  name: 'Section4Archi',
}
</script>

<style lang="scss" scoped>
.section-archi {
  background-color: #FFFFFF;
  padding: 64px 0;
  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    padding: 48px 0;
  }  

  .archi-disclaimer {
    border: 1px solid #FFD3C3;
    padding: 16px;
  }

  .archi-quote {
    display: flex;
    align-items: center;
  }

  .archi-saf {
    img {
      display: block;
    }
  }
}
</style>