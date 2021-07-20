<template>
<div style="background-color: #f5f5f5;">
  <v-container outer class="container--fluid scrolly-side">
    <v-row justify="space-between" align="start" no-gutters>  
      <v-col cols="12" md="4" class="scrolly__content">

        <div class="step" data-step="0">
          <div class="text-block">
            <p class="text--body-3 mb-0">
              I look the liberty of arranging the mosques in alphabetical order for this visualisation. Let's first look at the mosques that are <span class="text--body-2 font-tertiary font-weight-bold">named after people</span>.
            </p>           
          </div>
        </div>

        <div class="step" data-step="1">
          <div class="text-block">
            <p class="text--body-1 font-tertiary font-weight-bold">Masjid {name-of-person}</p>

            <p class="text--body-3">
              Some of the mosques are named after people who were influential during that time period or had contributed their wealth or land, or expended energy in establishing the mosque. 
            </p>

            <p class="text--body-3 mb-0">  
              These people are of Arab, Indian and Malay descents. The former two probably landed on Singapore shores for purposes of trade but ended up staying longer. 
            </p>           
          </div>
        </div>        

        <div class="step first" data-step="1">
          <div class="text-block">            
            <p class="text--body-3">
              Alkaff and Ba'alwie are pretty famous Arab family surnames in Singapore. And Ahmad Ibrahim was a Member of Parliament of Sembawang Nee Soon in 1959 who'd contributed to the mosque during his term. 
            </p>

            <div class="text-block-legend my-3">
              <p class="text--body-3 ml-2 mb-2">
                <span style="background-color: #ffbdce">women names</span> 3 mosques
              </p>
              <p class="text--body-3 ml-2 mb-2">            
                <span style="background-color: #bddcff">men names</span> 25 mosques
              </p>                
            </div>

            <p class="text--body-3 mb-0">
              Women represent! There are also 3 mosques that were named after women benefactors. The prefix  
              <span class="text--body-2 font-tertiary font-weight-bold">Hajjah</span> is a form of address for a Muslim woman who has performed her Hajj pilgrimage to Mecca.
            </p>
          </div>
        </div>         

        <div class="step first" data-step="2">
          <div class="text-block">
            <p class="text--body-1 font-tertiary font-weight-bold">Named after Virtues -- in Arabic</p>
            
            <p class="text--body-3">
              These guys that didn’t take after people’s names are mostly named with good virtues and values -- but in Arabic. You can tell that they mostly have the prefix of ‘Al’ or (aliflam) which translates to the article ‘the’ in Arabic.
            </p>  

            <p class="text--body-3">
              For instance, Al-Muttaqin means The ‘pious people who are ever aware of God the Almighty’. 
            </p>              
          </div>
        </div>

        <div class="step first" data-step="3">
          <div class="text-block">
            <p class="text--body-1 font-tertiary font-weight-bold">Named after places or landmarks nearby</p>

            <p class="text--body-3">
              There are a handful that are named after places or landmarks nearby. 
              <span class="text--body-2 font-tertiary font-weight-bold">Masjid Bencoolen</span>
              is literally at the Bencoolen MRT station!
            </p>
            
            <p class="text--body-3">
              <span class="text--body-2 font-tertiary font-weight-bold">Masjid Pusara Aman</span> which signposts its own location sits just off Lim Chu Kang Road, near the Muslim cemetery.
            </p>

            <p class="text--body-3">              
              And, no, 
              <span class="text--body-2 font-tertiary font-weight-bold">
                Masjid Hang Jebat
              </span> 
              was not named after its namesake, the legendary fallen Malaccan hero. Rather, it’s named after the road that it sits on: Jalan Hang Jebat. 
            </p>       
          </div>
        </div>

        <div class="step first" data-step="3">
          <div class="text-block">
            <p class="text--body-3">
              Of these annotated ones, I feel a slight affinity to the masjid-masjid with Malay origins in their name. It brings back a slice of history to the present day. 
            </p>

            <p class="text--body-3">
              Like the name <span class="text--body-2 font-tertiary font-weight-bold">Tasek Utara</span> which translates to North Lake! Even <em>‘tasek’</em> is spelt in old Malay with an ‘e’ instead of ‘i’. I checked the map and it’s concrete buildings all around. No sign of any lakes nearby though. 
            </p>
          </div>
        </div>
      </v-col>      

      <v-col cols="12" md="8" class="scrolly__sticky">
        <div v-if="currentStep === '1'">                         
          <p v-for="(n, i) in mosquenames" :key="i + 'step1'" 
            class="text--mosque-label">
            <RoughNotation
              v-if="n.namesOfPeople"            
              type="highlight"
              :color="n.namesOfPeople === 'name' ? '#bddcff' : '#ffbdce'"
              :is-show = true>
              {{ n.name }}
            </RoughNotation>
            <span v-else class="dimmed">{{ n.name }}</span>

            <span class="mx-3"/>
          </p>
        </div>
    
        <div v-if="currentStep === '2'">        
          <p v-for="(n, i) in mosquenames" :key="i + 'step3'" 
            class="text--mosque-label">
            <RoughNotation
              v-if="n.language === 'arabic'"            
              type="circle"
              :strokeWidth="1"
              color="#54ad67"
              :is-show = true>
              {{ n.name }}
            </RoughNotation>
            <span v-else-if="n.namesOfPeople" class="second-dimmed">{{ n.name }}</span>
            <span v-else class="dimmed">{{ n.name }}</span>

            <span class="mx-3" style="font-weight: 500"/>
          </p>
        </div>    

        <div v-if="currentStep === '3'">        
          <p v-for="(n, i) in mosquenames" :key="i + 'step4'" 
            class="text--mosque-label">
            <RoughNotation
              v-if="n.language === 'malay' || n.language === 'english'"            
              type="box"
              :strokeWidth="1"
              color="#2D432B"
              :is-show = true>
              {{ n.name }}
            </RoughNotation>

            <span 
              v-else-if="n.namesOfPeople"
              class="second-dimmed">
              {{ n.name }}
            </span>

            <span 
              v-else-if="n.language === 'arabic'"
              class="second-dimmed">
              {{ n.name }}
            </span>              

            <span v-else class="dimmed">
              {{ n.name }}
            </span>

            <span class="mx-3" style="font-weight: 500"/>
          </p>
        </div>              

        <div v-if="currentStep === '0'">                         
          <p v-for="(n, i) in mosquenames" :key="i + 'step-default'" 
            class="text--mosque-label">
            <span>{{ n.name }}</span>
            <span class="mx-3" style="font-weight: 500"/>
          </p>
        </div>
      </v-col> 
    </v-row>
  </v-container>
