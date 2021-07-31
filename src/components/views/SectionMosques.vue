<template>
  <div class="post-static__scrolly">
    <v-container outer>>
      <v-row align="start" justify="center" class="scrolly-side">
        <!-- step container -->
        <v-col cols="12" md="4" class="scrolly__content">
          <!-- per step - entry step -->
          <div class="step first" data-step="1">
            <div class="text-block">
              <p class="text--body-2 font-weight-medium">Where are the mosques? </p>
              <p class="text--body-3">
                Okay let's use <span class="dot"/> to represent one mosque from our dataset. I've arranged all the mosques here in alphabetical order. Go ahead and hover on the circles - see if you can uncover the mosque that you frequent.
              </p>
              <p class="text--body-3">
                I couldn't find all the logos of the mosques in the dataset. For those without, I've used the generic mosque emoji as a placeholder.
              </p>
            </div>
          </div>

          <div class="step" data-step="2">
            <div class="text-block">
              <p class="text--body-3">
                MUIS classifies the mosque by <span class="highlight-1">clusters</span>: North, South, East West. I've always thought that there were more mosques in the East for some reason because <em>East-side best side</em>. And colloquially, I'd assumed that there were more Muslims in the East than in the West.
              </p>

              <p class="text--body-3">
                But the locations of the mosques are almost equally divided across the different cluster.
              </p>         
              
            </div>
          </div>

          <div class="step" data-step="3">
            <div class="text-block">
              <p class="text--body-3">
                And on the map, they disperse to look roughly like this. 
              </p>
            </div>
          </div>

          <div class="step" data-step="4">
            <div class="text-block">  
              <p class="text--body-3">
                In 2018, ComCare was rehoused to 
                <span class="highlight-1"><span class="dot mr-2" style="background-color: #D1503A;"/> Social Services Offices (SSO)
                </span> 
                under the Ministry of Social and Family Development. In turn, the mosque cluster boundaries were redone to match the areas served by the SSOs instead. 
              </p>
              <p class="text--body-3">
                Each cluster now contains almost equal numbers of <em>new generation</em> mosques that larger and more equipped with manpower and resources to meet the needs of the Muslim population. 
              </p>              
            </div>
          </div>                                   
        </v-col>

        <!-- sticky container -->
        <v-col cols="12" md="8" class="scrolly__sticky">
          <VizScrollyChart 
            :step="step"
            :direction="direction" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import scrollama from 'scrollama';
import * as d3 from 'd3';
import VizScrollyChart from '@/components/viz/VizScrollyChart';


export default {
  name: 'SectionScrolly',
  components: {
    VizScrollyChart
  },
  data() {
    return {
      step: '0',
      direction: 'down',
      data: '',      
    };
  },
  mounted() {
    this.initScrollama();    
  },
  methods: {
    initScrollama() {
      // instantiate scrollama
      const scrollerDesktop = scrollama();

      const stepH = Math.floor(window.innerHeight * 1);
      d3.selectAll('.step').style("height", stepH + "px");    
      // d3.select('.step .first-child').style("height", stepH -500 + "px");        

      // setup scrollama
      scrollerDesktop.setup({
        container: '.scrolly-side',
        graphic: '.scrolly-side .scrolly__sticky',
        step: '.scrolly-side .scrolly__content .step', // required
        offset: 0.5,
        debug: false
      })
      .onStepEnter(this.handleStepEnter)
    },
    handleStepEnter({ element, direction, index }) {
      // get data-step and textblock
      this.step = d3.select(element).attr('data-step');
      const textblock = d3.selectAll(".step").select(".text-block");

      // add color to current step only
      textblock.classed("is-active", function(d, i) {
        return i === index;
      });      

      this.direction = direction;
    }, 
  }
};
</script>

<style lang="scss" scoped>
.scrolly__side {
  position: relative;
}

.scrolly__content {
  position: relative;
  padding: 0 1rem;
  width: 100%;
}

.step {
  margin: 0 auto 2rem auto;
  // border: 2px solid #104E8B;
  display: flex;
  justify-content: center;
  align-items: center;    
}

// .step:last-child {
//   margin-bottom: 50vh;
// }

.step:first-child {
  margin-top: calc(25vh);
}

.scrolly__sticky {
  justify-content: center;  
  align-items: center;
  position: sticky;
  // top: 50%;
  // transform: translate(0, -50%);
  top: 48px;
  z-index: 1;
}

.flourish-embed {
  width: 100%;
  height: 100%;
  border: none;  
  display: col;
  align-items: center;
  justify-content: center;  
}

iframe {
  border: none;  
  height: 100%;
  width: 100%; 
}

.placeholder {
  &:before  {
    content: 'Nullam ullamcorper finibus sagittis. Nullam a ipsum nisi. Pellentesque eget massa id nunc efficitur tempor sed in justo. Cras vel aliquet nunc, id pulvinar tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit eros at turpis pretium volutpat. Maecenas sit amet lacus quis mi molestie posuere.'
  }
}

.dialog-text {
    background-color: rgba(71, 56, 92, 0.9);
  text-align: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.text-block.is-active {
  background-color: white;
  // border-top: 5px solid hsl(166, 94%, 34%);
  color: #3b3b3b;
}

// .text-block {
//   // background-color: grey;
// }

.highlight-1 {
  background-color: hsla(198, 64%, 54%, 0.33);
  color: hsl(198, 94%, 34%);
  font-weight: 500;
  padding: 0 4px;
}

.dot {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: inline-block;
  vertical-align: baseline;
  background-color: #dedede;
}

</style>
