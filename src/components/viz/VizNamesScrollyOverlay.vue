<template>
  <v-container outer class="scrolly-overlay">
    <v-row justify="space-between" align="start">  
      <v-col cols="12" class="casestudy-scrolly scrolly__sticky">
        <div>
          <p class="text--body-2 pakistan-step-1 pakistan-tab">Screened</p>
          <p class="text--body-2 pakistan-step-2 pakistan-tab">Diagnosed</p>
          <p class="text--body-2 pakistan-step-3 pakistan-tab">Put on treatment</p>
          <p class="text--body-2 pakistan-step-4 pakistan-tab">Cured</p>
        </div>

        <div class="pakistan-case-numbers-scrolly">                            
          <span v-for="(n, i) in data.cured" :key="i + '-cured'" class="dot-pakistan-scrolly cured-scrolly-1" /> 
          <span v-for="(n, i) in data.finTreatment" :key="i + '-finTreatment'" class="dot-pakistan-scrolly finTreatment-scrolly-1" /> 
          <span v-for="(n, i) in data.onTreatment" :key="i + '-onTreatment'" class="dot-pakistan-scrolly onTreatment-scrolly-1" /> 
          <span v-for="(n, i) in data.diagnosed" :key="i + '-diagnosed'" class="dot-pakistan-scrolly diagnosed-scrolly-1"/> 
          <span v-for="(n, i) in data.undiagnosed" :key="i + '-undiagnosed'" class="dot-pakistan-scrolly undiagnosed-scrolly-1"/> 
        </div>
      </v-col>  
      <v-col cols="12" md="4" class="scrolly__content">

        <div class="step first" data-step="1">
          <div class="text-block">
            <p class="text--body-1 font-weight-bold">Screened</p>
            <p class="text--body-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero perspiciatis consectetur ipsa fugit itaque minima ea repellat distinctio sint soluta nisi nihil illo, culpa minus quia maxime vitae! Doloremque, voluptate.
            </p>
            <p class="text--body-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero perspiciatis consectetur ipsa fugit itaque minima ea repellat distinctio sint soluta nisi nihil illo, culpa minus quia maxime vitae! Doloremque, voluptate.
            </p>              
          </div>
        </div>

        <div class="step first" data-step="2">
          <div class="text-block">
            <p class="text--body-1 font-weight-bold">Diagnosed</p>
            <p class="text--body-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero perspiciatis consectetur ipsa fugit itaque minima ea repellat distinctio sint soluta nisi nihil illo, culpa minus quia maxime vitae! Doloremque, voluptate.
            </p>
            <p class="text--body-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero perspiciatis consectetur ipsa fugit itaque minima ea repellat distinctio sint soluta nisi nihil illo, culpa minus quia maxime vitae! Doloremque, voluptate.
            </p>              
          </div>
        </div>

        <div class="step first" data-step="3">
          <div class="text-block">
            <p class="text--body-1 font-weight-bold">Put on treatment</p>
            <p class="text--body-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero perspiciatis consectetur ipsa fugit itaque minima ea repellat distinctio sint soluta nisi nihil illo, culpa minus quia maxime vitae! Doloremque, voluptate.
            </p>
            <p class="text--body-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero perspiciatis consectetur ipsa fugit itaque minima ea repellat distinctio sint soluta nisi nihil illo, culpa minus quia maxime vitae! Doloremque, voluptate.
            </p>              
          </div>
        </div>

        <div class="step first" data-step="4">
          <div class="text-block">
            <p class="text--body-1 font-weight-bold">Cured</p>
            <p class="text--body-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero perspiciatis consectetur ipsa fugit itaque minima ea repellat distinctio sint soluta nisi nihil illo, culpa minus quia maxime vitae! Doloremque, voluptate.
            </p>
            <p class="text--body-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero perspiciatis consectetur ipsa fugit itaque minima ea repellat distinctio sint soluta nisi nihil illo, culpa minus quia maxime vitae! Doloremque, voluptate.
            </p>              
          </div>
        </div>                                       
      </v-col>     
    </v-row>
  </v-container> 
</template>

<script>
import * as d3 from 'd3';
import scrollama from 'scrollama';

export default {
  name: 'VizNamesScrollyOverlay',
  components: {},
  data() {
    return {
      publicPath: process.env.BASE_URL,
      data: {
        screened: 315, 
        undiagnosed: 129,
        diagnosed: 80,
        onTreatment: 60,
        finTreatment: 34,
        cured: 11,
        selectedPakistanCases: '',
      }
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

      // setup scrollama
      scrollerDesktop.setup({
        container: '.scrolly-overlay',
        graphic: '.scrolly-overlay .scrolly__sticky',
        step: '.scrolly-overlay .scrolly__content .step', // required
        offset: 0.8,
        debug: false
      })
      .onStepEnter(this.handleStepEnter)
    },
    handleStepEnter({ element }) {
      const step = d3.select(element).attr('data-step');

      // change the tabs
      d3.selectAll('p.pakistan-tab').classed('active-selection', false)
      d3.select(`p.pakistan-step-${step}`).classed('active-selection', true);

      // change the dots
      switch (step) {
        case '1':
          this.selectedPakistanCases = 'span.dot-pakistan-scrolly'
          break;     
        case '2':
          this.selectedPakistanCases = 'span.diagnosed-scrolly-1, span.onTreatment-scrolly-1, span.finTreatment-scrolly-1, span.cured-scrolly-1'
          break;
        case '3':
          this.selectedPakistanCases = 'span.onTreatment-scrolly-1, span.finTreatment-scrolly-1, span.cured-scrolly-1'
          break;
        case '4':
          this.selectedPakistanCases = 'span.cured-scrolly-1'
          break;     
      }
      const pakistanCases = d3.select('.pakistan-case-numbers-scrolly');
      pakistanCases.selectAll('span.dot-pakistan-scrolly').style('background-color', '#C4C4C4');      
      pakistanCases.selectAll(`${this.selectedPakistanCases}`).style('background-color', '#425D70');
    },    
  },
}
</script>

<style lang="scss" scoped>
.text-block {
  background-color: white;
  color: #2E2E2E;
  padding: 36px;
}

.casestudy-scrolly {
  div {
    p.pakistan-tab {
      display: inline-block;
      padding: 4px 12px;
      margin-bottom: 16px;
      margin-right: 16px; 
      border-radius: unset;
      border: 1px solid #2E2E2E;
      background-color: transparent;
    }

    p.active-selection {
      background-color: #425D70;
      color: #FAFAFA;
    }
  }  
}

.dot-pakistan-scrolly {
  height: 15px;
  width: 15px;
  border-radius: 50%;
  display: inline-block;
  background-color: #425D70;
  margin-right: 10px;
}

.scrolly__overlay {
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

.step:first-child {
  margin-top: calc(25vh);
}

.scrolly__sticky {
  justify-content: center;  
  align-items: center;
  position: sticky;
  // top: 50%;
  // transform: translate(0, -50%);
  top: calc(64px + 12px);
  z-index: 0;
  height: calc(100vh - 64px);
}

</style>