</div> 
</template>

<script>
import * as d3 from 'd3';
import scrollama from 'scrollama';

export default {
  name: 'VizNamesScrollySide',
  components: {},
  data() {
    return {  
      currentStep: '0',
      mosquenames: null
    };
  },
  mounted() {
    this.initScrollama();    
    this.loadData();
  },  
  methods: {
    initScrollama() {
      // instantiate scrollama
      const scrollerDesktop = scrollama();

      const stepH = Math.floor(window.innerHeight * 1);
      d3.selectAll('.step').style("height", stepH + "px");    

      // setup scrollama
      scrollerDesktop.setup({
        container: '.scrolly-side',
        graphic: '.scrolly-side .scrolly__sticky',
        step: '.scrolly-side .scrolly__content .step', // required
        offset: 0.8,
        debug: false
      })
      .onStepEnter(this.handleStepEnter)
    },
    handleStepEnter({ element }) {
      const step = d3.select(element).attr('data-step');
      this.currentStep = step; 
    },
    async loadData() {
      this.mosquenames = await d3.csv('/data/mosque-names.csv');
    },
  },
}
</script>

<style lang="scss" scoped>
.text-block {
  background: #ffffff;
  color: #2E2E2E;
  padding: 24px;

  .text-block-legend {
    border-left: 4px solid #313131;
  }
}

.casestudy-scrolly {
  text-align: right;
  div {
    p {
      display: inline-block;
      padding: 4px 12px;
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


.scrolly__side {
  position: relative;
}

.scrolly__content {
  position: relative;
  padding: 0 1rem;
  width: 100%;
}

.step {
  margin: 0 24px 1rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.scrolly__sticky {
  justify-content: center;  
  align-items: center;
  position: sticky;
  // top: 50%;
  // transform: translate(0, -50%);
  top: calc(64px);
  z-index: 1;
  height: calc(100vh - 64px);
}


div .tab {
  display: inline-block;
  padding: 8px;
  margin-right: 8px;
  background-color: #425D70;
  color: white;
}

.text--mosque-label {
  font-weight: 400;
  font-size: 20px;
  display: inline-block;
  padding: 0 2px;
  margin-right: 4px;
  font-family: 'Source Sans Pro', sans-serif;
}

.selected {
  color: white;
}

.dimmed {
  opacity: 0.6;
}

.second-dimmed {
  opacity: 0.2;
}

</style>