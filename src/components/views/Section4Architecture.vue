<template>
  <section class="section-archi"> 
    <v-container class="pa-md-0 inner section-archi-block"> 
      <div class="text-center mb-8">
        <img src="@/assets/title-2.svg" width="70px" class="scroll-embellish" />      
        <p class="text--h4 scroll-prompt font-weight-bold">Do all mosques look the same?</p>
      </div>

      <v-row justify="space-between" align="center" no-gutters class="mb-8">
        <v-col cols="12" md="2" offset-md="1">
          <img src="@/assets/archi-onion-tower.png" width="100%" />      
        </v-col>

        <v-col cols="12" md="8">
          <div class="archi-disclaimer mb-8">
            <p class="text--body-2">
              Note: I am not trained as an architect or a historian. This is a chill project to collect data about mosques in Singapore and make a data story from it.
            </p>
          </div>
          <p class="text--body-2">
            I had a friend describe a mosque to me. He said, 
          </p>

          <p class="text--blockquote mb-0">
            “They’re places with an onion-shaped dome on top of a tall tower, and there’s a crescent and star at the top of that dome”. 
          </p>
        </v-col>
      </v-row>

      <p class="text--body-2">
        He’s not wrong. But, as someone who Googled 72 mosques for this project, here are some of the interesting findings.
      </p>

      <p class="text--body-2">
      SECTION MOSQUE ARCHI
      </p>
 

      <div class="archi-saf mt-16">

        <p class="text--body-2 mb-12">
          No matter what the exterior of the mosque looks like though, one can almost always expect similar offerings in the interior: a space to take ablution and a place to pray.
        </p>      

        <v-row justify="center" align="start" no-gutters>
          <v-col cols="1">
            <img src="@/assets/archi-imam.png" width="100%"/>
          </v-col>
          <v-col cols="1">
            <v-btn @click="safetyDistance = !safetyDistance"> {{ safetyDistance ? 'okay good' : 'eh safety distancing pls' }}
            </v-btn>
          </v-col>          
        </v-row>

        <div v-if="!safetyDistance">
          <v-row align="end" no-gutters>
            <v-col cols="1">
              <img src="@/assets/archi-makmum-1.png" width="100%"/>
            </v-col>
            <v-col cols="1">
              <img src="@/assets/archi-makmum-2.png" width="100%"/>
            </v-col>
            <v-col cols="1">
              <img src="@/assets/archi-makmum-1.png" width="100%"/>
            </v-col>
            <v-col cols="1">
              <img src="@/assets/archi-makmum-2.png" width="100%"/>
            </v-col>
            <v-col cols="1">
              <img src="@/assets/archi-makmum-1.png" width="100%"/>
            </v-col>
            <v-col cols="1">
              <img src="@/assets/archi-makmum-2.png" width="100%"/>
            </v-col>
            <v-col cols="1">
              <img src="@/assets/archi-makmum-1.png" width="100%"/>
            </v-col>
            <v-col cols="1">
              <img src="@/assets/archi-makmum-2.png" width="100%"/>
            </v-col>
          <v-col cols="1">
              <img src="@/assets/archi-makmum-1.png" width="100%"/>
            </v-col>
            <v-col cols="1">
              <img src="@/assets/archi-makmum-2.png" width="100%"/>
            </v-col>
          <v-col cols="1">
              <img src="@/assets/archi-makmum-1.png" width="100%"/>
            </v-col>
            <v-col cols="1">
              <img src="@/assets/archi-makmum-2.png" width="100%"/>
            </v-col>                                                                                          
          </v-row>
        </div>

        <div v-if="safetyDistance">
          <v-row align="end" justify="space-around" no-gutters>
            <v-col cols="1" offset="1">
              <img src="@/assets/archi-makmum-1.png" width="100%"/>
            </v-col>
            <v-col cols="1">
              <img src="@/assets/archi-makmum-2.png" width="100%"/>
            </v-col>

            <v-col cols="1">
              <img src="@/assets/archi-makmum-1.png" width="100%"/>
            </v-col>

            <v-col cols="1">
              <img src="@/assets/archi-makmum-2.png" width="100%"/>
            </v-col>

            <v-col cols="1">
              <img src="@/assets/archi-makmum-2.png" width="100%"/>
            </v-col>
          </v-row>
          <v-row align="end"  justify="space-between" no-gutters>
            <v-col cols="1">
              <img src="@/assets/archi-makmum-1.png" width="100%"/>
            </v-col>
            <v-col cols="1">
              <img src="@/assets/archi-makmum-2.png" width="100%"/>
            </v-col>
          <v-col cols="1">
              <img src="@/assets/archi-makmum-1.png" width="100%"/>
            </v-col>
            <v-col cols="1">
              <img src="@/assets/archi-makmum-2.png" width="100%"/>
            </v-col>
          <v-col cols="1">
              <img src="@/assets/archi-makmum-1.png" width="100%"/>
            </v-col>
            <v-col cols="1">
              <img src="@/assets/archi-makmum-2.png" width="100%"/>
            </v-col>                                                                                          
          </v-row>
        </div>               
      </div>
      
    </v-container>  
  </section>
</template>

<script>
export default {
  name: 'Section4Archi',
  data() {
    return {
      safetyDistance: false,
    }
  }
}
</script>

<style lang="scss" scoped>
.section-archi {
  background-color: #FFFFFF;
  padding: 64px 0;

  .archi-disclaimer {
    border: 1px solid #FFD3C3;
    padding: 16px;
  }

  .archi-saf {
    img {
      display: block;
    }
  }
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