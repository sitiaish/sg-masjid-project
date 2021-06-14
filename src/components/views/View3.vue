<template>
  <div class="wrapper__story">
    <img src="@/assets/hajjah-fatimah.png" />
    <v-container outer>
      <v-row wrap justify="center" align="center" class="scrolly-side">  
        <v-col cols="12" md="1" class="scrolly__text pr-5">
          <v-btn fab @click="handleStep('back')" class="mb-5 prev">
          <v-icon color="black" style="font-size: 3rem;">mdi-chevron-up</v-icon>
          </v-btn> <br>
          <v-btn fab @click="handleStep('next')" class="next">
          <v-icon  color="black" style="font-size: 3rem;">mdi-chevron-down</v-icon>
          </v-btn>          
        </v-col>

        <v-col cols="12" md="4" class="scrolly__text pl-5">
          <!-- per step - entry step -->
          <div class="step" v-show="step === 1">
            <h1 class="text-h2 mb-8">
              Step 1
            </h1>            
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, totam porro! Iure quia nesciunt unde commodi nostrum tempora, esse incidunt, suscipit magni perspiciatis voluptates sequi, facilis temporibus quidem adipisci. Voluptatum.
          </div> 
          <div class="step" v-show="step === 2">
            <h1 class="text-h2 mb-8">
              Step 2
            </h1>                
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, totam porro! Iure quia nesciunt unde commodi nostrum tempora, esse incidunt, suscipit magni perspiciatis voluptates sequi, facilis temporibus quidem adipisci. Voluptatum.
          </div>                                              
        </v-col>

        <!-- sticky container -->
        <v-col cols="12" md="7" justify="center" align="center" >
          Here's where the map appears if you put in your API Token key
          <Map />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Map from '@/components/viz/Map';

// import SectionLanding from '@/components/views/story/SectionLanding.vue';
// import SectionContent from '@/components/views/story/SectionContent.vue';

export default {
  name: 'View3',
  components: {
    Map,
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      step: 1,
      slideStep: 0,
      finalStep: 5
    };
  },
  methods: {
    handleStep(event) {
      if (event === 'back' && this.step > 1) {
        this.step--;
      } else if (event === 'next' && this.step === this.finalStep) {
        this.step = this.finalStep; // just in case
      } else if (event === 'next') {
        this.step++;
      }

      if (this.step <= 3) {
        this.slideStep = 0;
      } else if (this.step >= 4) {
        this.slideStep = 1;
      }
    },     
  },
}
</script>