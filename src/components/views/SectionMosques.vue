<template>
  <div class="scrolly-overlay-circles">
    <div class="scrolly-sticky">
      <v-container>
      <VizScrollyChart 
        :step="stepCircles"
        :direction="direction" />  
      </v-container>    
    </div>

    <v-container class="scrolly-content">
      <div class="step" data-step="1">
        <div class="text-block"/>
      </div>

      <div class="step" data-step="2">
        <div class="text-block"/>
      </div>

      <div class="step" data-step="3">
        <div class="text-block"/>
      </div>

      <div class="step" data-step="4">
        <div class="text-block"/>
      </div>

      <div class="step" data-step="5">
        <div class="text-block"/>
      </div>

      <div class="step" data-step="6">
        <div class="text-block"/>
      </div>
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
      stepCircles: '0',
      direction: 'down',
      data: '',
      scrollerDesktop: null,  
    };
  },
  beforeDestroy() {
    // remove scrollama instance
    this.scrollerDesktop.destroy();
  },  
  mounted() {
    this.initScrollama();    
  },
  methods: {
    initScrollama() {
      // instantiate scrollama
      this.scrollerDesktop = scrollama();

      const stepH = Math.floor(window.innerHeight * 1);
      d3.selectAll('.step').style("height", stepH + "px");    
      // d3.select('.step .first-child').style("height", stepH -500 + "px");        

      // setup scrollama
      this.scrollerDesktop.setup({
        container: '.scrolly-overlay-circles',
        graphic: '.scrolly-overlay-circles .scrolly-sticky',
        step: '.scrolly-overlay-circles .scrolly-content .step', // required
        offset: 0.8,
        debug: false,
      })
      .onStepEnter(this.handleStepEnter)
    },
    handleStepEnter({ element, direction }) {
      // get data-step and textblock
      const step = d3.select(element).attr('data-step');
      this.stepCircles = step;

      // add color to current step only
      // const textblock = d3.selectAll(".step").select(".text-block");
      // textblock.classed("is-active", function(d, i) {
      //   return i === index;
      // });      

      this.direction = direction;
    }, 
  }
};
</script>

<style lang="scss" scoped>
.text-block {
  background-color: transparent;
  border: 2px solid black;
  pointer-events: none;
}

.scrolly-content {
  position: relative;
}

.step {
  margin: 0 auto 2.5rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  // border: 2px solid red;
}

.scrolly-sticky {
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 24px;
  height: calc(100vh - 24px);
  overflow: hidden;
  // div {
  //   height: 100%;
  //   width: 100%;
  //   align-items: center;
  //   display: flex;
  // }
}

.text-block.is-active {
  background-color: white;
  // border-top: 5px solid hsl(166, 94%, 34%);
  color: #3b3b3b;
}
</style>
