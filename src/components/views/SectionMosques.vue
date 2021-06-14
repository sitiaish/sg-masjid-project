<template>
  <div class="post-static__scrolly">
    <v-container
      py-12>
      <v-row align="start" justify="center" class="scrolly-side">
        <!-- step container -->
        <v-col cols="12" md="4" class="scrolly__content mr-12">
          <!-- per step - entry step -->
          <div class="step first" data-step="1">
            <div class="text-block">
              <p class="text--body-2 font-weight-medium">Which is your mosque? </p>
              <p class="text--body-3">I speak from my personal experience: I frequent mosques which are located nearer to me.</p>
              <p class="text--body-3">
                I spent the majority of my childhood playing in <span class="highlight-1 ">Masjid Assyakirin</span> mainly because my mom couldn’t find someone to babysit me while she worked in the mosque. <br>
                <span class="highlight-1 ">Masjid Jamae’ Queenstown</span> in my teens because my secondary school was overlooking that mosque. <br>
                And now as an adult, <span class="highlight-1 ">Masjid Omar Kampong Melaka</span> because it’s walking distance from Kontinentalist’s office.
              </p>
            </div>
          </div>

          <div class="step" data-step="2">
            <div class="text-block">
              <p class="text--body-2 font-weight-medium">The Enhanced Mosque Cluster</p>
              <p class="text--body-3">
                MUIS groups the mosques under its administration by 'Enhanced Mosque Clusters'. This is in part, an effort to strategetically position the mosques as “significant nodes in the national grid”. 
              </p>
              <p class="text--body-3">
                In the four cardinal directions, these clusters are as follows: 
                <span class="highlight-1">North, South, East West.</span>
              </p>
              <p class="text--body-3">
                Yeah I know, what's so strategic about this? But wait!
              </p>
            </div>
          </div>

          <div class="step" data-step="3">
            <div class="text-block">
              <p class="text--body-3">
                Initially, before 2018, there were six mosque clusters based on the Community Development Council (CDC) boundaries to facilitate accessibility to ComCare. ComCare's a social assistance initiative for low-income individuals and families and mosques.
              </p>      
              <p class="text--body-3">
                This goes hand-in-hand with the role of the mosque in distributing <em>zakat</em> to the recipients within eeach cluster.
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
        <v-col cols="12" md="7" class="scrolly__sticky">
          <h1 class="text--body-1 font-weight-medium mb-1">71 masjid-masjid Singapura</h1>        
          <h2 class="text--caption font-weight-light mb-2">Setiap bulatan adalah sebuah masjid</h2>          
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
  height: 12px;
  width: 12px;
  border-radius: 50%;
  display: inline-block;
}

</style>
